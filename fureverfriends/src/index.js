import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {getBreeds, getTypeListing, callTrainingData} from "./api-modules/PetfinderAPI";



import {getToken, getData} from "./api-modules/PetfinderAPI";

// for example purposes
// let d = getBreeds("dog");
// let c = getBreeds("cat");
// let r = getBreeds("rabbit");
//
// let dl = getTypeListing("dog", 10);
// let cl = getTypeListing("cat", 10);

// let t = getToken();
//let test = callTrainingData();


// BrowserRouter allows anything within App to call Switch/Link/Route objects
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
