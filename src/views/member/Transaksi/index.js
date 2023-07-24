import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import { baseUrl, colors, getData } from '../../../utils'
import axios from 'axios'
import Navigasi from '../../../partials/navigasi'

const Transaksi = ({navigation}) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [transaksi, setTransaksi] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getTransaksi();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getTransaksi = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/pembelian/transaksi`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            setTransaksi(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Text style={styles.textheading}>
                    Riwayat Transaksi
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {transaksi == null ? (
                    <ActivityIndicator size={"large"} color={colors.primary} style={{ marginTop: 200 }} />
                ) : (
                    transaksi.length > 0 ? (
                        transaksi.map((item) => {
                            return (
                                <View style={styles.content} key={item.id_pembelian}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 3, justifyContent: 'center' }}>
                                            <Text style={styles.textcontent}>
                                                {item.id_pembelian}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: 'orange', marginVertical: 10, marginHorizontal: 10, borderRadius: 5, paddingVertical: 5 }}>
                                            <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>
                                                {item.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.border} />
                                    <View style={{ alignItems: 'flex-end', marginHorizontal: 10, marginVertical: 10 }}>
                                        <Text style={styles.tanggal}>
                                            {item.tanggal_pembelian}
                                        </Text>
                                    </View>
                                    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                        <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontWeight: 'bold', fontSize: 16 }}>{item.konsumen_id.detail.nama}</Text>
                                        <Text style={{ color: 'black' }}>{item.konsumen_id.detail.nomor_hp}</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: 16, fontWeight: 'bold' }}>
                                                Total Pembelian : {item.total_pembelian}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(Navigasi.PEMBAYARAN_PRODUK, {
                                            data: item
                                        })
                                    }} style={styles.button}>
                                        <Text style={styles.textbutton}>
                                            Detail
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    ) : (
                        <View style={styles.contentnotfound}>
                            <Icon name="cart" style={{ fontSize: 100, color: '#051f84' }} />
                            <Text style={styles.iconNotFound}>Belum Ada Transaksi</Text>
                            <Text style={{ color: 'black', fontSize: 14 }}>Anda Belum Melakukan Pembelanjaan</Text>
                            <TouchableOpacity style={styles.buttonNotFound} onPress={() => {
                                navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK)
                            }}>
                                <Text style={styles.textButtonNotFound}>
                                    Lanjutkan Transaksi
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                )}
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
        padding: 15,
        height: 50,
        backgroundColor: 'white',
        elevation: 5
    },

    textheading: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 16
    },

    content: {
        backgroundColor: 'white',
        elevation: 5,
        marginHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 5
    },

    textcontent: {
        color: 'blue',
        marginHorizontal: 10,
        marginVertical: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        fontWeight: 'bold'
    },

    border: {
        borderColor: 'gray',
        marginHorizontal: 10,
        borderWidth: 1
    },

    tanggal: {
        color: 'green',
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 14
    },

    button: {
        backgroundColor: 'green',
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 7
    },

    textbutton: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    contentnotfound: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 200
    },

    iconNotFound: {
        color: '#051f84', 
        fontFamily: 'Poppins-Medium', 
        fontSize: 18, 
        fontWeight: 'bold'
    },

    buttonNotFound: {
        backgroundColor: '#051f84', 
        width: '90%', 
        paddingVertical: 10, 
        marginVertical: 10, 
        borderRadius: 10
    },

    textButtonNotFound: {
        color: 'white', 
        fontFamily: 'Poppins-Medium', 
        fontWeight: 'bold', 
        fontSize: 14, 
        textAlign: 'center'
    }
})

export default Transaksi;
