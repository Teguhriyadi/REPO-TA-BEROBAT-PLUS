import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../../utils';
import Icon from 'react-native-vector-icons/Ionicons';

const AlamatTersimpan = ({navigation}) => {
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" style={styles.colorIcon} />
          </TouchableOpacity>
          <Text style={styles.textHeading}>Alamat Tersimpan</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentJikaKosong}>
          <Text style={styles.textContentJikaKosong}>
            Belum Ada Alamat Tersimpan
          </Text>
          <Text style={styles.textSub}>
            Simpan Alamat Rumah atau Kantor atau yang lainnya untuk proses
            transaksi.
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Tambah Alamat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    color: colors.background,
  },
  heading: {
    backgroundColor: colors.background,
    height: 50,
    padding: 15,
    elevation: 5,
  },
  textHeading: {
    color: 'black',
    fontSize: 14,
  },
  colorIcon: {
    color: 'black',
    fontSize: 20,
    marginRight: 20,
  },
  content: {
    marginTop: 5,
    flex: 1,
    backgroundColor: colors.background,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    marginHorizontal: 10,
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginBottom: 10,
  },
  textButton: {
    fontSize: 14,
    color: colors.textHeading,
    fontWeight: 'bold',
  },
  contentJikaKosong: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 20,
  },
  textContentJikaKosong: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  textSub: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default AlamatTersimpan;
