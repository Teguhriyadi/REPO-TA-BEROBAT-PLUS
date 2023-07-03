import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {baseUrl, colors, getData} from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RingkasanPembayaranProduk = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [keranjang, setKeranjang] = useState([]);
  const [harga, setHarga] = useState(0);
  const [index, setIndex] = useState(0);
  const layouts = useWindowDimensions();
  const [tampung, setTampung] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('setBank');
      if (data !== null) {
        setTampung(data);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      getKeranjang();
      getTotalHarga();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getKeranjang = async () => {
    try {
      const produk = await AsyncStorage.getItem(`produk_${dataPribadi.idx}`);
      const arrayProduk = JSON.parse(produk);

      if (arrayProduk !== null) {
        setKeranjang(arrayProduk);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalHarga = async () => {
    try {
      let totalHarga = 0;

      const produk = await AsyncStorage.getItem(`produk_${dataPribadi.idx}`);
      const arrayProduk = JSON.parse(produk);

      if (arrayProduk !== null) {
        arrayProduk.forEach(item => {
          totalHarga += item.harga * item.count;
        });
      }

      setHarga(totalHarga);
    } catch (error) {
      console.log(error);
    }
  };

  const bayar = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/invoice`,
        method: 'POST',
        data: {
          expected_amount: harga,
        },
      });

      console.log("---------------");
      console.log(response.data.data.status);
      
      navigation.navigate(Navigasi.CASH, {
        data: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.KERANJANG);
          }}>
          <Icon name="arrow-back" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.textHeading}>Ringkasan Pembayaran</Text>
      </View>
      <View style={{flex: 7}}>
        <View style={styles.content}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={{color: 'black'}}>Nama Pasien :</Text>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                {dataPribadi.nama}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Text style={{color: 'purple', fontWeight: 'bold'}}>Ganti</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.content]}>
          <View style={styles.informasiDetail}>
            <View style={styles.viewGrid}>
              <Text style={{color: 'gray'}}>
                {' '}
                Keranjang ({keranjang.length}) Barang{' '}
              </Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{color: 'black'}}>Rp. {harga}</Text>
              </View>
            </View>
            <View style={styles.viewGrid}>
              <Text style={{color: 'gray'}}> Biaya Pengiriman </Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{color: 'black'}}>Rp. 120.000</Text>
              </View>
            </View>
            <View style={styles.viewGrid}>
              <Text style={{color: 'gray'}}> Pembayaran Anda </Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={{color: 'black'}}>Rp. 120.000</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderColor: colors.backgroundEmpty,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Text style={{color: 'black'}}>Pembayaran Anda</Text>
        <Text style={{color: 'black', fontWeight: 'bold'}}>Rp. 150.000</Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            paddingVertical: 10,
            marginVertical: 5,
            borderRadius: 5,
          }}
          onPress={() => {
            bayar();
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  heading: {
    height: 50,
    padding: 10,
    elevation: 5,
    backgroundColor: colors.backgroundPutih,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: 'black',
  },
  textHeading: {
    color: 'black',
    fontSize: 14,
    marginLeft: 10,
  },
  content: {
    marginTop: 3,
    backgroundColor: colors.backgroundPutih,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  viewGrid: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default RingkasanPembayaranProduk;
