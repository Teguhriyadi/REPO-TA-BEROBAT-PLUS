import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  storeData,
  useForm,
  colors,
  showError,
  showSuccess,
} from '../../../../utils';
import Firebase from '../../../../firebase/firebaseConfig';
import Navigasi from '../../../../partials/navigasi';
import {baseUrl} from '../../../../utils';
import {useDispatch} from 'react-redux';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    nomor_hp: '',
    password: '',
  });

  const dispatch = useDispatch();

  const loginUser = async () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });

    try {
      const {data} = await axios.post(`${baseUrl.url}/autentikasi/login`, {
        nomor_hp: form.nomor_hp,
        password: form.password,
      });

      const dataUser = {
        idx: data.data.id,
        nama: data.data.nama,
        email: data.data.email,
        nomor_hp: data.data.nomor_hp,
        token: data.data.token,
        role: data.data.id_role,
      };

      if (data.message == 'Berhasil Login') {
        if (data.data.id_role == 'RO-2003062') {
          dispatch({type: 'SET_LOADING', value: false});
          setForm('reset');

          showSuccess('Good Job, Login Success', 'Anda Login Sebagai Dokter');

          storeData('dataUser', dataUser);
          storeData('isLoggedIn', 'true');

          navigation.navigate(Navigasi.MAIN_DOKTER);

          console.log('Hamdan');
        } else if (data.data.id_role == 'RO-2003063') {
          console.log('Hayy');
        } else if (data.data.id_role == 'RO-2003064') {
          dispatch({type: 'SET_LOADING', value: false});
          setForm('reset');
          Firebase.auth()
            .signInWithEmailAndPassword(data.data.email, form.password)
            .then(res => {
              Firebase.database()
                .ref(`users/${res.user.uid}/`)
                .once('value')
                .then(resDatabase => {
                  if (resDatabase.val()) {
                    storeData('user', resDatabase.val());
                  }
                });
            })
            .catch(error => {
              console.log(error);
            });

          showSuccess('Good Job, Login Success', 'Anda Login Sebagai Member');

          storeData('dataUser', dataUser);
          storeData('isLoggedIn', 'true');

          navigation.navigate(Navigasi.MAIN_APP);
        } else if (data.data.id_role == 'RO-2003061') {
          dispatch({type: 'SET_LOADING', value: false});

          showError('Oops, Gagal Login', 'Anda Tidak Memiliki Akses');
        }
      } else {
        navigation.dispatch(NameNavigationPublik.LOGIN);
      }
    } catch (error) {
      const errorMessage = error.message;
      dispatch({type: 'SET_LOADING', value: false});
      showError(errorMessage);
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBarComponent />
        <Text style={styles.textHeader}>Sign In</Text>
        <Text style={styles.textSubHeader}>
          Silahkan Login terlebih dahulu untuk memulai program.
        </Text>
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
                placeholder="Masukkan Nomor HP"
                placeholderTextColor="gray"
                keyboardType={'numeric'}
                value={form.nomor_hp}
                onChangeText={value => setForm('nomor_hp', value)}
                style={{fontSize: 14, color: 'black'}}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'black',
              borderWidth: 1,
              marginHorizontal: 10,
              marginVertical: 5,
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Icon
                name="ios-key-sharp"
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
                secureTextEntry={true}
                style={{fontSize: 14, color: 'black'}}
              />
            </View>
          </View>
          <TouchableOpacity style={{paddingTop: 10}}>
            <View style={{alignItems: 'flex-end', paddingRight: 10}}>
              <Text style={{color: 'gray'}}>Lupa Password ?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              loginUser();
            }}
            style={{
              marginTop: 10,
              paddingVertical: 10,
              backgroundColor: 'green',
              marginHorizontal: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.DAFTAR);
            }}
            style={{paddingLeft: 10, paddingTop: 10}}>
            <Text style={{color: 'blue'}}> Daftar Disini</Text>
          </TouchableOpacity>
        </View>
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
    height: 300,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
    justifyContent: 'center',
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

export default Login;
