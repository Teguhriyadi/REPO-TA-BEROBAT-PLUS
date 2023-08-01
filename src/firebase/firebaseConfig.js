// import Firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyBKujpWglVggSCK_WITtpLDv7ZAkdaD5FU",
  authDomain: "tugasakhir-6f501.firebaseapp.com",
  databaseURL: "https://tugasakhir-6f501-default-rtdb.firebaseio.com",
  projectId: "tugasakhir-6f501",
  storageBucket: "tugasakhir-6f501.appspot.com",
  messagingSenderId: "299922993406",
  appId: "1:299922993406:web:e53375cef4e51f1692b5af",
  measurementId: "G-T0Y9BMCP0C"
};

const configfirebase = firebase.initializeApp(firebaseConfig);

export {configfirebase};
