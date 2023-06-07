import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ScrollView,
  TextInput
} from 'react-native';
import { colors, baseUrl, getData } from '../../../../../utils';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Navigasi from '../../../../../partials/navigasi';
import Heading from '../../../../../components/Heading';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';

const AllData = ({ navigation }) => {
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
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          axios
            .get(url)
            .then((response) => {
              axios({
                url: `${baseUrl.url}/master/rumah_sakit/data/find_nearest`,
                headers: {
                  Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "POST",
                data: {
                  latitude: latitude,
                  longitude: longitude
                }
              }).then((response) => {
                console.log(response.data.data);
                setRumahSakit(response.data.data);
                setShowIndicator(true);
              }).catch((error) => {
                console.log(error);
              })
            }).catch((error) => {
              console.log(error);
            })
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
      <StatusBarComponent/>
      <Heading navigasi={() => navigation.goBack()} textHeading={"RS & Klinik Terdekat"} />
      <View style={styles.cardSearch}>
        <View style={styles.viewIcon}>
          <Icon
            name="search"
            style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}
          />
        </View>
        <View style={styles.contentSearch}>
          <TextInput
            placeholder="Ex: RS. Plumbon Cirebon"
            placeholderTextColor="gray"
            style={{
              height: 40,
              fontSize: 12,
              color: 'gray',
            }}
          />
        </View>
      </View>
      {rumah_sakit == null ? (
        <>
          <View style={styles.jarakHorizontal}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.imageEmpty} />
              <View style={{ flex: 2 }}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jarakHorizontal}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.imageEmpty} />
              <View style={{ flex: 2 }}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jarakHorizontal}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.imageEmpty} />
              <View style={{ flex: 2 }}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.jarakHorizontal}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.imageEmpty} />
              <View style={{ flex: 2 }}>
                <View style={styles.namaRsEmpty} />
                <View style={styles.kategoriRsEmpty} />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.alamatRsEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.KMEmpty} />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.ratingEmpty} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={styles.buttonEmpty} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {rumah_sakit.map((item) => {
            return (
              <View key={item.id_rumah_sakit}>
                <View style={styles.content}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    {item.foto_rs == null ? (
                      <Image
                        source={require('../../../../../assets/images/gambar-rs.jpg')}
                        style={{ width: 100, height: 130, borderRadius: 10 }}
                      />
                    ) : (
                      <Image
                        source={{ uri: item.foto_rs }}
                        style={{ width: 100, height: 150, borderRadius: 10 }}
                      />
                    )}
                  </View>
                  <View style={{ flex: 2 }}>
                    <View style={{ marginBottom: 10 }}>
                      <Text style={styles.namaRs}>{item.nama_rs}</Text>
                      <Text style={{ color: 'black', fontSize: 12 }}>
                        {item.kategori_rs == 1 ? 'Rumah Sakit Spesialis' : 'Rumah Sakit Umum'}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 10 }}>
                      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                          {item.deskripsi_rs}
                        </Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: 'skyblue', width: 70, borderRadius: 10, paddingVertical: 2 }}>
                          <Text style={{ color: 'black', fontSize: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                            {Math.floor(item.jarak)} KM
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <View style={{ backgroundColor: colors.backgroundEmpty, width: 100, borderRadius: 10, paddingVertical: 2 }}>
                          <Text style={{ color: 'black', fontSize: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                            <Icon name="thumbs-up" style={{color: 'black'}} /> 5, 7
                          </Text>
                        </View>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: 'blue', width: 70, borderRadius: 10, paddingVertical: 3, elevation: 10 }} onPress={() => {
                          navigation.navigate(Navigasi.DETAIL_BUAT_JANJI, {
                            data: item
                          })
                        }} >
                          <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                            Pilih
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.viewBorder} />
              </View>
            )
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
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
  cardSearch: {
    marginHorizontal: 10,
    backgroundColor: '#f4f0f0',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentSearch: {
    flex: 8,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  namaRs: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
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
