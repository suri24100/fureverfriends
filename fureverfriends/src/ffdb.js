import firebase from "firebase/app";


// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";
//
// // Add the Firebase products that you want to use
 import "firebase/auth";
import 'firebase/firestore';
//
var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCbirB-vp_FHR0dZXE7C9G_wBgew3WbfVg",
  authDomain: "fureverfriends-66bae.firebaseapp.com",
 projectId: "fureverfriends-66bae",
  storageBucket: "fureverfriends-66bae.appspot.com",
  messagingSenderId: "1029056317935",
    appId: "1:1029056317935:web:27e3df2335d7074bbd0e1a",
   measurementId: "G-1XM6V6EB86"
});
const db = firebaseApp.firestore(); //used to interact with the database
// db.settings( { timestampsInSnapshots : true});

export {db};


import firebase from "firebase";
import "firebase/auth";
// For Fire JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwvrptm_uS2WUkaxpHHpgoFJO6ls0lWFE",
    authDomain: "auth-development-5d606.firebaseapp.com",
    projectId: "auth-development-5d606",
    storageBucket: "auth-development-5d606.appspot.com",
    messagingSenderId: "736593241147",
    appId: "1:736593241147:web:aeccf77687df9accf1e81e"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;