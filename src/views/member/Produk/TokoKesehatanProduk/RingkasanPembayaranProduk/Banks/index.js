import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {colors, getData, baseUrl} from '../../../../../../utils';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Navigasi from '../../../../../../partials/navigasi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Banks = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [bank, setBanks] = useState([]);
  const [showIndicator, setShowIndicator] = useState(false);
  const [output, setOutput] = useState(false);
  const [pilihBank, setPilihBank] = useState(null);

  useEffect(() => {
    getDataUserLocal();
    banks();
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const banks = async () => {
    try {
      setShowIndicator(true);
      const response = await axios({
        url: `${baseUrl.url}/xendit/va/list`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      });

      if (response.data.data.length === 0) {
        setTimeout(() => {
          setOutput(true);
          setShowIndicator(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setShowIndicator(false);
          console.log(response.data.data);
          setBanks(response.data.data);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const klikBank = async (code) => {
    await AsyncStorage.setItem("setBank", code);
    console.log(code);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white'}}>
        <FlatList
          data={bank}
          showVerticalScrollIndicator={false}
          keyExtractor={item => item.code}
          renderItem={({item}) => (
            <>
              <View
                style={{
                  flex: 1,
                  marginTop: 5,
                  marginHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black'}}>{item.name}</Text>
                <View style={{alignItems: 'flex-end', flex: 1}}>
                  <TouchableOpacity onPress={() => {
                    klikBank(item.code);
                  }}>
                    <Text style={{color: 'blue'}}>Pilih</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}
              />
            </>
          )}
        />
      </View>
    </View>
  );
};

export default Banks;
