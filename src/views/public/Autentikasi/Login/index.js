import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import axios from 'axios';
import {
  storeData,
  showError,
  showSuccess,
} from '../../../../utils';
import Firebase from '../../../../firebase/firebaseConfig';
import Navigasi from '../../../../partials/navigasi';
import {baseUrl} from '../../../../utils';
import {useDispatch} from 'react-redux';
import FormInput from '../../../../components/FormInput';

const Login = ({navigation}) => {

  const [form, setForm] = useState({
    nomor_hp: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (value) => {
    setForm({...form, nomor_hp: value});
    if (value === "") {
      setError("Nomor HP Tidak Boleh Kosong")
    } else {
      setError("");
    }
  }

  const handleInputPassword = (value) => {
    setForm({...form, password: value});
    if (value === "") {
      setErrorPassword("Password Tidak Boleh Kosong")
    } else {
      setErrorPassword("");
    }
  }

  const loginUser = async () => {
    if (form.nomor_hp.trim() === '' && form.password.trim() === '') {
      setError("Nomor HP Tidak Boleh Kosong");
      setErrorPassword("Password Tidak Boleh Kosong");
      return;
    } else {
      if (form.nomor_hp.trim() === '') {
        setError("Nomor HP Tidak Boleh Kosong");
        return;
      } else if (form.password.trim() === '') {
        setErrorPassword("Password Tidak Boleh Kosong");
        return;
      }
    }

    setError('');
    setErrorPassword('');

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
          });

          showSuccess('Good Job, Login Success', 'Anda Login Sebagai Dokter');

          storeData('dataUser', dataUser);
          storeData('isLoggedIn', 'true');

          navigation.navigate(Navigasi.MAIN_DOKTER);

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
          <FormInput placeholder="Masukkan Nomor HP" placeholderTextColor="grey" keyBoardType="numeric" value={form.nomor_hp} onChangeText={handleInputChange} />
          {error != '' && <View style={{marginHorizontal: 10, marginBottom: 5}}>
          <Text style={{fontStyle: 'italic', color: 'red', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Medium'}}>* {error }</Text>
          </View> }
          <FormInput placeholder="Masukkan Password" placeholderTextColor="grey" secureTextEntry={true} value={form.password} onChangeText={handleInputPassword} />
          {errorPassword != '' && <View style={{marginHorizontal: 10, marginBottom: 5}}>
          <Text style={{fontStyle: 'italic', color: 'red', fontSize: 12, fontWeight: 'bold',  fontFamily: 'Poppins-Medium'}}>* {errorPassword }</Text>
          </View> }
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
});

export default Login;
