import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Navigasi from '../../../../partials/navigasi';

const Detail = ({navigation, route}) => {
  const getArtikel = route.params;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBarComponent />
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          height: 50,
          elevation: 5,
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.MAIN_APP);
            }}>
            <Icon
              name="ios-arrow-back"
              style={{fontSize: 20, color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 10,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {getArtikel.data.judul_artikel}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
            {getArtikel.data.judul_artikel}
          </Text>
          <Text style={{color: 'black', paddingTop: 10}}>#Mohammad</Text>
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <Text style={{color: 'purple'}}>
              {getArtikel.data.get_user.nama} :
            </Text>
            <Text style={{color: 'gray'}}> 22 Maret 2023</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            {getArtikel.data.foto == null ? (
              <Image
                source={require('../../../../assets/images/auth-new.png')}
                resizeMode="cover"
                style={{width: 300, height: 200}}
              />
            ) : (
              <Image
                source={{uri: getArtikel.data.foto}}
                resizeMode="cover"
                style={{width: 300, height: 200}}
              />
            )}
          </View>
          <View style={{paddingTop: 10}}>
            <Text
              style={{color: 'black', textAlign: 'justify', lineHeight: 20}}>
              {getArtikel.data.deskripsi}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;
