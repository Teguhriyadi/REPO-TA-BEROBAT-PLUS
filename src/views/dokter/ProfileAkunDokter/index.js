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
        <View style={{backgroundColor: 'white', elevation: 5,borderRadius: 5}}>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 15, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Icon name='create-outline' style={{fontSize: 25, color: 'black'}} />
            <Text style={{color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 14, marginLeft: 5 }}>Ubah Password</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Icon name='arrow-forward' style={{fontSize: 20, color: 'black'}} />
            </View>
          </View>
        </View>
        <Text style={{color: 'black', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 14, textAlign: 'center', marginTop: 10}}>Versi Aplikasi 1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: 'white',
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
});

export default ProfileAkunDokter;
