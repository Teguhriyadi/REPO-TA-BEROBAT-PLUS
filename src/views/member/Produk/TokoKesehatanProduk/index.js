import React, { useState, useEffect } from 'react';
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
import { getData, baseUrl, colors, storeData, showSuccess } from '../../../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Keranjang from './Keranjang';
import { ScrollView } from 'react-native-gesture-handler';

const TokoKesehatanProduk = ({ navigation }) => {
  const [dataPribadi, setDataPribadi] = useState({});
  const [kategoriProduk, setKategoriProduk] = useState(null);
  const [showIndicator, setShowIndicator] = useState(false);
  const [produk, setProduk] = useState(null);

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
      const response = await axios({
        url: `${baseUrl.url}/master/produk/kategori_produk`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });

      setKategoriProduk(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getProduk = async () => {
    await axios({
      url: `${baseUrl.url}/apotek/produk/data_produk`,
      headers: {
        Authorization: 'Bearer ' + dataPribadi.token
      },
      method: "GET"
    }).then((response) => {
      const products = response.data.data.map(product => {
        return {
          ...product,
          count: 0
        };
      });
      setProduk(products);
    }).catch((error) => {
      console.log(error);
    })
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
          await AsyncStorage.setItem(
            `produk_${dataPribadi.idx}`,
            JSON.stringify(oldProductList),
          );
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
        const jsonValue = await AsyncStorage.getItem(
          `produk_${dataPribadi.idx}_${key}`,
        );
        const oldProduct = JSON.parse(jsonValue);
        const newProduct = newProductList.find(p => p.id === product);
        await AsyncStorage.setItem(
          `produk_${dataPribadi.idx}_${key}`,
          JSON.stringify(newProduct),
        );
      }

      showSuccess('Berhasil', 'Data Produk Berhasil Masuk Ke Keranjang');

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
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.MAIN_APP);
            }}>
            <Icon name="arrow-back" style={{ color: 'black', fontSize: 20 }} />
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
                position: 'relative'
              }}>
              <Icon name="cart-sharp" style={{ color: 'red', fontSize: 20 }} />

              <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', fontSize: 12 }}>
                  0
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardSearch}>
        <View style={styles.viewIcon}>
          <Icon
            name="search"
            style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}
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
      {kategoriProduk == null ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={styles.viewKategori} >
          {kategoriProduk.map((item) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate(Navigasi.PRODUK_BY_KATEGORI, {
                  data: item
                })
              }} key={item.id_kategori_produk}>
                <View style={styles.cardKategori}>
                  <Text style={{ color: 'black' }}>
                    {item.nama_kategori_produk}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
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
          <TouchableOpacity style={styles.designButton} onPress={() => {
            navigation.navigate(Navigasi.All_DATA_PRODUK)
          }}>
            <Text style={styles.textButton}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
      </View>

      {produk == null ? (
        <View style={{ marginHorizontal: 10 }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 10 }}>
            {produk.map((item, index) => {
              return (
                <View style={[styles.cardProduk]} key={item.id}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../../../assets/images/obat.png")} resizeMode='cover' style={{ width: 100, height: 100 }} />
                  </View>
                  <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>
                    {item.nama_produk}
                  </Text>
                  <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold', fontFamily: 'Poppins-Medium' }}>{item.harga_produk}</Text>
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
                          style={{ alignItems: 'center' }}>
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
                          <Text style={{ color: 'black', fontSize: 16 }}>+</Text>
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
                        <View style={[styles.buttonOperator, { marginLeft: 10 }]}>
                          <Text style={{ color: 'black', fontSize: 16 }}>-</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </ScrollView>
      )}
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
    fontFamily: 'Poppins-Medium'
  },
  judulTextMenu: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins-Medium'
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
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexBasis: '48%'
  },
  buttonProduk: {
    borderColor: 'purple',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
  },
  viewKategori: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    marginTop: 5
  },
  cardKategori: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  countKosong: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  buttonOperator: {
    flex: 1,
    width: 40,
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
