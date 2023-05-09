import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  Image,
} from 'react-native';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
import {colors, getData} from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

const Keranjang = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [keranjang, setKeranjang] = useState([]);
  const [alamat, setAlamat] = useState(null);

  useEffect(() => {
    getDataUserLocal();
    getKeranjang();
    dataLokasi();
  }, [dataPribadi.token, dataPribadi.idx]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      // console.log(res);
      setDataPribadi(res);
    });
  };

  const getKeranjang = async () => {
    try {
      const produk = await AsyncStorage.getItem(`produk_${dataPribadi.idx}`);
      if (produk !== null) {
        const produkArray = JSON.parse(produk);
        setKeranjang(produkArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataLokasi = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Mengambil Data Lokasi',
          message: 'Izinkan Mengambil Data Lokasi Untuk Pengiriman',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          Geocoder.init('AIzaSyB2Xd4GJtDxGPUI7nlMV-I99x5EQqYqhGc');
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              setAlamat(json.results[0].formatted_address);
            })
            .catch(error => {
              console.log(error);
            });
        });
      } else {
        console.log('Tidak Ditemukan');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK);
          }}>
          <Icon name="arrow-back" style={{color: 'black', fontSize: 20}} />
        </TouchableOpacity>
        <Text style={styles.textHeading}>Keranjang</Text>
        <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon name="trash" style={{color: 'red', fontSize: 20}} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.infoUser}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
              Tujuan Barang
            </Text>
            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{color: 'purple', fontSize: 16}}>Ganti</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoPribadi}>
            <Text style={{color: 'black', marginTop: 10}}>
              Posisi Anda Sekarang
            </Text>
            <Text style={{color: 'black', fontSize: 12, textAlign: 'justify'}}>
              {alamat}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Inputkan Lokasi Yang Anda Inginkan"
              placeholderTextColor={'gray'}
            />
            <Text style={{color: 'gray', fontSize: 16, fontWeight: 'bold'}}>
              Kontak Penerima
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'justify',
                  }}>
                  {dataPribadi.nama}
                </Text>
                <Text style={{color: 'black', fontSize: 12}}>
                  {dataPribadi.nomor_hp}
                </Text>
              </View>
              <TouchableOpacity style={{justifyContent: 'center'}}>
                <Icon name="pencil" style={{color: 'black', fontSize: 20}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.dataBarang}>
          <FlatList
            data={keranjang}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <>
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <View
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      borderRadius: 10,
                      marginRight: 10,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../../../../assets/images/auth-new.png')}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                  <View style={styles.barang}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      {item.nama_produk}
                    </Text>
                    <Text style={{color: 'gray', fontSize: 12}}>Per Strip</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      {item.harga_produk}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.backgroundEmpty,
                          padding: 5,
                          borderRadius: 100,
                        }}>
                        <Icon
                          name="trash"
                          style={{color: 'black', fontSize: 20}}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.viewOperator, {marginLeft: 10}]}>
                        <Text style={styles.textViewOperator}>+</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                        }}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>
                          {item.count}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.viewOperator, {marginLeft: 10}]}>
                        <Text style={styles.textViewOperator}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.garisBorder} />
              </>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnKeranjang}
        onPress={() => {
          navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK);
        }}>
        <Text style={styles.textBtnKeranjang}>+ Tambah Keranjang Lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  heading: {
    backgroundColor: colors.background,
    padding: 10,
    height: 50,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textHeading: {
    color: 'black',
    paddingLeft: 15,
  },
  content: {
    marginTop: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInput: {
    marginVertical: 10,
    borderColor: colors.backgroundEmpty,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  btnKeranjang: {
    borderColor: 'purple',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  textBtnKeranjang: {
    color: 'purple',
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  garisBorder: {
    borderColor: colors.backgroundDasarBelakang,
    borderWidth: 1,
    width: '100%',
  },
  viewOperator: {
    borderColor: 'purple',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  textViewOperator: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Keranjang;
