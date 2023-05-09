import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../partials/navigasi';
import {getData, baseUrl, colors, storeData} from '../../../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TokoKesehatanProduk = ({navigation}) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [kategoriProduk, setKategoriProduk] = useState({});
  const [showIndicator, setShowIndicator] = useState(false);
  const [produk, setProduk] = useState([]);
  const [totalKeranjang, setTotalKeranjang] = useState(0);

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      getDataUserLocal();
      getKategoriProduk();
      getProduk();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token, dataPribadi.idx]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const getKategoriProduk = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/master/produk/kategori_produk`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          setKategoriProduk(response.data.data);
          setShowIndicator(true);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getProduk = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/apotek/produk/data_produk`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          const products = response.data.data.map(product => {
            return {
              ...product,
              count: 0,
            };
          });
          setProduk(products);
          setShowIndicator(true);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const tambahKeranjang = async product => {
    const productIndex = produk.findIndex(p => p.id === product);
    const newProductList = [...produk];
    newProductList[productIndex].count += 1;
    setProduk(newProductList);

    try {
      const jsonValue = await AsyncStorage.getItem(`produk_${dataPribadi.idx}`);
    if (jsonValue !== null) {
      const oldProductList = JSON.parse(jsonValue);
      const existingProductIndex = oldProductList.findIndex(
        p => p.id === newProductList[productIndex].id,
      );
      if (existingProductIndex >= 0) {
        oldProductList[existingProductIndex].count += 1;
        await AsyncStorage.setItem(`produk_${dataPribadi.idx}`, JSON.stringify(oldProductList));
      } else {
        const mergedProductList = [
          ...oldProductList,
          newProductList[productIndex],
        ];
        await AsyncStorage.setItem(
          `produk_${dataPribadi.idx}`,
          JSON.stringify(mergedProductList),
        );
      }
    } else {
      await AsyncStorage.setItem(
        `produk_${dataPribadi.idx}`,
        JSON.stringify([newProductList[productIndex]]),
      );
    }

    const produkKeys = Object.keys(produk);
    for (const key of produkKeys) {
      const jsonValue = await AsyncStorage.getItem(`produk_${dataPribadi.idx}_${key}`);
      const oldProduct = JSON.parse(jsonValue);
      const newProduct = newProductList.find(p => p.id === product);
      await AsyncStorage.setItem(`produk_${dataPribadi.idx}_${key}`, JSON.stringify(newProduct));
    }
    } catch (error) {
      console.log(error);
    }
  };

  const incrementProduct = product => {
    const productIndex = produk.findIndex(p => p.id === product);
    const newProductList = [...produk];
    const qtyProduct = newProductList[productIndex].qty;

    if (newProductList[productIndex].count < qtyProduct) {
      newProductList[productIndex].count += 1;
      setProduk(newProductList);
    }
  };

  const decrementProduct = product => {
    const productIndex = produk.findIndex(p => p.id === product);
    const newProductList = [...produk];
    if (newProductList[productIndex].count > 0) {
      newProductList[productIndex].count -= 1;
    }
    setProduk(newProductList);
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.MAIN_APP);
            }}>
            <Icon name="arrow-back" style={{color: 'black', fontSize: 20}} />
          </TouchableOpacity>
          <Text style={styles.textHeading}>Toko Kesehatan Produk</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.KERANJANG);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.viewLingkaran}>
                <Text
                  style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                  {totalKeranjang}
                </Text>
              </View>
              <Icon name="cart-sharp" style={{color: 'red', fontSize: 20}} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardSearch}>
        <View style={styles.viewIcon}>
          <Icon
            name="search"
            style={{color: 'gray', fontSize: 20, fontWeight: 'bold'}}
          />
        </View>
        <View style={styles.contentSearch}>
          <TextInput
            placeholder="Ex: Lifeboy"
            placeholderTextColor="gray"
            style={{
              height: 40,
              fontSize: 12,
              color: 'gray',
            }}
          />
        </View>
      </View>
      <Text style={styles.title}>Belanja Sesuai Kategori</Text>
      <View style={styles.viewKategori}>
        {showIndicator ? (
          <FlatList
            data={kategoriProduk}
            numColumns={4}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id_kategori_produk}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.cardImageKategori}>
                  <Image
                    source={require('../../../../assets/images/auth-new.png')}
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textAlign: 'center',
                  }}>
                  {item.nama_kategori_produk}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={{paddingVertical: 30}}>
            <ActivityIndicator size="large" color="#0000FF"></ActivityIndicator>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.judulTextMenu}>Produk Terlaris</Text>
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.designButton}>
            <Text style={styles.textButton}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showIndicator ? (
        <FlatList
          data={produk}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.cardProduk}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(Navigasi.DETAIL_PRODUK);
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('../../../../assets/images/auth-new.png')}
                    resizeMode="cover"
                    style={{width: 150, height: 150}}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.namaProduk}>{item.nama_produk}</Text>
              <Text style={styles.hargaProduk}>{item.harga_produk}</Text>
              {item.count == 0 ? (
                item.qty == 0 ? (
                  <View style={styles.viewQtyTidakTersedia}>
                    <Text style={styles.textQtyTidakTersedia}>
                      Maaf, Produk Tidak Tersedia
                    </Text>
                  </View>
                ) : (
                  <View style={styles.buttonProduk}>
                    <TouchableOpacity
                      onPress={() => tambahKeranjang(item.id)}
                      style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          color: 'purple',
                          padding: 5,
                        }}>
                        Tambah
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              ) : (
                <View style={styles.countKosong}>
                  <TouchableOpacity onPress={() => incrementProduct(item.id)}>
                    <View style={styles.buttonOperator}>
                      <Text style={{color: 'black', fontSize: 16}}>+</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.viewTextOperator}>
                    <Text
                      style={{
                        color: 'purple',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {item.count}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => decrementProduct(item.id)}>
                    <View style={[styles.buttonOperator, {marginLeft: 10}]}>
                      <Text style={{color: 'black', fontSize: 16}}>-</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View style={{paddingVertical: 30}}>
          <ActivityIndicator size="large" color="#0000FF"></ActivityIndicator>
        </View>
      )}
      <View style={styles.viewUnggahResep}>
        <View style={{flex: 2}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Unggap Resep Anda
          </Text>
          <Text style={{color: 'black', fontSize: 10}}>
            Silahkan upload resep anda dengan jelas
          </Text>
        </View>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <Icon
            name="ios-arrow-forward"
            style={{fontSize: 20, color: 'black'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    height: 50,
    padding: 15,
    backgroundColor: colors.background,
    flexDirection: 'row',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    color: 'black',
    paddingLeft: 10,
  },
  iconheading: {
    fontSize: 20,
    color: 'black',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 10,
  },
  judulTextMenu: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  designButton: {
    paddingHorizontal: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 20,
  },
  textButton: {
    color: 'green',
    marginHorizontal: 5,
    fontSize: 12,
    marginVertical: 2,
    fontWeight: 'bold',
  },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardSearch: {
    marginHorizontal: 10,
    backgroundColor: '#f4f0f0',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentSearch: {
    flex: 8,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardProduk: {
    width: 200,
    height: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  namaProduk: {
    color: 'black',
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  hargaProduk: {
    color: 'black',
    fontSize: 12,
    marginHorizontal: 10,
  },
  buttonProduk: {
    borderColor: 'purple',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  viewKategori: {
    marginTop: 5,
  },
  cardImageKategori: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: 'black',
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 5,
  },
  countKosong: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  buttonOperator: {
    flex: 1,
    width: 60,
    borderColor: 'purple',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  viewTextOperator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  viewUnggahResep: {
    backgroundColor: 'white',
    elevation: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  viewLingkaran: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textQtyTidakTersedia: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  viewQtyTidakTersedia: {
    marginHorizontal: 10,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TokoKesehatanProduk;
