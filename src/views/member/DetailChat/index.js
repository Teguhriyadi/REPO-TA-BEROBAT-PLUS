import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../partials/navigasi';

const DetailChatDokter = ({navigation, route}) => {
  const getDokter = route.params;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBarComponent />
      <View
        style={{
          backgroundColor: 'white',
          height: 50,
          padding: 15,
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
            paddingHorizontal: 10,
          }}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            {getDokter.data.user_id.nama}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          elevation: 5,
          marginVertical: 20,
          marginHorizontal: 10,
          borderRadius: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingHorizontal: 20,
          }}>
          <Image
            source={require('../../../assets/images/people.png')}
            resizeMode="cover"
            style={{width: 200, height: 200}}
          />
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
            {getDokter.data.user_id.nama}
          </Text>
          <Text style={{color: 'black', fontSize: 12}}>
            {getDokter.data.kelas == 0 ? 'Dokter Umum' : 'Dokter Spesialis'}
          </Text>
          <View
            style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
            <View
              style={{
                backgroundColor: 'grey',
                padding: 5,
                borderRadius: 5,
                marginRight: 5,
              }}>
              <Text style={{color: 'black', fontSize: 12, color: 'white'}}>
                55 Tahun
              </Text>
            </View>
            <View
              style={{backgroundColor: 'grey', padding: 5, borderRadius: 5}}>
              <Text style={{color: 'black', fontSize: 12, color: 'white'}}>
                100 %
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              marginVertical: 10,
            }}
          />
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="home" style={{color: 'blue', fontSize: 20}} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                Alumni
              </Text>
              <Text style={{color: 'black', fontSize: 12}}>
                SMK Informatika Al - Irsyad Al - Islamiyyah , 2020
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="home" style={{color: 'blue', fontSize: 20}} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                Praktik di
              </Text>
              <Text style={{color: 'black', fontSize: 12}}>
                RS. Sumber Kasih, Cirebon
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="home" style={{color: 'blue', fontSize: 20}} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingHorizontal: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                Nomor STR
              </Text>
              <Text style={{color: 'black', fontSize: 12}}>
                {getDokter.data.nomor_str}
              </Text>
            </View>
          </View>
          <View
            style={{borderColor: 'gray', borderWidth: 1, marginVertical: 10}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.CHATING, {
                data: getDokter,
              });
            }}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Chat Dengan Dokter
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.LANJUTKAN_PEMBAYARAN, {
                data: getDokter,
              });

            }}
            style={{
              backgroundColor: 'blue',
              padding: 10,
              marginVertical: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Lanjutkan Pembayaran
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default DetailChatDokter;
