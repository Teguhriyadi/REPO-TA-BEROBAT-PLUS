import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RingkasanPembayaranKonsultasi = ({navigation}) => {
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
        </TouchableOpacity>
        <Text style={styles.textHeading}>Ringkasan Pembayaran</Text>
      </View>
      <View style={styles.content}>
        <View style={{backgroundColor: 'white', elevation: 5, padding: 10}}>
        <Text
          style={{
            color: 'grey',
            fontSize: 16,
            fontFamily: 'Poppins-Medium',
            fontWeight: 'bold',
          }}>
          Konsultasi Untuk
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Medium',
          }}>
          Mohammad Ilham Teguhriyadi
        </Text>
        </View>
        <View style={{backgroundColor: 'white', elevation: 5, marginTop: 3, padding: 10, flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../../assets/images/people.png')} style={{width: 50, height: 50}} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{color: 'black', fontSize: 14}}>Hamdan</Text>
                <Text style={{color: 'black', fontSize: 14}}>Mohammad</Text>
            </View>
        </View>
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
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textHeading: {
    color: 'black',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
});

export default RingkasanPembayaranKonsultasi;
