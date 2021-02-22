import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {getBreeds, getTypeListing} from "./api-modules/PetfinderAPI";


// for example purposes
let d = getBreeds("dog");
let c = getBreeds("cat");
let r = getBreeds("rabbit");

let dl = getTypeListing("dog", 10);
let cl = getTypeListing("cat", 10);


//import firebase from "firebase";

//
// const app = firebase.initializeApp ({
//     apiKey: "AIzaSyCbirB-vp_FHR0dZXE7C9G_wBgew3WbfVg",
//     authDomain: "fureverfriends-66bae.firebaseapp.com",
//     // databaseURl: '';
//     projectId: "fureverfriends-66bae",
//     storageBucket: "fureverfriends-66bae.appspot.com",
//     messagingSenderId: "1029056317935",
//     appId: "1:1029056317935:web:27e3df2335d7074bbd0e1a",
//     measurementId: "G-1XM6V6EB86"
// });
// BrowserRouter allows anything within App to call Switch/Link/Route objects
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// export const auth = app.auth()
// export default app

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
