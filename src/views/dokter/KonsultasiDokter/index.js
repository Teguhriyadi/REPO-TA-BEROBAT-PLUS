import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { baseUrl, colors, getData } from '../../../utils';
import { configfirebase } from '../../../firebase/firebaseConfig';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';

const KonsultasiDokter = ({navigation}) => {

  const [dokterProfil, setDokterProfil] = useState({});
  const [dataPribadi, setDataPribadi] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);
  const [output, setOutput] = useState(false);

  useEffect(() => {

    getDataUserLocal();
    const rootDB = configfirebase.database().ref();
    const urlHistory = `messages/${dataPribadi.uuid_firebase}`;
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on("value", async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async key => {
          const datakonsumen = `users/konsumen/${oldData[key].uidPartner}`;
          // console.log(key);
          const detail_konsumen = await rootDB.child(datakonsumen).once("value");
          console.log(detail_konsumen);
          data.push({
            id: key,
            detail_konsumen: detail_konsumen.val()
          });
        });

        await Promise.all(promises);
        setHistoryChat(data);
      }
    });
  }, [dataPribadi.nama, dataPribadi.uuid_firebase, dataPribadi.idx, dataPribadi.token]);

  const getDataUserLocal = () => {
    getData("profil_dokter").then((response) => {
      setDokterProfil(response);
    });
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Konsultasi Pasien</Text>
      </View>
      <ScrollView>
        {historyChat == null ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          historyChat.map(item => {
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
                        {item.detail_konsumen.nama}
                      </Text>
                      <Text
                        style={{
                          color: 'gray',
                          fontSize: 12,
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {item.detail_konsumen.nomor_hp}
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
                    }} onPress={() => {
                      const params = {
                        id: item.id,
                        uidPartner: item.detail_konsumen.uid,
                        nama: item.detail_konsumen.nama,
                        nomor_hp: item.detail_konsumen.nomor_hp
                      }
                      navigation.navigate(Navigasi.DETAIL_KONSULTASI, params)
                    }} >
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      Lanjutkan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) }
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
