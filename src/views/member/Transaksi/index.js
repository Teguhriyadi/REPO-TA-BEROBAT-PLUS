import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import { colors, baseUrl, getData } from '../../../utils';
import axios from 'axios';
import { WebView } from "react-native-webview";
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import WS from 'react-native-websocket';
import { configfirebase } from '../../../firebase/firebaseConfig';
import Geolocation from '@react-native-community/geolocation';

const Transaksi = () => {
  // const [countdown, setCountdown] = useState(1800);
  // const [finished, setFinished] = useState(false);
  const [dataRole, setData] = useState(null);
  const [closestPerawat, setClosestPerawat] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [dataPribadi, setDataPribadi] = useState({});
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    getUserLocal();
    requestLocationPermission();
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 5000);

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

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude)
          setLongitude(longitude);
        });
      } else {
        console.log('Tidak Ditemukan ');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const cari = () => {
    if (latitude && longitude) {
      const perawatref = configfirebase.database().ref("locations");
      perawatref.once("value", (snapshot) => {
        const perawatdata = snapshot.val();
        console.log(perawatdata);
        if (perawatdata) {
          const perawatlist = Object.keys(perawatdata).map((key) => ({
            id: key,
            latitude: perawatdata[key].latitude,
            longitude: perawatdata[key].longitude
          }));

          perawatlist.forEach((perawat) => {
            const distance = haversineDistance(
              latitude,
              longitude,
              perawat.latitude,
              perawat.longitude
            );
            perawat.distance = distance;
          });

          // Mendapatkan perawat dengan jarak terdekat
          const closestPerawat = perawatlist.reduce((prev, curr) =>
            prev.distance < curr.distance ? prev : curr
          );

          setClosestPerawat(closestPerawat);
        }
      })
    } else {
      console.log("Lokasi Belum Tersedia");
    }
  }

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius bumi dalam kilometer
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Jarak dalam kilometer
    return distance;
  };

  const deg2rad = (degree) => {
    return degree * (Math.PI / 180);
  };

  const fetchData = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/role`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      console.log("----");
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     await axios({
    //       url: `${baseUrl.url}/master/role`,
    //       headers: {
    //         Authorization: 'Bearer ' + dataPribadi.token,
    //       },
    //       method: 'GET',
    //     })
    //       .then(response => {
    //         console.log(response.data.data)
    //         setShowIndicator(false);
    //         setData(response.data.data);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
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

  // if (!dataRole) {
  //   return (
  //     <View style={{flex: 1, backgroundColor: 'white'}}>
  //       <Text style={{color: 'black'}}>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    // <View style={{flex: 1, backgroundColor: 'white'}}>
    //   <FlatList
    //     data={dataRole}
    //     horizontal
    //     showsHorizontalScrollIndicator={false}
    //     renderItem={({item}) => <Text style={{color: 'black'}}>Hamdan</Text>}
    //   />
    // </View>
    <View style={{ flex: 1 }}>
      <StatusBarComponent />
      <TouchableOpacity style={{ marginHorizontal: 10, marginVertical: 10, borderColor: 'green', borderWidth: 1, borderRadius: 5, paddingVertical: 10 }} onPress={() => {
        cari();
      }}>
        <Text style={{ color: 'black', textAlign: 'center' }}>
          Cari Ahli Terdekat
        </Text>
      </TouchableOpacity>
      {closestPerawat && (
        <View>
          <Text style={{color: 'black'}}>Perawat Terdekat:</Text>
          <Text style={{color: 'black'}}>Nama: {closestPerawat.latitude}</Text>
          
        </View>
      )}
    </View>
  );
};

export default Transaksi;
