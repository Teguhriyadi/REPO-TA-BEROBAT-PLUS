import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import Navigasi from '../../../partials/navigasi';
import { colors } from "../../../utils/colors"

const OptionsAutentikasi = ({ navigation }) => {
  return (
    <View>
      <ImageBackground resizeMode='cover' source={require("../../../assets/images/background.png")} style={styles.backgroundimage} />
      <View style={styles.content}>
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
            width: '80%',
          }}>
          <Text
            style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
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
            width: '80%'
          }}>
          <Text
            style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
            Login Sebagai Tamu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundimage: {
    width: '100%',
    height: '100%',
    opacity: 0.5
  },

  content: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50
  }
});

export default OptionsAutentikasi;
