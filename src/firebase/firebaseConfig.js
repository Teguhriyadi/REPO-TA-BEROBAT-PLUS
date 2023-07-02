// import Firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyB3PzdWn_LZ-iPGwYXb3oV8UgQ1UYsyLQ0",
  authDomain: "berobatta.firebaseapp.com",
  projectId: "berobatta",
  storageBucket: "berobatta.appspot.com",
  messagingSenderId: "609711793746",
  appId: "1:609711793746:web:90c0831069044374c9618b",
  measurementId: "G-RRPKWNGNDZ"
};

const configfirebase = firebase.initializeApp(firebaseConfig);

export {configfirebase};
