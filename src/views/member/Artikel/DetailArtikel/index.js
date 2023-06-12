import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Heading from '../../../../components/Heading';
import { baseUrl, getData } from '../../../../utils';
import axios from 'axios';

const Detail = ({ navigation, route }) => {

  const getArtikel = route.params;

  const [dataPribadi, setDataPribadi] = useState({});

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      getkategori();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getkategori = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/grouping_artikel/${getArtikel.data.id_artikel}/get`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      })

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <Heading navigasi={() => {
        navigation.goBack();
      }} textHeading={getArtikel.data.judul_artikel} />
      <ScrollView>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={styles.judul}>
            {getArtikel.data.judul_artikel}
          </Text>
          <Text style={{ color: 'black', paddingTop: 10 }}>#Mohammad</Text>
          <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <Text style={{ color: 'purple' }}>
              {getArtikel.data.get_user.nama} :
            </Text>
            <Text style={{ color: 'gray' }}> 22 Maret 2023</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            {getArtikel.data.foto == null ? (
              <Image
                source={require('../../../../assets/images/gambar-rs.jpg')}
                resizeMode="cover"
                style={{ width: '100%', borderRadius: 10, height: 200 }}
              />
            ) : (
              <Image
                source={{ uri: getArtikel.data.foto }}
                resizeMode="cover"
                style={{ width: 300, height: 200 }}
              />
            )}
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{ color: 'black', textAlign: 'justify', lineHeight: 20 }}>
              {getArtikel.data.deskripsi}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: 'black',
    textAlign: 'justify'
  }
});

export default Detail;
