import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import { getData } from '../../../../utils';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';
import { baseUrl, colors } from '../../../../utils';
import Geolocation from '@react-native-community/geolocation';
import Heading from '../../../../components/Heading';
import DropDownPicker from 'react-native-dropdown-picker';

const BuatJadwal = ({ navigation, route }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [rumah_sakit, setRumahSakit] = useState(null);
  const [spesialis, setSpesialis] = useState({});
  const [showIndicator, setShowIndicator] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Perawat', value: 'perawat'},
    {label: 'Dokter', value: 'dokter'}
  ]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataLokasi();
      dataSpesialis();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const dataSpesialis = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/master/penyakit/spesialis_penyakit`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          setSpesialis(response.data.data);
          setShowIndicator(true);
        })
        .catch(error => {
          console.log(error);
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
      <StatusBarComponent />
      <Heading navigasi={() => navigation.navigate(Navigasi.MAIN_APP)} textHeading={"Buat Janji Ketemu Langsung"} />
      <DropDownPicker 
        open={open} 
        value={value} 
        items={items} 
        setOpen={setOpen} 
        setValue={setValue}
        onSelectItem={(item) => {
          console.log(item)
        }}
        setItems={setItems} 
        placeholder='Silahkan Pilih'
        textStyle={{fontSize: 14}}
        containerStyle={{marginHorizontal: 10, width: 150, marginTop: 10}}
        labelStyle={{fontWeight: 'bold'}}
      />
      <View
        style={{
          marginHorizontal: 10,
          backgroundColor: '#f4f0f0',
          marginVertical: 10,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Icon
            name="search"
            style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}
          />
        </View>
        <View
          style={{
            flex: 8,
            paddingRight: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <TextInput
            placeholder="Cari Nama Dokter"
            placeholderTextColor="gray"
            style={{
              height: 40,
              fontSize: 12,
              color: 'gray',
            }}
          />
        </View>
      </View>
      <Text style={styles.textTitle}>Rumah Sakit Sekitar Anda</Text>

      <View>
        {rumah_sakit == null ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.backgroundCardEmpty}>
              <View style={styles.contentCardEmpty}>
                <View style={styles.backgroundImageEmpty} />
              </View>
              <View style={styles.jarakTextJudul}>
                <View style={styles.textJudulEmpty} />
              </View>
              <View style={styles.jarakTextSubJudul}>
                <View style={styles.textSubJudulEmpty} />
              </View>
              <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                <View style={styles.jarakEmpty} />
              </View>
            </View>
            <View style={styles.backgroundCardEmpty}>
              <View style={styles.contentCardEmpty}>
                <View style={styles.backgroundImageEmpty} />
              </View>
              <View style={styles.jarakTextJudul}>
                <View style={styles.textJudulEmpty} />
              </View>
              <View style={styles.jarakTextSubJudul}>
                <View style={styles.textSubJudulEmpty} />
              </View>
              <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                <View style={styles.jarakEmpty} />
              </View>
            </View>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {rumah_sakit.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id_rumah_sakit}
                  onPress={() => {
                    navigation.navigate(Navigasi.DETAIL_BUAT_JANJI, {
                      data: item,
                    });
                  }}>
                  <View style={styles.cardList}>
                    <View
                      style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {item.foto_rs == null ? (
                        <Image
                          source={require('../../../../assets/images/auth-new.png')}
                          resizeMode="cover"
                          style={{ width: 200, height: 100, margin: 10 }}
                        />
                      ) : (
                        <Image
                          source={{ uri: item.foto_rs }}
                          resizeMode="cover"
                          style={{ width: 200, height: 100, margin: 10 }}
                        />
                      )}
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                      <Text style={styles.namaCardRs}>{item.nama_rs}</Text>
                      <Text style={{ color: 'black', fontSize: 12 }}>
                        {item.kategori_rs == 1
                          ? 'Rumah Sakit Spesialis'
                          : 'Rumah Sakit Umum'}
                      </Text>
                      <View style={styles.cardChild}>
                        <Icon
                          name="ios-location"
                          style={{ color: 'black', marginRight: 3 }}
                        />
                        <Text style={styles.textCardChild}>{item.jarak} KM</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(Navigasi.All_DATA_RS);
        }}>
        <Text style={styles.textButton}>Lihat Semua</Text>
      </TouchableOpacity>

      <Text style={styles.textTitle}>Cari Spesialis</Text>
      <Text style={styles.subTextTitle}>
        Buat Jadwal Sesuai Dengan Kebutuhanmu
      </Text>

      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
        {showIndicator ? (
          <FlatList
            data={spesialis}
            numColumns={4}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id_spesialis_penyakit}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardTouchable}>
                <Image
                  source={require('../../../../assets/images/auth-new.png')}
                  resizeMode="cover"
                  style={styles.image}
                />
                <Text style={styles.textSpesialis}>{item.nama_spesialis}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardChild: {
    marginTop: 10,
    backgroundColor: colors.backgroundCardChildren,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    width: 70,
  },
  textCardChild: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    borderColor: 'purple',
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'purple',
    fontWeight: 'bold',
  },
  cardList: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    width: 200,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textTitle: {
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium'
  },
  subTextTitle: {
    color: 'gray',
    paddingHorizontal: 10,
    fontSize: 11,
  },
  backgroundCardEmpty: {
    backgroundColor: 'white',
    elevation: 5,
    width: 200,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  contentCardEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageEmpty: {
    backgroundColor: colors.backgroundEmpty,
    width: 180,
    height: 100,
    marginVertical: 10,
  },
  textJudulEmpty: {
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 100,
    borderRadius: 10,
  },
  jarakTextJudul: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  jarakTextSubJudul: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  textSubJudulEmpty: {
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 80,
    borderRadius: 10,
  },
  jarakEmpty: {
    backgroundColor: colors.backgroundEmpty,
    height: 20,
    width: 40,
    borderRadius: 10,
  },
  namaCardRs: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSpesialis: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold'
  },
  cardTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
    marginRight: 5,
  },
  cardCircle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: 'black',
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default BuatJadwal;
