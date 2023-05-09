import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const RingkasanPembayaran = ({navigation}) => {
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.textHeading}>Ringkasan Pembayaran</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.profil}>
          <View style={styles.contentProfil}>
            <View style={styles.imageProfil}>
              <Image
                source={require('../../../../../assets/images/people.png')}
                style={{width: 50, height: 50}}
              />
            </View>
            <View style={styles.textProfil}>
              <Text style={styles.profilDokter}>
                Mohammad Ilham Teguhriyadi
              </Text>
              <Text style={styles.subProfilDokter}>Dokter Umum</Text>
            </View>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.contentDetail}>
            <View style={styles.viewBiaya}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Biaya Sesi</Text>
              </View>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'right',
                }}>
                Rp. 25.000
              </Text>
            </View>
            <View style={styles.viewPembayaran}>
              <View style={{flex: 1}}>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                  Pembayaranmu
                </Text>
              </View>
              <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                Rp. 20.000
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.designViewButton}>
        <View style={styles.textViewButton}>
          <Text style={{color: 'black', fontSize: 12}}>Pembayaranmu</Text>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
            Rp. 20.000
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
              Bayar
            </Text>
          </TouchableOpacity>
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
  heading: {
    elevation: 5,
    height: 50,
    padding: 15,
    backgroundColor: colors.background,
  },
  icon: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
  },
  textHeading: {
    color: 'black',
    fontSize: 14,
  },
  content: {
    marginTop: 5,
    height: 100,
    flex: 1,
  },
  imageProfil: {
    justifyContent: 'center',
    marginRight: 10,
  },
  profil: {
    elevation: 5,
    backgroundColor: colors.background,
  },
  contentProfil: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  profilDokter: {
    color: 'black',
    fontSize: 16,
  },
  subProfilDokter: {
    color: 'gray',
    fontSize: 12,
  },
  detail: {
    marginTop: 5,
    backgroundColor: colors.background,
    elevation: 5,
  },
  contentDetail: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  viewBiaya: {
    flexDirection: 'row',
  },
  viewPembayaran: {
    flexDirection: 'row',
  },
  designViewButton: {
    backgroundColor: 'white',
    elevation: 5,
    height: 100,
  },
  textViewButton: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
});

export default RingkasanPembayaran;
