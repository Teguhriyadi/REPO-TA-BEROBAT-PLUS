import React, {useState, useEffect, lazy, Suspense} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors, baseUrl, getData} from '../../../utils';
import axios from 'axios';

const Transaksi = () => {
  // const [countdown, setCountdown] = useState(1800);
  // const [finished, setFinished] = useState(false);
  const [dataRole, setData] = useState(null);
  const [dataPribadi, setDataPribadi] = useState({});
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    getUserLocal();
    const debounceTimeout = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounceTimeout);
    // let interval;
    // if (countdown > 0) {
    //   interval = setInterval(() => {
    //     setCountdown(prevCountdown => prevCountdown - 1);
    //   }, 1000);
    // } else {
    //   setFinished(true);
    // }

    // return () => clearInterval(interval);
  }, [dataPribadi.token]);

  const getUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const fetchData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios({
          url: `${baseUrl.url}/master/role`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token,
          },
          method: 'GET',
        })
          .then(response => {
            setShowIndicator(false);
            setData(response.data.data);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };
  // const formatTime = timeInSeconds => {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes < 10 ? '0' : ''}${minutes}:${
  //     seconds < 10 ? '0' : ''
  //   }${seconds}`;
  // };

  // return (
  //   <View style={{flex: 1, backgroundColor: 'white'}}></View>
  // <View style={{flex: 1, backgroundColor: 'blue'}}>
  //   {productList.map(product => (
  //     <TouchableOpacity onPress={() => incrementProductCount(product.id)}>
  //       <Text>{product.name}</Text>
  //       <Text>{product.count}</Text>
  //     </TouchableOpacity>
  //   ))}
  // </View>
  // <View style={{flex: 1, backgroundColor: 'white'}}>
  /* {finished ? (
        <Text style={{color: 'black'}}>Countdown selesai</Text>
      ) : (
        <Text style={{color: 'black'}}>{formatTime(countdown)}</Text>
      )} */
  //   <View>
  //     <Text style={{color: 'black'}}>Hamdan</Text>
  //   </View> */
  //   <FlatList
  //     data={dataRole}
  //     horizontal
  //     showsHorizontalScrollIndicator={false}
  //     renderItem={({item}) => (
  //       <View style={styles.cardProduk}>
  //         <TouchableOpacity>
  //           <View
  //             style={{justifyContent: 'center', alignItems: 'center'}}></View>
  //         </TouchableOpacity>
  //         <Text style={styles.namaProduk}>Hamdan</Text>
  //         <Text style={styles.hargaProduk}>Rp. 100000</Text>
  //       </View>
  //     )}
  //   />
  // </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   cardProduk: {
  //     width: 200,
  //     height: 250,
  //     borderColor: 'gray',
  //     borderWidth: 1,
  //     marginHorizontal: 15,
  //     marginVertical: 10,
  //     borderRadius: 10,
  //   },
  //   namaProduk: {
  //     color: 'black',
  //     fontSize: 16,
  //     marginHorizontal: 10,
  //     fontWeight: 'bold',
  //   },
  //   hargaProduk: {
  //     color: 'black',
  //     fontSize: 12,
  //     marginHorizontal: 10,
  //   },
  // });

  if (!dataRole) {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{color: 'black'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={dataRole}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Text style={{color: 'black'}}>Hamdan</Text>}
      />
    </View>
  );
};

export default Transaksi;
