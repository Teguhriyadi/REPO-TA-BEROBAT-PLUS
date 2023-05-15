import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors, baseUrl, getData} from '../../../../../../utils';
import axios from 'axios';
import {Base64} from 'js-base64';
import Navigasi from '../../../../../../partials/navigasi';

const Cash = ({navigation, route}) => {
  const [dataPribadi, setDataPribadi] = useState({});

  const username =
    'xnd_development_QOi9zsTa9TMIItjscrZtfTyJxATb0JUqUg92TqrRGrgvOzXAAsCafr01YbY';
  const password = '';

  const credentials = `${username}:${password}`;
  const encode = Base64.encode(credentials);

  useEffect(() => {
    getDataUserLocal();
  }, [dataPribadi.nama, dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      setDataPribadi(res);
    });
  };

  const cash = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.simulate_payment}`,
        headers: {
          Authorization: `Basic ${encode}`,
        },
        method: 'POST',
        data: {
          transfer_amount: route.params.data.expected_amount,
          bank_account_number: route.params.data.account_number,
          bank_code: route.params.data.bank_code,
        },
      });

      const callback = await axios({
        url: `${baseUrl.url}/xendit/va/callback`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: 'POST',
        data: {
          external_id: route.params.data.external_id,
          status: "ACTIVE"
        }
      });

      navigation.navigate(Navigasi.MAIN_APP);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundDasarBelakang}}>
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          backgroundColor: 'blue',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        onPress={() => {
          cash();
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Bayar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cash;
