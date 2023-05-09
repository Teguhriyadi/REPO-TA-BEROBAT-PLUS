import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBarComponents from '../../../components/StatusBar/StatusBarComponent';
import Navigasi from '../../../partials/navigasi';
import {getData, baseUrl} from '../../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      getData('dataUser')
        .then(response => {
          console.log(response);
          if (response == undefined) {
            navigation.navigate(Navigasi.OPTIONS_AUTENTIKASI);
          } else if (response != undefined) {
            if (response.role == 'RO-2003062') {
              navigation.replace(Navigasi.MAIN_DOKTER);
            } else if (response.role == 'RO-2003064') {
              navigation.replace(Navigasi.MAIN_APP);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 3000);
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBarComponents />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['blue', 'skyblue']}
        style={{height: 900, width: 360}}>
        <View style={styles.viewHead}>
          <View style={{elevation: 100}}>
            <Image
              source={require('../../../assets/images/group-satu-new.png')}
              resizeMode="cover"
              style={{
                width: 150,
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
          <Text style={styles.textHead}>Solusi Kesehatan Anda</Text>
          <Text style={styles.textSubHead}>
            " Melayani dalam bidang reservasi dan konsultasi "
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  viewHead: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHead: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textSubHead: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontStyle: 'italic',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFooter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default Splash;
