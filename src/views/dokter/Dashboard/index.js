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
  Alert,
  Switch
} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import {baseUrl, getData} from '../../../utils';
import {colors} from '../../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import Navigasi from '../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [apotek, setApotek] = useState(null);
  const [rumah_sakit, setRumahSakit] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [getswitch, setswitch] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataLokasi();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
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
          const {latitude, longitude} = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          
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
              setRumahSakit(response.data.data);
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

  const toggleswitch = () => {
    setswitch(previous => !previous);
  }

  const logout = async () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda Yakin Ingin Keluar?',
      [
        {
          text: 'Tidak',
          style: 'cancel',
        },
        {
          text: 'Setuju',
          onPress: async () => {
            try {
              AsyncStorage.removeItem('dataUser');
              AsyncStorage.removeItem('user');
              AsyncStorage.removeItem('isLoggedIn');
              AsyncStorage.removeItem('profil_dokter');

              await axios({
                url: `${baseUrl.url}/logout`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token,
                },
                method: 'GET',
              });

              navigation.navigate(Navigasi.LOGIN);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 10}}>
              <Image
                source={require('../../../assets/images/people.png')}
                style={styles.headerProfile}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                {dataPribadi.nama}
              </Text>
              <Text style={{color: 'white', fontSize: 12}}>
                {dataPribadi.nomor_hp}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}>
                <Icon
                  name="exit-outline"
                  style={{fontSize: 30, color: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.textSaldo}>Saldo Anda</Text>
          <Text style={styles.saldo}>Rp. 1.000.000.000.000</Text>
          <View style={styles.cardDashboard}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Pasien Hari Ini
                </Text>
                <Text
                  style={{
                    color: 'black',
                    marginTop: 10,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  0
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Jumlah Pasien
                </Text>
                <Text
                  style={{
                    color: 'black',
                    marginTop: 10,
                    fontSize: 14,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  30
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 2, marginTop: 30}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
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
                }}
                onPress={() => {
                  navigation.navigate(Navigasi.ALL_DATA_RUMAH_SAKIT_TERDEKAT);
                }}>
                <Text
                  style={{color: 'green', fontWeight: 'bold', fontSize: 10}}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginLeft: 2, marginTop: 5}}>
            {rumah_sakit == null ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {rumah_sakit.map(item => {
                  return (
                    <View
                      key={item.id_rumah_sakit}
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
                          width: 60,
                          marginTop: 5,
                          paddingVertical: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingRight: 5,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 10,
                            fontFamily: 'Poppins-Medium',
                            fontWeight: 'bold',
                          }}>
                          <Icon name="ios-location" />{' '}
                          {Math.floor(item.distance)} KM
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
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
                onPress={() => {
                  navigation.navigate(Navigasi.ALL_DATA_APOTEK_TERDEKAT);
                }}
                style={{
                  borderColor: 'green',
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  marginVertical: 5,
                }}>
                <Text
                  style={{color: 'green', fontWeight: 'bold', fontSize: 10}}>
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginHorizontal: 5}}>
            {apotek == null ? (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.primary} />
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {apotek.map(item => {
                  return (
                    <View
                      key={item.id_profil_apotek}
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                        borderRadius: 5,
                        marginRight: 10,
                        marginVertical: 5,
                        marginLeft: 5,
                        width: 170,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
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
                          width: 80,
                          alignItems: 'center',
                          borderRadius: 5,
                          paddingVertical: 5,
                          paddingRight: 5,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          <Icon name="ios-location" />{' '}
                          {Math.floor(item.distance)} KM
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'blue',
    height: 170,
    padding: 10,
  },
  headerProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
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
  listApotek: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  saldo: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  textSaldo: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  cardDashboard: {
    backgroundColor: 'white',
    elevation: 5,
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default Dashboard;
