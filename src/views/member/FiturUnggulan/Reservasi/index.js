import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { baseUrl, colors, getData } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';
import Xendit from 'xendit-js-node';
import { configure, createPayment } from './xendit';

const Reservasi = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [listDataDokter, setListDataDokter] = useState(null);
    const [keahlian, setListKeahlian] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [payment, setPayment] = useState(false);

    useEffect(() => {
        getDataUserLocal();
        listDokter();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const dataPertama = [
        { id: 1, nama: 'Item 1' },
        { id: 2, nama: 'Item 2' },
        { id: 3, nama: 'Item 3' }
    ];

    const dataKedua = [
        { id: 1, deskripsi: 'Deskripsi Item 1' },
        { id: 2, deskripsi: 'Deskripsi Item 2' },
        { id: 3, deskripsi: 'Deskripsi Item 3' }
    ];

    const hasil = dataPertama.map(itemPertama => {
        const itemKedua = dataKedua.find(itemKedua => itemKedua.id === itemPertama.id);
        return {
            id: itemPertama.id,
            nama: itemPertama.nama,
            deskripsi: itemKedua ? itemKedua.deskripsi : ''
        };
    });

    const listDokter = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/akun/dokter/data`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            });

            const promises = response.data.data.map(async (item) => {
                const responsedata = await axios({
                    url: `${baseUrl.url}/master/dokter_keahlian/${item.id_dokter}`,
                    headers: {
                        Authorization: 'Bearer ' + dataPribadi.token
                    },
                    method: "GET"
                });

                return responsedata.data.data;
            });

            const result = await Promise.all(promises);

            setListDataDokter(response.data.data);
            setListKeahlian(result.flat());
        } catch (error) {
            console.log(error);
        }
    };

    const bayar = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/invoice`,
                method: "POST"
            });

            navigation.goBack();

        } catch (error) {
            console.log('Error creating payment:', error);
            setPaymentStatus('Error creating payment.');
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.replace(Navigasi.MAIN_APP)
            }} textHeading={"Reservasi Kebutuhan Anda"} />
            <TouchableOpacity onPress={() => {
                bayar()
            }} style={{ backgroundColor: 'green', paddingHorizontal: 10, paddingVertical: 10, marginVertical: 10, marginHorizontal: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                    Hamdan
                </Text>
            </TouchableOpacity>
        </View>
    )
}

configure("xnd_public_development_HCO3lYX562mxTdCCuBXLPj3JIWJMxHxIfodoCd80AzONQrFcP9N1AEuSy9Bq9R")

export default Reservasi;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    title: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        marginBottom: 10
    }
})