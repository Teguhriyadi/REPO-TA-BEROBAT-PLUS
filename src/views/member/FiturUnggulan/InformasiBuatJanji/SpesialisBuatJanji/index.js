import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseUrl, colors, getData } from '../../../../../utils';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../../components/Heading';
import Navigasi from '../../../../../partials/navigasi';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const SpesialisBuatJanji = ({ navigation, route }) => {

    const spesialis = route.params;
    const [dataPribadi, setDataPribadi] = useState({});
    const [dokter, setdokterspesialis] = useState(null);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            getDataUserLocal();
            dokterjanji();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const dokterjanji = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/spesialis/${spesialis.data.penyakit.id_spesialis_penyakit}/${spesialis.data.id_rumah_sakit}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setdokterspesialis(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={spesialis.data.penyakit.nama_spesialis} navigasi={() => {
                navigation.goBack()
            }} />
            {dokter == null ? (
                <ActivityIndicator size={"large"} color={colors.primary} style={{alignItems: 'center', flex: 1}} />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {dokter.map((item) => {
                        return (
                            <View key={item.id_praktek} style={styles.card}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Image source={require("../../../../../assets/images/people.png")} style={{width: 100, height: 100}} />
                                </View>
                                <View style={{flex: 2}}>
                                    <Text style={styles.namadokter}>
                                        {item.nama_dokter}
                                    </Text>
                                    <Text style={styles.nomorhp}>
                                        {item.nomor_hp}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={styles.tahun}>
                                            <Text style={styles.texttahun}>
                                                100 Tahun
                                            </Text>
                                        </View>
                                        <View style={styles.rating}>
                                            <Text style={styles.textrating}>
                                                <Icon name="thumbs-up" style={{color: 'blue'}} /> 100%
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{alignItems: 'flex-end'}}>
                                    <TouchableOpacity style={styles.button} onPress={() => {
                                        navigation.navigate(Navigasi.DETAIL_PRAKTEK, {
                                            data: item
                                        })
                                    }}>
                                        <Text style={styles.textbutton}>
                                            Pilih
                                        </Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            ) }
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    card: {
        backgroundColor: 'white',
        elevation: 5,
        height: 150,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10
    },
    namadokter: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Poppins-Medium',
    },
    nomorhp: {
        fontSize: 12,
        color: 'grey',
        fontFamily: 'Poppins-Medium',
    },
    tahun: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        marginTop: 10,
        paddingVertical: 3,
        alignItems: 'center'
    },
    texttahun: {
        color: 'blue',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    rating: {
        marginLeft: 10,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        width: 70,
        marginTop: 10,
        paddingVertical: 3,
        alignItems: 'center'
    },
    textrating: {
        color: 'blue',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
    },
    button: {
        backgroundColor: 'blue',
        borderRadius: 5,
        marginTop: 20,
        width: 70,
        alignItems: 'center',
        paddingVertical: 5
    },
    textbutton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'Poppins-Medium'
    }
});

export default SpesialisBuatJanji;