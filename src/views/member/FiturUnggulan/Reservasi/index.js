import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { baseUrl, colors, getData } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';

const Reservasi = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [listDataDokter, setListDataDokter] = useState(null);
    const [keahlian, setListKeahlian] = useState(null);

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

            const promises = response.data.data.map(async(item) => {
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

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading navigasi={() => {
                navigation.replace(Navigasi.MAIN_APP)
            }} textHeading={"Reservasi Kebutuhan Anda"} />
            <View style={{marginHorizontal: 10}}>
                {listDataDokter == null ? (
                    <ActivityIndicator/>
                ) : (
                    listDataDokter.map((item) => {
                        return (
                            <View key={item.id_dokter}>
                                <Text style={{color: 'black'}}>
                                    {item.id_dokter}
                                </Text>
                                <Text style={{color: 'black'}}>
                                    Keahlian : 
                                </Text>
                                {keahlian == null ? (
                                    <ActivityIndicator/>
                                ) : (
                                    keahlian.map((dataahli) => {
                                        return (
                                            item.id_dokter == dataahli.get_dokter.id_dokter ? (
                                                <Text style={{color: 'black', fontSize: 8}}>
                                                    {dataahli.get_keahlian.nama_keahlian}
                                                </Text>
                                            ) : (
                                                <View/>
                                            )
                                        )
                                    })
                                ) }
                            </View>
                        )
                    })
                ) }
            </View>
        </View>
    )
}

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