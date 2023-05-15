import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, getData} from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../../partials/navigasi';

const AllDataProduk = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});

  useEffect(() => {
    getDataUserLocal();
  }, []);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.TOKO_KESEHATAN_PRODUK);
          }}>
          <Icon name="arrow-back" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.textHeading}>Semua Data Produk</Text>
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
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
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
});

export default AllDataProduk;
