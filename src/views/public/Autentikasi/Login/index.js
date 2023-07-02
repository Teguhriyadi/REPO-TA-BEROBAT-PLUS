import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { baseUrl, colors, showSuccess, storeData } from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import FormInput from '../../../../components/FormInput';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';
import { configfirebase } from '../../../../firebase/firebaseConfig';

const Login = ({ navigation }) => {

    const [form, setForm] = useState({
        nomor_hp: "",
        password: ""
    });

    const [error, setError] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const dispatch = useDispatch();

    const handleInputChange = (value) => {
        setForm({ ...form, nomor_hp: value });
        if (value === "") {
            setError("Nomor HP Tidak Boleh Kosong");
        } else {
            setError("");
        }
    }

    const handleInputPassword = (value) => {
        setForm({ ...form, password: value });
        if (value === "") {
            setErrorPassword("Password Tidak Boleh Kosong");
        } else {
            setErrorPassword("");
        }
    }

    const loginUser = async () => {
        if (form.nomor_hp.trim() === "" && form.password.trim() === "") {
            setError("Nomor HP Tidak Boleh Kosong");
            setErrorPassword("Password Tidak Boleh Kosong");
            return;
        } else {
            if (form.nomor_hp.trim() === "") {
                setError("Nomor HP Tidak Boleh Kosong");
                return;
            } else if (form.password.trim() === "") {
                setErrorPassword("Password Tidak Boleh Kosong");
                return;
            }
        }

        setError("");
        setErrorPassword("");

        dispatch({
            type: 'SET_LOADING',
            value: true
        });

        try {
            const { data } = await axios({
                url: `${baseUrl.url}/autentikasi/login`,
                method: "POST",
                data: {
                    nomor_hp: form.nomor_hp,
                    password: form.password
                }
            });

            const datauser = {
                idx: data.data.id,
                nama: data.data.nama,
                email: data.data.email,
                nomor_hp: data.data.nomor_hp,
                token: data.data.token,
                role: data.data.id_role,
                uuid_firebase: data.data.uuid_firebase
            }

            if (data.message == "Berhasil Login") {
                if (data.data.id_role == "RO-2003062") {
                    dispatch({ type: 'SET_LOADING', value: false });
                    setForm('reset');

                    axios({
                        url: `${baseUrl.url}/akun/profil/dokter/profil`,
                        headers: {
                            Authorization: 'Bearer ' + data.data.token
                        },
                        method: "GET"
                    }).then((response) => {
                        storeData("profil_dokter", response.data.data);
                    }).catch((error) => {
                        console.log(error);
                    })

                    showSuccess("Good Job, Login Success", "Anda Login Sebagai Dokter");

                    storeData("dataUser", datauser);
                    storeData("isLoggedIn", "true");

                    navigation.navigate(Navigasi.MAIN_DOKTER);
                } else if (data.data.id_role == "RO-2003064") {
                    dispatch({ type: "SET_LOADING", value: false });

                    if (datauser.uuid_firebase == null) {

                        const profilkonsumen = await axios({
                            url: `${baseUrl.url}/akun/profil/konsumen/profil`,
                            headers: {
                                Authorization: 'Bearer ' + datauser.token
                            },
                            method: "GET"
                        })

                        configfirebase.auth()
                            .createUserWithEmailAndPassword(datauser.email, form.password)
                            .then((sukses) => {
                                const konsumendata = {
                                    nik: profilkonsumen.data.data.nik,
                                    nomor_hp: profilkonsumen.data.data.user.nomor_hp,
                                    email: profilkonsumen.data.data.user.email,
                                    nama: profilkonsumen.data.data.user.nama,
                                    uid: sukses.user.uid
                                };

                                configfirebase.database()
                                    .ref(`users/konsumen/` + sukses.user.uid + "/")
                                    .set(konsumendata)
                                configfirebase.auth()
                                    .signInWithEmailAndPassword(datauser.email, form.password)
                                    .then((responseberhasil) => {
                                        configfirebase.database()
                                            .ref(`users/konsumen/${responseberhasil.user.uid}`)
                                            .once('value')
                                            .then((responsedatabase) => {
                                                if (responsedatabase.val()) {
                                                    storeData("user", responsedatabase.val());
                                                }
                                            })
                                    }).catch((errrodata) => {
                                        console.log(errrodata);
                                    })

                                showSuccess("Good Job, Login Success", "Anda Berhasil Login");
                                storeData("dataUser", datauser);
                                storeData("isLoggedIn", "true");
                                setForm("reset");

                                navigation.navigate(Navigasi.MAIN_APP);

                            }).catch((error) => {
                                console.log(error);
                            })
                    } else {
                        configfirebase.auth()
                            .signInWithEmailAndPassword(datauser.email, form.password)
                            .then((responsesukses) => {
                                configfirebase.database()
                                    .ref(`users/konsumen/${responsesukses.user.uid}`)
                                    .once("value")
                                    .then((responsedatabase) => {
                                        if (responsedatabase.val()) {
                                            storeData("user", responsedatabase.val());
                                        }
                                    })
                            }).catch((error) => {
                                console.log(error);
                            })

                        showSuccess("Good Job, Login Success", "Anda Berhasil Login");
                        storeData("dataUser", datauser);
                        storeData("isLoggedIn", "true");
                        setForm("reset");

                        navigation.navigate(Navigasi.MAIN_APP);
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={styles.background}>
                <StatusBarComponent />
                <Text style={styles.textHeader}> Sign In </Text>
                <Text style={styles.textSubHeader}>
                    Silahkan Login Terlebih Dahulu Untuk Memulai Program.
                </Text>
                <View style={styles.viewCard}>
                    <FormInput
                        placeholder={"Masukkan Nomor HP"}
                        placeholderTextColor={"grey"}
                        keyBoardType={"numeric"}
                        value={form.nomor_hp}
                        onChangeText={handleInputChange}
                    />
                    {error != '' &&
                        <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
                            <Text style={styles.textError}>
                                * {error}
                            </Text>
                        </View>
                    }
                    <FormInput
                        placeholder={"Masukkan Password"}
                        placeholderTextColor={"grey"}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={handleInputPassword}
                    />
                    {errorPassword != '' &&
                        <View style={{ marginHorizontal: 10, marginBottom: 5 }}>
                            <Text style={styles.textError}>
                                * {errorPassword}
                            </Text>
                        </View>
                    }
                    <TouchableOpacity style={{ paddingTop: 10 }}>
                        <View style={{ alignItems: 'flex-end', paddingRight: 10 }}>
                            <Text style={{ color: 'grey' }}>
                                Lupa Password
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        loginUser()
                    }} style={styles.button}>
                        <Text style={styles.textbutton}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 10 }}
                        onPress={() => {
                            navigation.navigate(Navigasi.DAFTAR_AKUN_KONSUMEN)
                        }}>
                        <Text style={{ color: 'blue' }}>
                            Daftar Disini
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundPutih
    },

    textHeader: {
        paddingHorizontal: 10,
        paddingTop: 10,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold'
    },

    textError: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Medium'
    },

    textSubHeader: {
        color: 'black',
        fontSize: 12,
        paddingHorizontal: 10
    },

    viewCard: {
        backgroundColor: 'white',
        height: 300,
        marginHorizontal: 10,
        marginTop: 10,
        elevation: 5,
        borderRadius: 10,
        justifyContent: 'center'
    },

    button: {
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: 'green',
        marginHorizontal: 10,
        borderRadius: 10
    },

    textbutton: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Login;