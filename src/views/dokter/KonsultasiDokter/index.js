import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {baseUrl, colors, getData} from '../../../utils';
import Firebase from '../../../firebase/firebaseConfig';
import axios from 'axios';

const KonsultasiDokter = () => {

  const [dokterProfil, setDokterProfil] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [profil, setProfil] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [output, setOutput] = useState(false);

  useEffect(() => {
    getDataUserLocal();
    const rootDB = Firebase.database().ref();
    const urlHistory = `messages/${dokterProfil.id_dokter}`;
    const messagesDB = rootDB.child(urlHistory);

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
  }, [dataPribadi.nama, dataPribadi.idx, dataPribadi.token]);

  const getDataUserLocal = () => {
    getData("profil_dokter").then((response) => {
      setDokterProfil(response);
    });
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const profil_dokter = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/akun/profil/dokter/profil`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      });

      if (response.data.data) {
        setProfil(response.data.data);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Konsultasi Pasien</Text>
      </View>
      <ScrollView>
      {historyChat.map(item => {
        return (
          <View key={item.id} style={styles.content}>
            <View style={styles.listCard}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}>
                <View style={styles.headerIdentitas}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: 'bold',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Mohammad Ilham Teguhriyadi
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    085324237299
                  </Text>
                </View>
                <View style={[styles.status, {backgroundColor: 'green'}]}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 'bold',
                      fontFamily: 'Poppins-Medium',
                      textAlign: 'justify',
                    }}>
                    SELESAI
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  marginHorizontal: 10,
                  textAlign: 'justify',
                }}>
                  {item.lastContentChat}
              </Text>
              <TouchableOpacity
                style={{
                  borderColor: 'green',
                  borderWidth: 1,
                  marginVertical: 15,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'green', fontWeight: 'bold'}}>
                  LANJUTKAN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  heading: {
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
  },
  textHeading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  listCard: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  headerIdentitas: {
    flex: 3,
  },
  status: {
    flex: 1,
    alignItems: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'green',
  },
});

export default KonsultasiDokter;
