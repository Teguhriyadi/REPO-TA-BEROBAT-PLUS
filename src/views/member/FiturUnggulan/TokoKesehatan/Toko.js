import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Toko = () => {
  const navigasiHalaman = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBarComponent />
      <View
        style={{
          padding: 15,
          height: 50,
          elevation: 5,
          backgroundColor: 'white',
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigasiHalaman.goBack();
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
            paddingLeft: 10,
          }}>
          <Text style={{color: 'black'}}>Toko Kesehatan</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <View
          style={{
            backgroundColor: 'gray',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Icon name="search" style={{fontSize: 20, color: 'black'}} />
          </View>
          <View
            style={{
              marginRight: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Contoh Lifeboy"
              placeholderTextColor="black"
              style={{color: 'black', fontSize: 12, paddingRight: 30}}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            elevation: 5,
            height: 250,
            marginTop: 15,
            width: 200,
            marginBottom: 10,
            borderRadius: 10,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../../assets/images/auth-new.png')}
              resizeMode="cover"
              style={{width: 200, height: 100, margin: 10}}
            />
          </View>
          <View style={{padding: 10}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
              Paramex Nyeri Otot
            </Text>
            <Text style={{color: 'black', fontSize: 10}}>Per 3 Strip</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                paddingTop: 10,
              }}>
              Rp. 50.000
            </Text>
            <TouchableOpacity
              style={{
                borderColor: 'purple',
                borderWidth: 1,
                marginTop: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'purple',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Tambah
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: 'black',
            paddingVertical: 10,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Unggah Resep Anda
        </Text>
        <TouchableOpacity>
          <View
            style={{backgroundColor: 'white', elevation: 5, borderRadius: 5}}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'black',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                  borderRadius: 50,
                }}>
                <Icon name="home" style={{fontSize: 20, color: 'black'}} />
              </View>
              <View style={{flex: 5, paddingHorizontal: 10}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Punya Resep Obat ?
                </Text>
                <Text style={{color: 'black', fontSize: 12}}>
                  Masukkan resep, dan obat langsung diantar
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Icon
                  name="arrow-back"
                  style={{color: 'black', fontSize: 20}}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Toko;
