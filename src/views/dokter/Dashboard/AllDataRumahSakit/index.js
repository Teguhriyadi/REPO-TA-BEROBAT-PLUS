import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import axios from 'axios';
import {baseUrl, getData} from '../../../../utils';

const AllDataRumahSakit = () => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [role, setRole] = useState({});

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataRole();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, []);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const dataRole = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/role`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      });

      if (response.data.data) {
        console.log(response.data.data);
        setRole(response.data.data);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'blue'}}></View>
      <View style={{flex: 1, marginHorizontal: 10}}>
        <FlatList
          data={role}
          renderItem={({item}) => (
           <View style={{backgroundColor: 'red', marginVertical: 10, height: 100}}>
            <Text style={{color: 'black'}}>Hamdan</Text>
           </View> 
          )}
        />
      </View>
    </View>
  );
};

export default AllDataRumahSakit;
