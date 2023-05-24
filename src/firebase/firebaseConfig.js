// import Firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyDEa92eDUEuAt1DZX0L520AN0nplfG1yas",
  authDomain: "chatberobatplusapp.firebaseapp.com",
  projectId: "chatberobatplusapp",
  storageBucket: "chatberobatplusapp.appspot.com",
  messagingSenderId: "206847799116",
  appId: "1:206847799116:web:78dfdcc795d4076c7929e9",
  measurementId: "G-2EWNVF42HX"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
