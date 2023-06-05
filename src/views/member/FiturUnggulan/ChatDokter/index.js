import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { colors, getData } from '../../../../utils';
import Navigasi from '../../../../partials/navigasi';
import { baseUrl } from '../../../../utils';
import Heading from '../../../../components/Heading';

const ChatDokter = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [listDataDokter, setListDataDokter] = useState(null);
  const [listDataPerawat, setListDataPerawat] = useState(null);
  const [cekoption, setOption] = useState(0);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      listDokter();
      if (cekoption == 0) {

      } else {
        dataperawat();
      }
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
    setOption(0);
    try {
      const response = await axios({
        url: `${baseUrl.url}/akun/dokter/data`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });
      setListDataDokter(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dataperawat = async () => {
    setOption(1);
    try {
      const response = await axios({
        url: `${baseUrl.url}/akun/perawat/data`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setListDataPerawat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBarComponent />
      <Heading navigasi={() => navigation.navigate(Navigasi.MAIN_APP)} textHeading={"Chat Dengan Ahlinya"} />

      <View style={styles.cardSearch}>
        <View style={styles.viewIcon}>
          <Icon
            name="search"
            style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}
          />
        </View>
        <View style={styles.contentSearch}>
          <TextInput
            placeholder="Ex: Dr. Mohammad"
            placeholderTextColor="gray"
            style={{
              height: 40,
              fontSize: 12,
              color: 'gray',
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
        <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium', marginBottom: 5 }}>
          Butuh Dengan :
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.option, cekoption == 1 ? styles.non_active : styles.active ]} onPress={() => {
            listDokter();
          }}>
            <Text style={cekoption == 1 ? styles.text_non_active : styles.text_active }>
              Dokter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, cekoption == 1 ? styles.active : styles.non_active, { marginLeft: 10 }]} onPress={() => {
            dataperawat();
          }}>
            <Text style={cekoption == 1 ? styles.text_active : styles.text_non_active }>
              Perawat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.textLeftHeading}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
            Rekomendasi Ahli
          </Text>
          <Text style={{ color: 'black', fontSize: 10 }}>
            Silahkan konsultasikan dengan ahlinya
          </Text>
        </View>
      </View>
      {cekoption == 0 ? (
        listDataDokter == null ? (
          <ActivityIndicator size={"large"} fontSize="20" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {listDataDokter.map((item) => {
              return (
                <View style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: 'white', elevation: 5, padding: 10, borderRadius: 5, flexDirection: 'row' }} key={item.id_dokter}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={require("../../../../assets/images/people.png")} style={{ width: 100, height: 100 }} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                      {item.user_id.nama}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                      {item.user_id.status == 1 ? 'Dokter Spesialis' : 'Dokter Umum'}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                      <View style={{ width: 70, backgroundColor: colors.backgroundEmpty, borderRadius: 5, padding: 3, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                          77 Tahun
                        </Text>
                      </View>
                      <View style={{ width: 70, backgroundColor: colors.backgroundEmpty, borderRadius: 5, marginLeft: 5, padding: 3, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                          <Icon name="thumbs-up" style={{ color: 'white', fontWeight: 'bold' }} /> 100 %
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
                      <TouchableOpacity style={{ backgroundColor: 'purple', width: 100, borderRadius: 5, paddingVertical: 5, alignItems: 'center' }} onPress={() => navigation.navigate(Navigasi.DETAIL_CHAT, {
                        data: item
                      })}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                          KONSULTASI
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        )
      ) : (
        cekoption == 1 ? (
          listDataPerawat == null ? (
            <ActivityIndicator size={"large"} color={"black"} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
            {listDataPerawat && listDataPerawat.map((item) => {
              return (
                <View style={{ marginHorizontal: 10, marginVertical: 10, backgroundColor: 'white', elevation: 5, padding: 10, borderRadius: 5, flexDirection: 'row' }} key={item.id_dokter}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={require("../../../../assets/images/people.png")} style={{ width: 100, height: 100 }} />
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                      {item.get_user.nama}
                    </Text>
                    <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                      Perawat
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                      <View style={{ width: 70, backgroundColor: colors.backgroundEmpty, borderRadius: 5, padding: 3, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                          77 Tahun
                        </Text>
                      </View>
                      <View style={{ width: 70, backgroundColor: colors.backgroundEmpty, borderRadius: 5, marginLeft: 5, padding: 3, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'Poppins-Medium' }}>
                          <Icon name="thumbs-up" style={{ color: 'white', fontWeight: 'bold' }} /> 100 %
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
                      <TouchableOpacity style={{ backgroundColor: 'purple', width: 100, borderRadius: 5, paddingVertical: 5, alignItems: 'center' }} onPress={() => navigation.navigate(Navigasi.DETAIL_CHAT, {
                        data: item
                      })}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                          KONSULTASI
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
          )
          
        ) : (
          <ActivityIndicator size={"large"} color={"black"} />
        )
      )}

    </View>
  );
};

const styles = StyleSheet.create({
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
  textLeftHeading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
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
  textTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
  subTextTitle: {
    color: 'black',
    marginLeft: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  option: {
    flex: 1,
    borderRadius: 50,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  flexHargaButton: {
    flexDirection: 'row',
    width: 200,
    marginTop: 10,
  },
  active: {
    backgroundColor: 'blue'
  },
  non_active: {
    borderColor: 'blue', 
    borderWidth: 1, 
    backgroundColor: 'white'
  },
  text_active: {
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold'
  },
  text_non_active: {
    color: 'blue', 
    fontSize: 14, 
    fontWeight: 'bold'
  }
});

export default ChatDokter;
