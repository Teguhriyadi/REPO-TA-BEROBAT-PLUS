import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import {baseUrl, getData} from '../../../utils';
import {colors} from '../../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import Navigasi from '../../../partials/navigasi';

const Dashboard = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [apotek, setApotek] = useState({});
  const [rumah_sakit, setRumahSakit] = useState({});
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataLokasi();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
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
                  setShowIndicator(true);
                })
                .catch(error => {
                  console.log(error);
                });

              axios({
                url: `${baseUrl.url}/master/rumah_sakit/data/find_nearest`,
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
                  console.log(response.data.data);
                  setRumahSakit(response.data.data);
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
      <StatusBarComponent />
      <View style={styles.header}>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <View style={styles.identitasImage}>
            <Image
              source={require('../../../assets/images/people.png')}
              style={styles.imageProfil}
            />
          </View>
          <View style={styles.identitas}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                fontWeight: 'bold',
              }}>
              {dataPribadi.nama}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                fontWeight: 'bold',
              }}>
              {dataPribadi.nomor_hp}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Icon
              name="create-outline"
              style={{fontSize: 20, color: 'white'}}
            />
          </View>
        </View>
        <View style={styles.saldo}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Saldo Anda
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              textAlign: 'justify',
            }}>
            Rp. 100.000.000.000.000
          </Text>
        </View>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1, marginRight: 5}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                }}>
                Jumlah Pasien Hari Ini
              </Text>
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                }}>
                Total Pasien
              </Text>
            </View>
          </View>
          <View
            style={{borderColor: 'gray', borderWidth: 1, marginHorizontal: 10}}
          />
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1, marginRight: 5}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                }}>
                0
              </Text>
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                }}>
                30
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: 120,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Medium',
          }}>
          Rumah Sakit Terdekat
        </Text>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <TouchableOpacity
            style={{
              borderColor: 'green',
              borderWidth: 1,
              paddingVertical: 3,
              paddingHorizontal: 5,
              borderRadius: 10,
            }} onPress={() => {
              navigation.navigate(Navigasi.ALL_DATA_RUMAH_SAKIT_TERDEKAT)
            }} >
            <Text style={{color: 'green', fontWeight: 'bold', fontSize: 10}}>
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginLeft: 2}}>
        <FlatList
          data={rumah_sakit}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id_rumah_sakit}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: 'white',
                elevation: 5,
                marginRight: 5,
                padding: 10,
                borderRadius: 10,
                marginLeft: 10,
                marginVertical: 5,
              }}>
              <Image
                source={require('../../../assets/images/gambar-rs.jpg')}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {item.nama_rs}
              </Text>
              <View
                style={{
                  backgroundColor: colors.backgroundDasarBelakang,
                  borderRadius: 5,
                  width: 40,
                  marginTop: 5,
                  paddingVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    fontFamily: 'Poppins-Medium',
                    fontWeight: 'bold',
                  }}>
                  10 KM
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
            }}>
            Apotek Terdekat
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <TouchableOpacity
            style={{
              borderColor: 'green',
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 3,
              paddingHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text style={{color: 'green', fontWeight: 'bold', fontSize: 10}}>
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginHorizontal: 10}}>
        <FlatList
          data={apotek}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id_profil_apotek}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: 'white',
                elevation: 5,
                borderRadius: 5,
                marginRight: 10,
                marginVertical: 5,
                marginLeft: 5,
                width: 170,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/gambar-rs.jpg')}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 5,
                    marginVertical: 10,
                  }}
                />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  paddingHorizontal: 10,
                }}>
                {item.nama_apotek}
              </Text>
              <View
                style={{
                  backgroundColor: colors.backgroundDasarBelakang,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: 70,
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingVertical: 5
                }}>
                <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>10 KM</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: 'blue',
    height: 150,
    paddingTop: 20,
  },
  headerProfile: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  cardList: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  identitasImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imageProfil: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
  },
  content: {
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    elevation: 5,
  },
  saldo: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listApotek: {
    marginHorizontal: 10,
    marginTop: 20,
  },
});

export default Dashboard;
