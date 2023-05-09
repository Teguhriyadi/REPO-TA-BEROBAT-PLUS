import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Navigasi from '../../../partials/navigasi';

const OptionsAutentikasi = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBarComponent />
      <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/auth.png')}
          style={{width: 300, height: 300}}
        />
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25}}>
          Selamat Datang
        </Text>
        <Text style={{color: 'black', fontSize: 14}}>
          Silahkan pilih menu untuk ke tahap selanjutnya
        </Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.LOGIN);
          }}
          style={{
            borderColor: 'green',
            borderWidth: 1,
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>
            Masuk
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.MAIN_APP);
          }}
          style={{
            backgroundColor: 'green',
            marginHorizontal: 20,
            marginTop: 10,
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
            Login Sebagai Tamu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OptionsAutentikasi;
