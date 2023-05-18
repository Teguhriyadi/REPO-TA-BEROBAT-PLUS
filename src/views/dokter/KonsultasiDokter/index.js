import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';

const KonsultasiDokter = () => {
  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.heading}>
        <Text style={styles.textHeading}>Konsultasi Pasien</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.listCard}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <View style={styles.headerIdentitas}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                }}>
                Mohammad Ilham Teguhriyadi
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                }}>
                085324237299
              </Text>
            </View>
            <View style={[styles.status, {backgroundColor: 'green'}]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'justify',
                }}>
                SELESAI
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: 'gray',
              fontSize: 12,
              marginHorizontal: 10,
              textAlign: 'justify',
            }}>
            Hallo Ilham Mohammad Apa Kabar Mohammad Hamdan Hamdan
          </Text>
          <TouchableOpacity
            style={{
              borderColor: 'green',
              borderWidth: 1,
              marginVertical: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>LANJUTKAN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.listCard}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <View style={styles.headerIdentitas}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                }}>
                Mohammad Ilham Teguhriyadi
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                }}>
                085324237299
              </Text>
            </View>
            <View style={[styles.status, {backgroundColor: 'green'}]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'justify',
                }}>
                SELESAI
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: 'gray',
              fontSize: 12,
              marginHorizontal: 10,
              textAlign: 'justify',
            }}>
            Hallo Ilham Mohammad Apa Kabar Mohammad Hamdan Hamdan
          </Text>
          <TouchableOpacity
            style={{
              borderColor: 'green',
              borderWidth: 1,
              marginVertical: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>LANJUTKAN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.listCard}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <View style={styles.headerIdentitas}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                }}>
                Mohammad Ilham Teguhriyadi
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                }}>
                085324237299
              </Text>
            </View>
            <View style={[styles.status, {backgroundColor: 'orange'}]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'justify',
                }}>
                BERLANGSUNG
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: 'gray',
              fontSize: 12,
              marginHorizontal: 10,
              textAlign: 'justify',
            }}>
            Hallo Ilham Mohammad Apa Kabar Mohammad Hamdan Hamdan
          </Text>
          <TouchableOpacity
            style={{
              borderColor: 'green',
              borderWidth: 1,
              marginVertical: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>LANJUTKAN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.listCard}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <View style={styles.headerIdentitas}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                }}>
                Mohammad Ilham Teguhriyadi
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 12,
                  fontFamily: 'Poppins-Medium',
                }}>
                085324237299
              </Text>
            </View>
            <View style={[styles.status, {backgroundColor: 'green'}]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'justify',
                }}>
                SELESAI
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: 'gray',
              fontSize: 12,
              marginHorizontal: 10,
              textAlign: 'justify',
            }}>
            Hallo Ilham Mohammad Apa Kabar Mohammad Hamdan Hamdan
          </Text>
          <TouchableOpacity
            style={{
              borderColor: 'green',
              borderWidth: 1,
              marginVertical: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', fontWeight: 'bold'}}>LANJUTKAN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.backgroundDasarBelakang,
  },
  heading: {
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    elevation: 5,
  },
  textHeading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  listCard: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  headerIdentitas: {
    flex: 3,
  },
  status: {
    flex: 1,
    alignItems: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'green',
  },
});

export default KonsultasiDokter;
