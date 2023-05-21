import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {baseUrl, colors, getData} from '../../../../utils';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const AllDataApotek = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [apotek, setApotek] = useState(null);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      fetchApotek();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const fetchApotek = async () => {
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
              let latitude = position.coords.latitude;
              let longitude = position.coords.longitude;

              axios({
                url: `${baseUrl.url}/apotek/pengaturan/profil_apotek/find_nearest`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token,
                },
                method: 'POST',
                data: {
                  latitude: latitude,
                  longitude: longitude,
                },
              })
                .then(response => {
                  setApotek(response.data);
                })
                .catch(error => {
                  console.log(error);
                });
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
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
        </TouchableOpacity>
        <Text style={styles.textHeading}>Semua Data Apotek Terdekat</Text>
      </View>
      <View style={styles.content}>
        {apotek == null ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={colors.primary} />
            <Text style={styles.textLoading}>Loading...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {apotek.map(item => {
                return (
                  <View key={item.id_profil_apotek} style={styles.card}>
                    <Image
                      source={require('../../../../assets/images/gambar-rs.jpg')}
                      style={{width: '100%', height: 200, borderRadius: 10}}
                    />
                    <Text style={styles.textApotek}>{item.nama_apotek}</Text>
                    <View style={styles.backgroundJarak}>
                      <View style={styles.backgroundIcon}>
                        <Icon name="ios-location" style={{color: 'black'}} />
                      </View>
                      <Text style={styles.textJarak}>
                        {Math.floor(item.distance)} KM
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
  },

  heading: {
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },

  textHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginLeft: 10,
  },

  content: {
    marginVertical: 15,
  },

  textLoading: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 16,
  },

  textJarak: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: 'white',
    elevation: 5,
    width: '45%',
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
    marginVertical: 2,
  },

  textApotek: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Poppins-Medium',
  },

  backgroundJarak: {
    backgroundColor: colors.backgroundDasarBelakang,
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    width: 70,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  backgroundIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
});

export default AllDataApotek;
