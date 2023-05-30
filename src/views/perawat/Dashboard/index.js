import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { colors, getData, baseUrl } from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';

const DashboardPerawat = ({navigation}) => {

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
                            AsyncStorage.removeItem('profil_perawat');

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
            <View style={styles.heading}>
                <View style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require("../../../assets/images/people.png")} style={styles.image} />
                        <View style={styles.headingprofil}>
                            <Text style={styles.nama}>Mohammad</Text>
                            <Text style={styles.nomorhp}>085324237299</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => logout()}>
                        <Icon name='exit-outline' style={{ fontSize: 30, color: 'white' }} />
                    </TouchableOpacity>
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

    heading: {
        height: 100,
        paddingHorizontal: 10,
        backgroundColor: 'blue',
        flexDirection: 'row'
    },

    headingprofil: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
    }
});

export default DashboardPerawat;