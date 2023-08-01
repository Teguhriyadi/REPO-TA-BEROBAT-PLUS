import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../../components/Heading'
import { baseUrl, colors, getData } from '../../../../../utils'
import axios from 'axios'
import { SvgXml } from 'react-native-svg'

const AllAntrian = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [semuaAntrian, setSemuaAntrian] = useState(null);

    useEffect(() => {
        getDataUserLocal();
        getAllAntrian();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getAllAntrian = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/master/ahli/jadwal_antrian/all`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setSemuaAntrian(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <Heading textHeading={"Semua Data Antrian"} navigasi={() => {
                navigation.goBack();
            }} />
            {semuaAntrian == null ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                <ScrollView>
                    {semuaAntrian.map((item) => {
                        return (
                            <View key={item.id_jadwal_antrian} style={{marginTop: 10}}>
                                <View style={{ backgroundColor: 'white', marginHorizontal: 10, elevation: 5, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10, paddingVertical: 15 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SvgXml xml={item.code} width={150} height={150} />
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={[styles.textantrian, { color: 'black' }]}>
                                            ID Jadwal Antrian :
                                        </Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                            <Text style={[styles.textantrian, { color: 'green' }]}>
                                                {item.id_jadwal_antrian}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[styles.textantrian, { color: 'black' }]}>
                                            Nomer STR
                                        </Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                            <Text style={[styles.textantrian, { color: 'green' }]}>
                                                {item.nomor_str}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={[styles.textantrian, { color: 'black' }]}>
                                            Nama Dokter
                                        </Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                            <Text style={[styles.textantrian, { color: 'green' }]}>
                                                {item.ahli}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={[styles.textantrian, { color: 'black' }]}>
                                            Tanggal Konsultasi Ketemu
                                        </Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                            <Text style={[styles.textantrian, { color: 'green' }]}>
                                                {item.tanggal}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                    <Text style={{ color: 'green' }}>
                                        Detail Lokasi Ketemu :
                                    </Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={[styles.textantrian, { color: 'black' }]}>
                                            Nama Tempat
                                        </Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                            <Text style={[styles.textantrian, { color: 'green' }]}>
                                                {item.lokasi.nama_rs}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Text style={[styles.textantrian, { color: 'black' }]}>
                                            Alamat
                                        </Text>
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                            <Text style={[styles.textantrian, { color: 'green' }]}>
                                                {item.lokasi.alamat_rs}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default AllAntrian;