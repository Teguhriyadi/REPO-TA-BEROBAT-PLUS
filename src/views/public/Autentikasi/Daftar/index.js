import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Navigasi from '../../../../partials/navigasi';
import {useForm, showMessage, colors, storeData} from '../../../../utils';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Firebase from '../../../../firebase/firebaseConfig';
import AnimasiLogin from '../../../../components/AnimasiLogin';
import {baseUrl} from '../../../../utils';
import {useDispatch} from 'react-redux';

const Daftar = ({navigation}) => {
  const [form, setForm] = useForm({
    nik: '',
    nama: '',
    email: '',
    password: '',
    nomor_hp: '',
  });

  const dispatch = useDispatch();

  const daftarAkun = async () => {
    try {
      const {dataUser} = await axios.post(`${baseUrl.url}/akun/konsumen`, {
        nik: form.nik,
        nama: form.nama,
        email: form.email,
        password: form.password,
        nomor_hp: form.nomor_hp,
      });
      dispatch({type: 'SET_LOADING', value: true});
      Firebase.auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(success => {
          dispatch({type: 'SET_LOADING', value: false});
          setForm('reset');
          const data = {
            nik: form.nik,
            nomor_hp: form.nomor_hp,
            email: form.email,
            nama: form.nama,
            uid: success.user.uid,
          };
          Firebase.database()
            .ref('users/' + success.user.uid + '/')
            .set(data);
          storeData('user', data);
          navigation.navigate(Navigasi.LOGIN);
        })
        .catch(error => {
          const pesanError = error.message;
          dispatch({type: 'SET_LOADING', value: false});
          // showMessage({
          //   message: pesanError,
          //   type: 'default',
          //   backgroundColor: colors.error,
          //   color: colors.textWhite,
          // });
          console.log(pesanError);
        });
    } catch (error) {
      //   const pesanError = error.message;
      //   setLoading(false);
      //   showMessage({
      //     message: pesanError,
      //     type: 'default',
      //     backgroundColor: colors.error,
      //     color: colors.textWhite,
      //   });
      console.log(error);
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <Text style={styles.textHeader}>Daftar Akun</Text>
        <Text style={styles.textSubHeader}>
          Silahkan daftarkan akun terlebih dahulu.
        </Text>
        <ScrollView>
          <View style={styles.viewCard}>
            <View style={styles.viewTextInput}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Icon
                  name="md-logo-whatsapp"
                  style={{fontSize: 20, color: 'gray'}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 40,
                }}>
                <TextInput
                  placeholder="Masukkan NIK"
                  placeholderTextColor="gray"
                  value={form.nik}
                  keyboardType={'numeric'}
                  onChangeText={value => setForm('nik', value)}
                  style={{fontSize: 14, color: 'black'}}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Icon
                  name="md-logo-whatsapp"
                  style={{fontSize: 20, color: 'gray'}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 40,
                }}>
                <TextInput
                  placeholder="Masukkan Nama"
                  placeholderTextColor="gray"
                  value={form.nama}
                  onChangeText={value => setForm('nama', value)}
                  style={{fontSize: 14, color: 'black'}}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Icon
                  name="md-logo-whatsapp"
                  style={{fontSize: 20, color: 'gray'}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 40,
                }}>
                <TextInput
                  placeholder="Masukkan Email"
                  placeholderTextColor="gray"
                  value={form.email}
                  onChangeText={value => setForm('email', value)}
                  style={{fontSize: 14, color: 'black'}}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Icon
                  name="md-logo-whatsapp"
                  style={{fontSize: 20, color: 'gray'}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 40,
                }}>
                <TextInput
                  placeholder="Masukkan Password"
                  placeholderTextColor="gray"
                  value={form.password}
                  onChangeText={value => setForm('password', value)}
                  style={{fontSize: 14, color: 'black'}}
                />
              </View>
            </View>
            <View style={styles.viewTextInput}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Icon
                  name="md-logo-whatsapp"
                  style={{fontSize: 20, color: 'gray'}}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 10,
                  paddingRight: 40,
                }}>
                <TextInput
                  placeholder="Masukkan Nomor HP"
                  placeholderTextColor="gray"
                  value={form.nomor_hp}
                  keyboardType={'numeric'}
                  onChangeText={value => setForm('nomor_hp', value)}
                  style={{fontSize: 14, color: 'black'}}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                daftarAkun();
              }}
              style={{
                marginTop: 10,
                paddingVertical: 10,
                backgroundColor: 'green',
                marginHorizontal: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Daftar Akun
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.replace(Navigasi.LOGIN);
            }}
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: 'blue',
                textDecorationLine: 'underline',
                textAlign: 'center',
              }}>
              Kembali Ke Halaman Login
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    paddingHorizontal: 10,
    paddingTop: 10,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSubHeader: {
    color: 'black',
    fontSize: 12,
    paddingHorizontal: 10,
  },
  viewCard: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  viewTextInput: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default Daftar;
