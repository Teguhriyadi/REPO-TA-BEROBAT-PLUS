import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../utils/colors';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import {getData} from '../../../utils';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import {baseUrl} from '../../../utils';
import ButtonAllData from '../../../components/ButtonAllData';

const DashboardMember = ({navigation}) => {
  const [user, setUser] = useState({});
  const [alamat, setAlamat] = useState(null);
  const [dataPribadi, setDataPribadi] = useState({});
  const [artikel, setArtikel] = useState(null);
  const [kategori, setKategori] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [produkData, setDataProduk] = useState(null);
  const [keahlian, setKeahlian] = useState(null);

  useEffect(() => {
    const getDataUserLocal = () => {
      getData('user').then(res => {
        setUser(res);
      });
      getData('dataUser').then(res => {
        setDataPribadi(res);
      });
    };

    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataLokasi();
      dataDokter();
      dataKategori();
      dataProduk();
      dataKeahlian();
    });

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.nama, dataPribadi.token]);

  const dataProduk = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios({
          url: `${baseUrl.url}/apotek/produk/data_produk`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token,
          },
          method: 'GET',
        })
          .then(response => {
            setDataProduk(response.data.data);
            setShowIndicator(true);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const dataDokter = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios({
          url: `${baseUrl.url}/master/artikel`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token,
          },
          method: 'GET',
        })
          .then(response => {
            setArtikel(response.data.data);
            setShowIndicator(true);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const dataKategori = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios({
          url: `${baseUrl.url}/master/kategori_artikel`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token,
          },
          method: 'GET',
        })
          .then(response => {
            setKategori(response.data.data);
            setShowIndicator(true);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const dataKeahlian = () => {
    try {
      return new Promise(async (resolve, reject) => {
        await axios({
          url: `${baseUrl.url}/master/keahlian`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token,
          },
          method: 'GET',
        })
          .then(response => {
            setKeahlian(response.data.data);
          })
          .catch(error => {
            console.log(error);
          });
      });
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
          const {latitude, longitude} = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          axios
            .get(url)
            .then((response) => {
              setAlamat(response.data.address.village)
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
    <View style={styles.background}>
      <StatusBarComponent />
      <View style={{backgroundColor: 'blue', height: 70}}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginRight: 10,
            }}>
            <Image
              source={require('../../../assets/images/people.png')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 1,
              }}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Medium',
              }}>
                {dataPribadi.nama}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Medium',
              }}>
              {dataPribadi.nomor_hp}
            </Text>
          </View>
          <View
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="md-location-outline"
                style={{fontSize: 20, color: 'white'}}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 5,
                }}>
                {alamat}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{paddingTop: 10, paddingHorizontal: 10}}>
          <View>
            <Text style={styles.judulTextMenu}>Fitur Unggulan Kami</Text>
          </View>
        </View>
        <View style={styles.cardFitur}>
          <View style={styles.listFitur}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Navigasi.CHAT_DOKTER);
              }}>
              <View style={styles.viewFitur}>
                <Icon name="md-call" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={{paddingTop: 5}}>
              <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                Chat Dokter
              </Text>
            </View>
          </View>
          <View style={styles.listFitur}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace(Navigasi.BUAT_JANJI);
              }}>
              <View style={styles.viewFitur}>
                <Icon name="md-calendar" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={{paddingTop: 5}}>
              <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                Buat Janji
              </Text>
            </View>
          </View>
          <View style={styles.listFitur}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace(Navigasi.LoadingScreen);
              }}>
              <View style={styles.viewFitur}>
                <Icon name="md-calendar" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={{paddingTop: 5}}>
              <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                Reservasi
              </Text>
            </View>
          </View>
          <View style={styles.listFitur}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace(Navigasi.TOKO_KESEHATAN_PRODUK);
              }}>
              <View style={styles.viewFitur}>
                <Icon name="medkit" style={styles.icon} />
              </View>
            </TouchableOpacity>
            <View style={{paddingTop: 5}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Toko Sekitar
              </Text>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 15}}>
          <Text style={styles.judulTextMenu}>Keahlian Dokter</Text>
        </View>

        <View style={{marginHorizontal: 15}}>
          {showIndicator ? (
            <FlatList
              data={keahlian}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(Navigasi.KEAHLIAN_DOKTER, {
                      data: item,
                    });
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      marginBottom: 5,
                    }}>
                    <View style={styles.cardContent}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.logo == null ? (
                          <Image
                            source={require('../../../assets/images/auth-new.png')}
                            style={styles.cardImage}
                          />
                        ) : (
                          <Image
                            source={{uri: item.logo}}
                            style={styles.cardImage}
                          />
                        )}
                      </View>
                      <Text style={styles.textContent}>
                        {item.nama_keahlian}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                marginTop: 10,
                marginBottom: 5,
                flexDirection: 'row',
              }}>
              <View style={styles.cardContent}>
                <View style={styles.backgroundImageKosong} />
                <View style={styles.textImageKosong} />
              </View>
              <View style={styles.cardContent}>
                <View style={styles.backgroundImageKosong} />
                <View style={styles.textImageKosong} />
              </View>
              <View style={styles.cardContentKosong}>
                <View style={styles.backgroundImageKosong} />
                <View style={styles.textImageKosongKanan} />
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.judulTextMenu}>
              Produk Yang Bisa Anda Pilih
            </Text>
          </View>
        </View>

        {showIndicator ? (
          <View style={{marginLeft: 10, marginRight: 15}}>
            <FlatList
              data={produkData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.produk}>
                  <TouchableOpacity>
                    <View style={styles.cardProduk}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('../../../assets/images/auth-new.png')}
                          resizeMode="cover"
                          style={{width: 100, height: 80}}
                        />
                      </View>
                      <Text
                        style={{
                          color: 'black',
                          marginHorizontal: 15,
                          fontWeight: 'bold',
                        }}>
                        {item.nama_produk}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.produkNotFound, {width: 200}]} />
            <View style={[styles.produkNotFound, {width: 100}]} />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.judulTextMenu}>Beberapa Artikel</Text>
          </View>
          <ButtonAllData onPress={() => {
            navigation.navigate(Navigasi.ALL_ARTIKEL)
          } } textButton={"Lihat Semua"} />
        </View>

        {showIndicator ? (
          <View style={{marginLeft: 10, marginRight: 15}}>
            <FlatList
              data={kategori}
              horizontal
              renderItem={({item}) => (
                <View
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                    backgroundColor:
                      item.nama_kategori == 'Semua' ? 'blue' : 'white',
                    borderColor:
                      item.nama_kategori == 'Semua' ? 'gray' : 'blue',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: item.nama_kategori == 'Semua' ? 'white' : 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.nama_kategori}
                  </Text>
                </View>
              )}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              marginHorizontal: 15,
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={[styles.buttonNotFound, {width: 120}]} />
            <TouchableOpacity style={[styles.buttonNotFound, {width: 120}]} />
            <TouchableOpacity style={[styles.buttonNotFound, {width: 70}]} />
          </View>
        )}

        {showIndicator ? (
          <FlatList
            data={artikel}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.replace(Navigasi.DETAIL_ARTIKEL, {
                    data: item,
                  });
                }}>
                <View style={styles.viewArtikel}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {item.foto == null ? (
                      <Image
                        source={require('../../../assets/images/auth-new.png')}
                        resizeMode="cover"
                        style={{width: 300, height: 200, alignSelf: 'center'}}
                      />
                    ) : (
                      <Image
                        source={{uri: item.foto}}
                        resizeMode="cover"
                        style={{
                          width: 300,
                          height: 200,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  </View>
                  <Text style={styles.judulArtikel}>{item.judul_artikel}</Text>
                  <Text
                    style={styles.deskripsi}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.deskripsi}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={{marginHorizontal: 15}}>
            <View style={styles.viewCard}>
              <View style={styles.imageNotFound} />
              <View style={styles.textNotFound} />
              <View style={styles.subTextNotFound} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    padding: 15,
    height: 50,
  },
  textHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  locationHeading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  judulTextMenu: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardFitur: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  listFitur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFitur: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
  },
  produk: {
    width: 200,
    height: 100,
    paddingTop: 10,
    marginBottom: 40,
    borderRadius: 10,
    marginLeft: 5,
  },
  cardProduk: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    borderColor: '#D8D8D8',
    borderWidth: 2,
  },
  icon: {
    fontSize: 20,
    color: 'blue',
  },
  viewArtikel: {
    backgroundColor: 'white',
    height: 300,
    width: 300,
    elevation: 5,
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  judulArtikel: {
    color: 'black',
    paddingHorizontal: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  deskripsi: {
    color: 'gray',
    paddingHorizontal: 10,
    textAlign: 'justify',
  },
  cardContent: {
    backgroundColor: 'white',
    elevation: 2,
    width: 120,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
  },
  cardContentKosong: {
    backgroundColor: 'white',
    elevation: 5,
    width: 60,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
  },
  cardImage: {
    width: 120,
    height: 100,
    backgroundColor: colors.backgroundEmpty,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignSelf: 'center',
  },
  textContent: {
    color: 'black',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  backgroundImageKosong: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundEmpty,
    height: 100,
  },
  textImageKosong: {
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 70,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  textImageKosongKanan: {
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 40,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonNotFound: {
    marginTop: 10,
    backgroundColor: colors.backgroundEmpty,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  produkNotFound: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: colors.backgroundEmpty,
    borderWidth: 1,
    borderColor: colors.backgroundEmpty,
    height: 120,
    borderRadius: 10,
  },
  viewCard: {
    marginTop: 15,
    backgroundColor: 'white',
    elevation: 5,
    height: 300,
    width: 200,
    borderRadius: 10,
  },
  imageNotFound: {
    margin: 10,
    backgroundColor: colors.backgroundEmpty,
    height: 200,
    borderRadius: 5,
  },
  textNotFound: {
    margin: 10,
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 150,
    borderRadius: 5,
  },
  subTextNotFound: {
    marginHorizontal: 10,
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 170,
    borderRadius: 5,
  },
});

export default DashboardMember;
