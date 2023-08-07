import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from "../../../components/StatusBar/StatusBarComponent"
import {baseUrl, getData} from "../../../utils"
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

const TransaksiDokter = () => {
    
    const [dataPribadi, setDataPribadi] = useState({});
    const [cekOption, setCekOption] = useState(1);
    const [transaksiBuatJanji, setTransaksiBuatJanji] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getTransaksiBuatJanji();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getTransaksiBuatJanji = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/ahli/transaksi_buat_janji`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setTransaksiBuatJanji(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const konsultasi = () => {
        setCekOption(1);
    }

    const buatJanji = () => {
        setCekOption(2);
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Text style={styles.textHeading}>
                    Riwayat Transaksi
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                    konsultasi();
                }} style={[styles.option, cekOption == 1 ? styles.active : styles.nonActive]}>
                    <Text style={cekOption == 1 ? styles.textActive : styles.textNonActive}>
                        Konsultasi
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    buatJanji();
                }} style={[styles.option, cekOption == 2 ? styles.active : styles.nonActive]}>
                    <Text style={cekOption == 2 ? styles.textActive : styles.textNonActive}>
                        Buat Janji
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    resep();
                }} style={[styles.option, cekOption == 3 ? styles.active : styles.nonActive]}>
                    <Text style={cekOption == 3 ? styles.textActive : styles.textNonActive}>
                        Konsultasi
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {cekOption == 1 ? (
                    <Text style={{color: 'black'}}>
                        Konsultasi
                    </Text>
                ) : (
                    cekOption == 2 ? (
                        transaksiBuatJanji.length > 0 ? (
                            <Text style={{color: 'black'}}>
                                Hamdan
                            </Text>
                        ) : (
                            <View style={styles.transaksiKosong}>
                                <Icon name="phone" style={{fontSize: 100, color: 'black'}} />
                            </View>
                        )
                    ) : (
                        cekOption == 3 ? (
                            <Text style={{color: 'black'}}>
                                Hamdan
                            </Text>
                        ) : (
                            <View/>
                        )
                    )
                ) }
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },

    heading: {
        height: 50,
        elevation: 5,
        backgroundColor: '#051f84',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textHeading: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    option: {
        flex: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },

    active: {
        backgroundColor: 'blue'
    },

    nonActive: {
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor: 'white'
    },

    textActive: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },

    textNonActive: {
        color: 'blue',
        fontSize: 14,
        fontWeight: 'bold'
    },
})

export default TransaksiDokter