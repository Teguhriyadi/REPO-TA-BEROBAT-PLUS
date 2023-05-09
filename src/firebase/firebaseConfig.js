// import Firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  // apiKey: 'AIzaSyAvaD6_r7MwqkgfkrbSdq6_m__n_D6rtZM',
  // authDomain: 'chatingwithfirebase-f5dc2.firebaseapp.com',
  // projectId: 'chatingwithfirebase-f5dc2',
  // storageBucket: 'chatingwithfirebase-f5dc2.appspot.com',
  // messagingSenderId: '1045817551204',
  // appId: '1:1045817551204:web:53065c7be154216b95b271',
  // measurementId: 'G-XD30Y5665F',
  apiKey: 'AIzaSyDNETaVxFc80yukCFGDs-lCQJUOgE70tdk',
  authDomain: 'newprojecttaberobatplus.firebaseapp.com',
  projectId: 'newprojecttaberobatplus',
  storageBucket: 'newprojecttaberobatplus.appspot.com',
  messagingSenderId: '399839794841',
  appId: '1:399839794841:web:8a6e07bf5b19ede4b48a08',
  measurementId: 'G-GVJ4SHTE0W',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
