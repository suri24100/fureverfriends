
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