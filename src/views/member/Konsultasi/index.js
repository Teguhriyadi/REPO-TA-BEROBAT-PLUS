import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Firebase from '../../../firebase/firebaseConfig';
import {colors, getData, baseUrl} from '../../../utils';
import Navigasi from '../../../partials/navigasi';

const Konsultasi = ({navigation}) => {
  const [user, setUser] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);
  const [output, setOutput] = useState(false);

  useEffect(() => {
    getDataUserLocal();

    const rootDB = Firebase.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);

    setShowIndicator(true);
    messagesDB.on('value', snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            ...oldData[key],
          });
        });

        setTimeout(() => {
          setShowIndicator(false);
          setHistoryChat(data);
        }, 1000);
      } else {
        setTimeout(() => {
          setOutput(true);
          setShowIndicator(false);
        }, 1000);
      }
    });
  }, [user.uid, dataPribadi.idx, dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const toChating = chat => {
    navigation.navigate(Navigasi.CHATING, {
      data: chat,
    });
  };
  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Konsultasi</Text>
      </View>
      <View style={{marginTop: 3, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <View style={{flex: 2}}>
            <Text style={{color: 'black', fontSize: 16}}>
              Mohammad Ilham Teguhriyadi
            </Text>
          </View>
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{color: 'purple', fontWeight: 'bold'}}>Ganti</Text>
          </TouchableOpacity>
        </View>
      </View>

      {historyChat.length ? (
        <ScrollView style={{marginTop: 15, marginBottom: 5}}>
          {historyChat.map(chat => {
            return (
              <View
                key={chat.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}>
                <View
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 10,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 16,
                      flex: 1,
                    }}>
                    TANGGAL :
                  </Text>
                  <Text style={{color: 'black', fontSize: 16}}>
                    08 September 2023
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: colors.backgroundEmpty,
                    borderWidth: 1,
                    marginHorizontal: 10,
                  }}
                />
                <View style={{marginVertical: 10, marginHorizontal: 10}}>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        color: 'green',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      SELESAI
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 10}}>
                    <Image
                      source={require('../../../assets/images/people.png')}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: 'bold',
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {chat.namePartner}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        Dokter Umum
                      </Text>
                    </View>
                  </View>
                  <View style={{borderColor: 'gray', borderWidth: 1}} />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                      fontWeight: 'bold',
                      fontFamily: 'Poppins-Medium',
                      marginTop: 5,
                      textAlign: 'justify',
                    }}>
                    {chat.lastContentChat}
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 20,
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderColor: 'purple',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: 'purple',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        fontSize: 10,
                      }}>
                      Chat Ulang
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : showIndicator ? (
        <View style={{marginVertical: 10}}>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : output ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../../assets/images/konsultasi-not-found.png')}
            resizeMode="cover"
          />
          <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
            Maaf, Konsultasi Tidak Ditemukan
          </Text>
          <Text style={{color: 'black', fontSize: 14}}>
            Anda sepertinya belum melakukan konsultasi
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.CHAT_DOKTER);
            }}
            style={{
              backgroundColor: 'purple',
              width: 300,
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Konsultasi Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  heading: {
    height: 50,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 5,
    padding: 10,
  },
  textHeading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});

export default Konsultasi;
