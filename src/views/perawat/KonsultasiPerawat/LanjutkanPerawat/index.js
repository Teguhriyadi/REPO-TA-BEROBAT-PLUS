import { ActivityIndicator, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../../utils'
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import { configfirebase } from '../../../../firebase/firebaseConfig'
import Geolocation from '@react-native-community/geolocation'
import messaging from "@react-native-firebase/messaging"

const LanjutkanPerawat = ({ navigation }) => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [closestPerawat, setClosestPerawat] = useState(null);
    const [perawat, setPerawat] = useState(null);
    const [isData, setIsData] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    });

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app requires access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;

                    setLatitude(latitude)
                    setLongitude(longitude);
                });
            } else {
                console.log('Tidak Ditemukan ');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const lanjutkan = () => {
        setIsData(true);
        if (latitude && longitude) {
            const perawatref = configfirebase.database().ref("locations/perawat");
            perawatref.once("value", (snapshot) => {
                const perawatdata = snapshot.val();

                if (perawatdata) {
                    const perawatlist = Object.keys(perawatdata).map((key) => ({
                        id: key,
                        latitude: perawatdata[key].latitude,
                        longitude: perawatdata[key].longitude
                    }));

                    perawatlist.forEach((perawat) => {
                        const distance = haversineDistance(
                            latitude,
                            longitude,
                            perawat.latitude,
                            perawat.longitude
                        );

                        perawat.distance = distance;
                    });

                    const closestPerawat = perawatlist.reduce((prev, curr) =>
                        prev.distance < curr.distance ? prev : curr
                    );

                    setClosestPerawat(closestPerawat);

                    const urlFirebase = `users/ahli/${closestPerawat.id}`

                    configfirebase.database()
                        .ref(urlFirebase)
                        .once("value", snapshot => {
                            setPerawat(snapshot.val());
                        });
                }

            });
        } else {
            console.log("Lokasi Belum Tersedia");
        }
    }

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius bumi dalam kilometer
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Jarak dalam kilometer
        return distance;
    };

    const deg2rad = (degree) => {
        return degree * (Math.PI / 180);
    };

    const pemberitahuan = async () => {

        try {
            const token = await messaging().getToken();
            console.log('Token perangkat:', token);
        } catch (error) {
            console.log('Error mendapatkan token:', error);
        }
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("Notifikasi Datang", remoteMessage);
        });
    
        return unsubscribe;
    }
    

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Icon name="arrow-back" style={{ fontSize: 20, color: 'black' }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium', marginLeft: 10 }}>
                    Rekomendasi Perawat Terdekat Dengan Pasien
                </Text>
            </View>

            {isData ? (
                <View />
            ) : (
                <>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 5 }}>
                        <Icon name="search" style={{ color: colors.primary, fontSize: 50 }} />
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, fontFamily: 'Poppins-Medium' }}>
                            Temukan Perawat Yang Tersedia
                        </Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: 'green', paddingVertical: 10, marginHorizontal: 10, borderRadius: 10 }} onPress={() => {
                        lanjutkan();
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}>
                            Cari Perawat Terdekat
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {closestPerawat && perawat && (
                <View style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: 'white', elevation: 5, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require("../../../../assets/images/background-doctor.png")} resizeMode='cover' style={{ height: 100, width: 100 }} />
                    </View>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>{perawat.nama}</Text>
                    <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>{perawat.email}</Text>
                    <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Poppins-Medium' }}>{perawat.nomor_hp}</Text>
                    <TouchableOpacity style={{ backgroundColor: '#051f84', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }} onPress={() => {
                        pemberitahuan();
                    }} >
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center' }}>
                            Berikan Pemberitahuan
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    heading: {
        padding: 10,
        height: 50,
        backgroundColor: colors.backgroundPutih,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default LanjutkanPerawat;