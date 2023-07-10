import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { colors, getData } from '../../../utils';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import { configfirebase } from '../../../firebase/firebaseConfig';
import Navigasi from '../../../partials/navigasi';

const KonsultasiPerawat = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [historyChat, setHistoryChat] = useState([]);

    useEffect(() => {
        getDataUserLocal();
        const rootDB = configfirebase.database().ref();
        const urlHistory = `messages/${dataPribadi.uuid_firebase}`;
        const messagesDB = rootDB.child(urlHistory);

        messagesDB.on("value", async snapshot => {
            if (snapshot.val()) {
                const oldData = snapshot.val();
                const data = [];

                const promises = await Object.keys(oldData).map(async key => {
                    const datakonsumen = `users/konsumen/${oldData[key].uidPartner}`;
                    // console.log(key);
                    const detail_konsumen = await rootDB.child(datakonsumen).once("value");
                    console.log(detail_konsumen);
                    data.push({
                        id: key,
                        detail_konsumen: detail_konsumen.val()
                    });
                });

                await Promise.all(promises);
                setHistoryChat(data);
            }
        });
    }, [dataPribadi.nama, dataPribadi.uuid_firebase, dataPribadi.idx, dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={styles.heading}>
                <Text style={styles.textHeading}> Konsultasi Pasien </Text>
            </View>

            <ScrollView>
                {historyChat == null ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={"large"} />
                    </View>
                ) : (
                    historyChat.map(item => {
                        return (
                            <View key={item.id} style={{ backgroundColor: 'white', elevation: 5, marginHorizontal: 10, marginVertical: 10, padding: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>
                                        Tanggal : 07 Juli 2022
                                    </Text>
                                    <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'flex-end', borderRadius: 10 }}>
                                        <Text style={{ color: 'green', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                                            Sudah Selesai
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ borderColor: 'grey', borderWidth: 1, marginVertical: 10 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require("../../../assets/images/background-doctor.png")} resizeMode='cover' style={{ height: 50, width: 50, borderRadius: 50, borderColor: 'black', borderWidth: 1 }} />
                                    <View style={{ marginHorizontal: 10 }}>
                                        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                                        {item.detail_konsumen.nama}
                                        </Text>
                                        <Text style={{ color: 'grey', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                                        {item.detail_konsumen.nomor_hp}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{ color: 'black', marginVertical: 10, fontSize: 12, fontFamily: 'Poppins-Medium', fontWeight: 'bold', textAlign: 'justify' }}>
                                    Masih Data Dummy
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    const params = {
                                        id: item.id,
                                        uidPartner: item.detail_konsumen.uid,
                                        nama: item.detail_konsumen.nama,
                                        nomor_hp: item.detail_konsumen.nomor_hp
                                    }
                                    navigation.navigate(Navigasi.DETAIL_KONSULTASI_PERAWAT, params)
                                }} style={{ borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingVertical: 10 }}>
                                    <Text style={{ color: 'green', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold', textAlign: 'center' }}>
                                        Lanjutkan
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 10 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ borderColor: 'red', borderWidth: 1, borderRadius: 10, paddingVertical: 10, width: 90 }}>
                                        <Text style={{ color: 'red', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold', textAlign: 'center' }}>
                                            Akhiri Sesi
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(Navigasi.LANJUTKAN_PERAWATAN)
                                    }} style={{ borderColor: 'blue', borderWidth: 1, borderRadius: 10, paddingVertical: 10, width: 170, marginLeft: 10 }}>
                                        <Text style={{ color: 'blue', fontSize: 14, fontFamily: 'Poppins-Medium', fontWeight: 'bold', textAlign: 'center' }}>
                                            Lanjutkan Rawat Jalan
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },
    heading: {
        height: 50,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'flex-start',
        elevation: 5,
        padding: 10,
    },
    textHeading: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    content: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    listCard: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
    },
    headerIdentitas: {
        flex: 3,
    },
    status: {
        flex: 1,
        alignItems: 'flex-end',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor: 'green',
    },
});

export default KonsultasiPerawat;