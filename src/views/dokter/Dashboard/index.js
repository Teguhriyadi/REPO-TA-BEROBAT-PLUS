import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import {getData} from '../../../utils';
import {colors} from '../../../utils/colors';

const Dashboard = () => {
  const [dataPribadi, setDataPribadi] = useState({});

  useEffect(() => {
    getDataUserLocal();
  }, []);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <View
            style={{
              borderRadius: 50,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Image
              source={require('../../../assets/images/people.png')}
              resizeMode="cover"
              style={{width: 50, height: 50, margin: 10}}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
              {dataPribadi.nama}
            </Text>
            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>
              {dataPribadi.nomor_hp}
            </Text>
          </View>
        </View>
        <View style={styles.cardList}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18}}>Total Pasien</Text>
            <Text style={{color: 'black'}}>100</Text>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: 18}}>Jumlah Per Hari</Text>
            <Text style={{color: 'black'}}>100</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: 'blue',
    height: 150,
    paddingTop: 20,
  },
  headerProfile: {
    paddingHorizontal: 10,
    flexDirection: 'row',
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
});

export default Dashboard;
