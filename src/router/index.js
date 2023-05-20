import React, {useEffect, useState} from 'react';

import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Splash from '../views/public/SplashScreen';
import OptionsAutentikasi from '../views/public/OptionsAutentikasi';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navigasi from '../partials/navigasi/';
import Login from '../views/public/Autentikasi/Login';
import Daftar from '../views/public/Autentikasi/Daftar';
import DashboardMember from '../views/member/DashboardMember';
import Icon from 'react-native-vector-icons/Ionicons';
import Transaksi from '../views/member/Transaksi';
import ProfileAkun from '../views/member/ProfileAkun';
import ChatDokter from '../views/member/FiturUnggulan/ChatDokter';
import DetailChatDokter from '../views/member/DetailChat';
import EditProfil from '../views/member/EditProfil';
import Chating from '../views/member/Chating';
import Dashboard from '../views/dokter/Dashboard';
import Detail from '../views/member/Artikel/DetailArtikel';
import ChatingDokter from '../views/dokter/Chating';
import Konsultasi from '../views/member/Konsultasi';
import BuatJadwal from '../views/member/FiturUnggulan/BuatJanji';
import DetailBuatJanji from '../views/member/FiturUnggulan/DetailBuatJanji';
import InformasiBuatJanji from '../views/member/FiturUnggulan/InformasiBuatJanji';
import TokoKesehatanProduk from '../views/member/Produk/TokoKesehatanProduk';
import SpesialisDokter from '../views/member/FiturUnggulan/Spesialis/DokterRumahSakit';
import LanjutkanPembayaran from '../views/member/FiturUnggulan/LanjutkanPembayaran';
import DetailProduk from '../views/member/Produk/DetailProduk';
import Keranjang from '../views/member/Produk/TokoKesehatanProduk/Keranjang';
import UpdatePassword from '../views/member/ProfileAkun/UpdatePassword';
import AlamatTersimpan from '../views/member/ProfileAkun/AlamatTersimpan';
import KeahlianDokter from '../views/member/DashboardMember/KeahlianDokter';
import RingkasanPembayaran from '../views/member/DashboardMember/KeahlianDokter/RingkasanPembayaran';
import AllData from '../views/member/FiturUnggulan/BuatJanji/AllData';
import AllDataProduk from '../views/member/Produk/TokoKesehatanProduk/AllData';
import RingkasanPembayaranProduk from '../views/member/Produk/TokoKesehatanProduk/RingkasanPembayaranProduk';
import Cash from '../views/member/Produk/TokoKesehatanProduk/RingkasanPembayaranProduk/Cash';
import Banks from '../views/member/Produk/TokoKesehatanProduk/RingkasanPembayaranProduk/Banks';
import EWallet from '../views/member/Produk/TokoKesehatanProduk/RingkasanPembayaranProduk/E-Wallet';
import LoadingScreen from '../views/member/LoadingScreen';
import ProfileAkunDokter from '../views/dokter/ProfileAkunDokter';
import EditProfilDokter from '../views/dokter/ProfileAkunDokter/EditProfilDokter';
import KonsultasiDokter from '../views/dokter/KonsultasiDokter';
import AllDataRumahSakit from '../views/dokter/Dashboard/AllDataRumahSakit';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName={Navigasi.DASHBOARD_MEMBER}
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name == 'Beranda') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name == 'ProfileMember') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name == 'Konsultasi') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name == 'Transaksi') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 3,
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name={Navigasi.DASHBOARD_MEMBER}
        component={DashboardMember}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name={Navigasi.TRANSAKSI_MEMBER}
        component={Transaksi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Navigasi.KONSULTASI}
        component={Konsultasi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Navigasi.PROFILE_MEMBER}
        component={ProfileAkun}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const MainDokter = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashboardDokter"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name == 'DashboardDokter') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name == 'ProfileAkunDokter') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name == 'KonsultasiDokter') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name == 'Transaksi') {
            iconName = focused ? 'book' : 'book-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 3,
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name={Navigasi.DASHBOARD_DOKTER}
        component={Dashboard}
        options={{headerShown: false, title: 'Home'}}
      />
      <Tab.Screen
        name={Navigasi.TRANSAKSI_MEMBER}
        component={Transaksi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Navigasi.KONSULTASI_DOKTER}
        component={KonsultasiDokter}
        options={{headerShown: false, title: 'Konsultasi'}}
      />
      <Tab.Screen
        name={Navigasi.PROFILE_DOKTER}
        component={ProfileAkunDokter}
        options={{headerShown: false, title: 'Profil Saya'}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName={Navigasi.SPLASH}
      screenOptions={{gestureEnabled: true, gestureDirection: 'horizontal'}}>
      <Stack.Screen
        name={Navigasi.SPLASH}
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.OPTIONS_AUTENTIKASI}
        component={OptionsAutentikasi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.MAIN_APP}
        component={MainApp}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Stack.Screen
        name={Navigasi.MAIN_DOKTER}
        component={MainDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.SPESIALIS_DOKTER}
        component={SpesialisDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.LOGIN}
        component={Login}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal-inverted',
        }}
      />
      <Stack.Screen
        name={Navigasi.DAFTAR}
        component={Daftar}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name={Navigasi.CHAT_DOKTER}
        component={ChatDokter}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name={Navigasi.BUAT_JANJI}
        component={BuatJadwal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.All_DATA_RS}
        component={AllData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.All_DATA_PRODUK}
        component={AllDataProduk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.RINGKASAN_PEMBAYARAN_PRODUK}
        component={RingkasanPembayaranProduk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.BANKS}
        component={Banks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.EWallet}
        component={EWallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.CASH}
        component={Cash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.KEAHLIAN_DOKTER}
        component={KeahlianDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.RINGKASAN_PEMBAYARAN}
        component={RingkasanPembayaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.DETAIL_CHAT}
        component={DetailChatDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.UPDATE_PASSWORD_MEMBER}
        component={UpdatePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.ALAMAT_TERSIMPAN}
        component={AlamatTersimpan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.LANJUTKAN_PEMBAYARAN}
        component={LanjutkanPembayaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.DETAIL_ARTIKEL}
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.TOKO_KESEHATAN_PRODUK}
        component={TokoKesehatanProduk}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name={Navigasi.KERANJANG}
        component={Keranjang}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.DETAIL_PRODUK}
        component={DetailProduk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.DETAIL_BUAT_JANJI}
        component={DetailBuatJanji}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.INFORMASI_BUAT_JANJI}
        component={InformasiBuatJanji}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.EDIT_PROFILE}
        component={EditProfil}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.CHATING}
        component={Chating}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Navigasi.LoadingScreen}
        component={LoadingScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={Navigasi.EDIT_PROFILE_DOKTER}
        component={EditProfilDokter}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name={Navigasi.ALL_DATA_RUMAH_SAKIT_TERDEKAT}
        component={AllDataRumahSakit}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
