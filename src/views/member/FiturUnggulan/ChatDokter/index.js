import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {colors, getData} from '../../../../utils';
import Navigasi from '../../../../partials/navigasi';
import {baseUrl} from '../../../../utils';

const ChatDokter = ({navigation, route}) => {
  const [user, setUser] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [listDataDokter, setListDataDokter] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [spesialis, setSpesialis] = useState([]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      listDokter();
      getDataSpesialis();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [user.nama, dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const listDokter = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/akun/dokter`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          setListDataDokter(response.data.data);
          setShowIndicator(true);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataSpesialis = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/penyakit/spesialis_penyakit`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      });
      setSpesialis(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.MAIN_APP);
            }}>
            <Icon
              name="ios-arrow-back-outline"
              style={{fontSize: 20, color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Text style={{color: 'black'}}>Chat Dengan Ahlinya</Text>
        </View>
      </View>
      <View style={styles.cardSearch}>
        <View style={styles.viewIcon}>
          <Icon
            name="search"
            style={{color: 'gray', fontSize: 20, fontWeight: 'bold'}}
          />
        </View>
        <View style={styles.contentSearch}>
          <TextInput
            placeholder="Ex: Dr. Hamdan"
            placeholderTextColor="gray"
            style={{
              height: 40,
              fontSize: 12,
              color: 'gray',
            }}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.textLeftHeading}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            Rekomendasi Dokter
          </Text>
          <Text style={{color: 'black', fontSize: 10}}>
            Silahkan konsultasikan dengan dokter
          </Text>
        </View>
        <View style={styles.buttonAll}>
          <TouchableOpacity style={styles.designButton}>
            <Text style={{color: 'purple', fontSize: 10, fontWeight: 'bold'}}>
              Lihat Semua
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {showIndicator ? (
          <FlatList
            data={listDataDokter}
            renderItem={({item}) => {
              return (
                <View style={styles.cardList}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Image
                      source={require('../../../../assets/images/people.png')}
                      resizeMode="cover"
                      style={{width: 100, height: 100, margin: 10}}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item.user_id.nama}
                    </Text>
                    <Text style={{color: 'black', fontSize: 10}}>
                      {item.user_id.status == 1 ? 'Dokter Ahli' : 'Dokter Umum'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'gray',
                          borderRadius: 5,
                          marginRight: 10,
                          paddingHorizontal: 5,
                        }}>
                        <Text
                          style={{color: 'white', fontSize: 10, padding: 3}}>
                          77 Tahun
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: 'gray',
                          borderRadius: 5,
                          paddingHorizontal: 5,
                        }}>
                        <Text
                          style={{color: 'white', fontSize: 10, padding: 3}}>
                          100 %
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: 200,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}>
                        <Text style={{color: 'black', fontSize: 16}}>
                          Rp. {item.biaya.biaya}
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
                            navigation.replace(Navigasi.DETAIL_CHAT, {
                              data: item,
                            });
                          }}
                          style={{
                            backgroundColor: 'purple',
                            borderRadius: 5,
                            paddingVertical: 3,
                            width: 70,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              fontSize: 12,
                            }}>
                            Chat
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View>
            <View style={styles.cardListKosong}>
              <View style={styles.imageCardKosong} />
              <View style={styles.contentFlexKosong}>
                <View style={styles.textKosong} />
                <View style={styles.subTextKosong} />
                <View style={styles.flexRatingKosong}>
                  <View style={styles.ratingKosong} />
                  <View style={styles.ratingKosong} />
                </View>
                <View style={styles.flexHargaButton}>
                  <View style={styles.hargaKosong} />
                  <View style={styles.buttonKosong} />
                </View>
              </View>
            </View>
            <View style={styles.cardListKosong}>
              <View style={styles.imageCardKosong} />
              <View style={styles.contentFlexKosong}>
                <View style={styles.textKosong} />
                <View style={styles.subTextKosong} />
                <View style={styles.flexRatingKosong}>
                  <View style={styles.ratingKosong} />
                  <View style={styles.ratingKosong} />
                </View>
                <View style={styles.flexHargaButton}>
                  <View style={styles.hargaKosong} />
                  <View style={styles.buttonKosong} />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.garisBorder} />
      <Text style={styles.textTitle}>Cari Dokter Atau Spesialisasi</Text>
      <Text style={styles.subTextTitle}>Cari Kategori Yang Anda Inginkan</Text>

      <View style={{marginHorizontal: 10}}>
        {showIndicator ? (
          <View>
            <FlatList
              data={spesialis}
              numColumns={4}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={{
                    marginRight: 10,
                    flex: 1,
                    marginBottom: 5,
                  }}>
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        borderColor: 'black',
                        marginTop: 5,
                        borderWidth: 1,
                        marginBottom: 5,
                      }}>
                      <Image
                        source={require('../../../../assets/images/auth-new.png')}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 10,
                        textAlign: 'center',
                      }}>
                      Hamdan
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={{marginVertical: 10}}>
            <ActivityIndicator size={'large'} style={{color: colors.primary}} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    backgroundColor: 'white',
    padding: 15,
    height: 50,
    elevation: 5,
    flexDirection: 'row',
  },
  cardSearch: {
    marginHorizontal: 10,
    backgroundColor: '#f4f0f0',
    marginVertical: 10,
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
  textLeftHeading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  buttonAll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  designButton: {
    borderColor: 'purple',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cardList: {
    backgroundColor: 'white',
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
  },
  cardListKosong: {
    backgroundColor: 'white',
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
  },
  textTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subTextTitle: {
    color: 'black',
    marginLeft: 10,
    fontSize: 12,
  },
  garisBorder: {
    backgroundColor: 'gray',
    height: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageCardKosong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: colors.backgroundEmpty,
    borderRadius: 10,
  },
  textKosong: {
    backgroundColor: colors.backgroundEmpty,
    width: 70,
    height: 15,
    borderRadius: 10,
  },
  subTextKosong: {
    backgroundColor: colors.backgroundEmpty,
    width: 50,
    height: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  ratingKosong: {
    backgroundColor: colors.backgroundEmpty,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 5,
    width: 40,
    padding: 10,
  },
  hargaKosong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundEmpty,
    height: 25,
    marginRight: 10,
    borderRadius: 10,
  },
  buttonKosong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.backgroundEmpty,
    height: 25,
    borderRadius: 10,
  },
  contentFlexKosong: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  flexRatingKosong: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  flexHargaButton: {
    flexDirection: 'row',
    width: 200,
    marginTop: 10,
  },
});

export default ChatDokter;
