import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

const db = firebase.initializeApp({
 apiKey: "AIzaSyCbirB-vp_FHR0dZXE7C9G_wBgew3WbfVg",
 authDomain: "fureverfriends-66bae.firebaseapp.com",
 databaseURL: "https://fureverfriends-66bae-default-rtdb.firebaseio.com",
 projectId: "fureverfriends-66bae",
 storageBucket: "fureverfriends-66bae.appspot.com",
 messagingSenderId: "1029056317935",
 appId: "1:1029056317935:web:27e3df2335d7074bbd0e1a",
 measurementId: "G-1XM6V6EB86"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
export {firestore}
export default db;