import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { colors, getData, baseUrl } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';

const DashboardPerawat = ({ navigation }) => {

    const [dataPribadi, setDataPribadi] = useState({});

    useEffect(() => {
        getDataUserLocal();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const logout = () => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda Yakin Untuk Keluar ?',
            [
                {
                    text: 'Tidak',
                    style: 'cancel'
                },
                {
                    text: 'Setuju',
                    onPress: () => {
                        try {
                            AsyncStorage.removeItem("dataUser");
                            AsyncStorage.removeItem("user");
                            AsyncStorage.removeItem('isLoggedIn');

                            axios({
                                url: `${baseUrl.url}/logout`,
                                headers: {
                                    Authorization: 'Bearer ' + dataPribadi.token,
                                },
                                method: 'GET',
                            });

                            navigation.navigate(Navigasi.LOGIN)

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 10 }}>
                            <Image
                                source={require('../../../assets/images/people.png')}
                                style={styles.headingprofil}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                {dataPribadi.nama}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 12 }}>
                                {dataPribadi.nomor_hp}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    logout();
                                }}>
                                <Icon
                                    name="exit-outline"
                                    style={{ fontSize: 30, color: 'white' }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={styles.cardrekap}>
                                <Icon name='home' style={{fontSize: 50, color: '#051f84'}} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Yang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                            <View style={styles.cardrekap}>
                                <Icon name='chatbubbles' style={{fontSize: 50, color: '#051f84'}} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Yang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={styles.cardrekap}>
                                <Icon name='location' style={{fontSize: 50, color: '#051f84'}} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Yang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                            <View style={styles.cardrekap}>
                                <Icon name='people' style={{fontSize: 50, color: '#051f84'}} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Yang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={styles.cardrekap}>
                                <Icon name='search' style={{fontSize: 50, color: '#051f84'}} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Yang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                            <View style={styles.cardrekap}>
                                <Icon name='book' style={{fontSize: 50, color: '#051f84'}} />
                                <Text style={styles.titlerekap}>
                                    Total Pasien Yang Diatasi
                                </Text>
                                <Text style={styles.totalrekap}>
                                    100
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        backgroundColor: '#051f84',
        height: 150,
        padding: 10,
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30
    },

    headingprofil: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1,
    },

    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        marginLeft: 5,
    },

    content: {
        marginVertical: 10,
        marginHorizontal: 10
    },

    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    nama: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
        color: 'white'
    },

    nomorhp: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
    },

    image: {
        width: 50,
        height: 50,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardrekap: {
        flex: 1, 
        backgroundColor: 'white', 
        elevation: 5, 
        height: 170, 
        borderRadius: 10,
        marginRight: 5,
        justifyContent: 'center', 
        alignItems: 'center'
    },

    titlerekap: {
        color: 'black', 
        fontSize: 14, 
        fontWeight: 'bold', 
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        paddingHorizontal: 2
    },

    totalrekap: {
        color: 'black', 
        fontSize: 16, 
        fontWeight: 'bold', 
        fontFamily: 'Poppins-Medium'
    }
});

export default DashboardPerawat;