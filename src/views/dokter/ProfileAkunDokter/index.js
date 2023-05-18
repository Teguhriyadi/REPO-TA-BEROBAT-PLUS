import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, getData} from '../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../partials/navigasi';

const ProfileAkunDokter = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});

  useEffect(() => {
    getDataUserLocal();
  }, [dataPribadi.nama, dataPribadi.nomor_hp]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <View style={{marginRight: 10}}>
          <Icon name="people" style={{fontSize: 20, color: 'white'}} />
        </View>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {dataPribadi.nama}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.cardProfile}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/images/people.png')}
              style={{
                width: 100,
                height: 100,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 50,
                position: 'relative',
              }}
            />
            <TouchableOpacity
              style={{position: 'absolute', paddingLeft: 90, paddingTop: 30}} onPress={()=> {
                navigation.navigate(Navigasi.EDIT_PROFILE_DOKTER)
              }}>
              <Icon
                name="create"
                style={{fontSize: 30, color: 'green', fontWeight: 'bold'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                }}>
                {dataPribadi.nama}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  color: 'gray',
                  fontFamily: 'Poppins-Medium',
                }}>
                {dataPribadi.nomor_hp}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.listCard}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Text style={styles.textCard}>Ubah Password</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Icon name="arrow-forward" style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonLogout}>
            <Text style={styles.textButton}>Keluar</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Versi Aplikasi 1.0
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  heading: {
    backgroundColor: 'blue',
    padding: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  listCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  textCard: {
    color: 'black',
    fontSize: 14,
  },
  icon: {
    fontSize: 20,
    color: 'black',
  },
  cardProfile: {
    backgroundColor: colors.backgroundPutih,
    elevation: 5,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  imageProfile: {
    borderColor: 'black',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  buttonProfile: {
    backgroundColor: 'blue',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonLogout: {
    backgroundColor: 'green',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default ProfileAkunDokter;
