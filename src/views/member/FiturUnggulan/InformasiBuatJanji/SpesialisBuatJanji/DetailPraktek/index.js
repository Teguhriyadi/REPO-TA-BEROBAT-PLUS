import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl, colors, getData } from '../../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponent from '../../../../../../components/StatusBar/StatusBarComponent';
import axios from 'axios';

const DetailPraktek = ({ navigation, route }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [jadwal, setjadwal] = useState(null);
    const spesialis = route.params;

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
            jadwalpraktek();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const jadwalpraktek = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/ahli/jadwal_praktek/${spesialis.data.id_dokter}/${spesialis.id_rumah_sakit}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setjadwal(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={{ paddingHorizontal: 10, paddingVertical: 15, flexDirection: 'row', backgroundColor: '#051f84' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Icon name="arrow-back" style={{ color: 'white', fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 16, textAlign: 'center' }}>
                        Detail Data Praktek
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flex: 3 }}>
                <View style={{ backgroundColor: 'white', elevation: 5, paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image source={require("../../../../../../assets/images/people.png")} resizeMode='cover' style={{ width: 70, height: 70, borderRadius: 100, borderColor: 'blue', borderWidth: 1 }} />
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.nama_dokter}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.email}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                            {spesialis.data.nomor_hp}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    backgroundColor: colors.backgroundDasarBelakang,
                                    borderRadius: 5,
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    marginVertical: 5,
                                    width: 100,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 3,
                                    }}>
                                    <Icon name="ios-location" style={{ color: 'black' }} />
                                </View>
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 12,
                                        fontFamily: 'Poppins-Medium',
                                        fontWeight: 'bold',
                                    }}>
                                    100 Tahun
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, backgroundColor: 'white', elevation: 5, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 14, fontWeight: 'bold' }}>
                            RS. Sumber Kasih
                        </Text>
                        <Text style={{ color: 'grey', fontFamily: 'Poppins-Medium', fontSize: 12, fontWeight: 'bold' }}>
                            Kejaksan, Kota Cirebon
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Image source={require("../../../../../../assets/images/gambar-rs.jpg")} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 10 }} />
                    </View>
                </View>
                <View style={{ marginTop: 10, backgroundColor: 'skyblue', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold' }}>
                        Pilih Tanggal & Waktu Kunjungan
                    </Text>
                </View>
                {jadwal == null ? (
                    <ActivityIndicator size={"large"} color={"primary"} />
                ) : (
                    <ScrollView >
                        {jadwal.map((item) => {
                            return (
                                <View style={{marginTop: 20, marginRight: 50, marginLeft: 10, backgroundColor: 'white', elevation: 5, marginBottom: 10, width: '50%', padding: 10, height: 120, borderRadius: 10}} key={item.id_jadwal_praktek}>
                                    <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
                                        {item.hari}
                                    </Text>
                                    <View style={{borderColor: 'grey', borderWidth: 1, marginVertical: 10}} />
                                    <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
                                        {item.mulai_jam}
                                    </Text>
                                    <Text style={{color: 'red', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
                                        S / D
                                    </Text>
                                    <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium', textAlign: 'center'}}>
                                        {item.selesai_jam}
                                    </Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                ) }
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ backgroundColor: 'purple', paddingVertical: 15 }}>
                    <Text style={{ color: 'black' }}>
                        3
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
    },
    viewicon: {
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    detailjudul: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default DetailPraktek;