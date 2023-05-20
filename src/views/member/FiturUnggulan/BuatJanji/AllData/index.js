import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {colors, baseUrl, getData} from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {FlatList} from 'react-native-gesture-handler';
import Navigasi from '../../../../../partials/navigasi';

const AllData = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [rumah_sakit, setRumahSakit] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      getRumahSakit();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const getRumahSakit = async () => {
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
                url: `${baseUrl.url}/master/rumah_sakit/data/find_nearest/all`,
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
                  setShowIndicator(true);
                  setRumahSakit(response.data);
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
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.textHeading}>RS & Klinik Terdekat</Text>
        </View>
      </View>

      {showIndicator ? (
        <FlatList
          data={rumah_sakit}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <>
              <View style={styles.content}>
                <View style={styles.viewImage}>
                  {item.foto_rs == null ? (
                    <Image
                      source={require('../../../../../assets/images/auth-new.png')}
                      style={{width: 100, height: 150}}
                    />
                  ) : (
                    <Image
                      source={{uri: item.foto_rs}}
                      style={{width: 100, height: 150}}
                    />
                  )}
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.namaRs}>{item.nama_rs}</Text>
                  <Text style={{color: 'black', fontSize: 12}}>
                    {item.kategori_rs == 1
                      ? 'Rumah Sakit Spesialis'
                      : 'Rumah Sakit Umum'}
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 30}}>
                    <View style={styles.viewAlamatRs}>
                      <Text style={{color: 'black'}}>{item.alamat_rs}</Text>
                    </View>
                    <View style={styles.viewKM}>
                      <Icon name="ios-location" style={{color: 'black'}} />
                      <Text style={styles.textKM}>{item.jarak} KM</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 40}}>
                    <View style={styles.viewRating}>
                      <Text style={styles.textRating}>5,7*</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.designButton}
                      onPress={() => {
                        navigation.navigate(Navigasi.DETAIL_BUAT_JANJI, {
                          data: item,
                        });
                      }}>
                      <Text style={styles.textButton}>Pilih</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.viewBorder} />
            </>
          )}
        />
      ) : (
        <>
          <View style={styles.jarakHorizontal}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.imageEmpty} />
              <View style={{flex: 2}}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jarakHorizontal}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.imageEmpty} />
              <View style={{flex: 2}}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jarakHorizontal}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.imageEmpty} />
              <View style={{flex: 2}}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jarakHorizontal}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.imageEmpty} />
              <View style={{flex: 2}}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                  <View style={{flex: 1}}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    padding: 15,
    height: 50,
    backgroundColor: colors.background,
    elevation: 5,
  },
  icon: {
    color: 'black',
    marginRight: 10,
    fontSize: 20,
  },
  textHeading: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 15,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
  },
  jarakHorizontal: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  imageEmpty: {
    backgroundColor: colors.backgroundEmpty,
    height: 150,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  namaRsEmpty: {
    width: 200,
    backgroundColor: colors.backgroundEmpty,
    height: 25,
    borderRadius: 10,
  },
  kategoriRsEmpty: {
    width: 100,
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    marginTop: 5,
    borderRadius: 10,
  },
  alamatRsEmpty: {
    height: 20,
    backgroundColor: colors.backgroundEmpty,
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
    width: 60,
  },
  KMEmpty: {
    height: 20,
    backgroundColor: colors.backgroundEmpty,
    marginTop: 20,
    borderRadius: 10,
    width: 60,
  },
  ratingEmpty: {
    height: 20,
    backgroundColor: colors.backgroundEmpty,
    marginTop: 20,
    borderRadius: 10,
    flex: 1,
    width: 60,
  },
  buttonEmpty: {
    height: 20,
    backgroundColor: colors.backgroundEmpty,
    marginTop: 20,
    borderRadius: 10,
    width: 60,
  },
  viewImage: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: colors.backgroundEmpty,
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  namaRs: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewKM: {
    backgroundColor: colors.backgroundEmpty,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  viewAlamatRs: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  textKM: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 3,
    fontSize: 10,
  },
  designButton: {
    backgroundColor: '#188EE4',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  viewBorder: {
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  textRating: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: '#4E9CD4',
    borderRadius: 5,
    paddingVertical: 5,
  },
  viewRating: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default AllData;
