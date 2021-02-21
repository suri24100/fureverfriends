//
//     //Firebase ID's to connect to firebase
//     // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import React from "react";
// import ReactDom from "react-dom";
// import App from "./App";
//
//     import firebase from "firebase";
//
//     // If you enabled Analytics in your project, add the Firebase SDK for Analytics
//     import "firebase/analytics";
//
//     // Add the Firebase products that you want to use
//     import "firebase/auth";
//     import "firebase/firestore";
//
//     const firebaseConfig = {
//     apiKey: "AIzaSyCbirB-vp_FHR0dZXE7C9G_wBgew3WbfVg",
//     authDomain: "fureverfriends-66bae.firebaseapp.com",
//     // databaseURl: '';
//     projectId: "fureverfriends-66bae",
//     storageBucket: "fureverfriends-66bae.appspot.com",
//     messagingSenderId: "1029056317935",
//     appId: "1:1029056317935:web:27e3df2335d7074bbd0e1a",
//     measurementId: "G-1XM6V6EB86"
// };
//     firebase.initializeApp(firebaseConfig);
// const rootElement = document.getElementById("root");
// ReactDOM.render(
//     <React.StringMode>
//         <App/>
//     </React.StringMode>,
//     rootElement
// )
//     var firestore = firebase.firestore();
//      const docRef = firestore.collection("PetInfo").doc("pettype").doc("petage").doc("breed").collection("zipcode").collection("number")
//
//     //query selector
// const outputPetType = document.querySelector("#type-of-pet");
// const petagee = document.querySelector("#age");
// const breed = document.querySelector("#breed");
// const zipcode = document.querySelector("#zipcode");
// const number = document.querySelector("#number");
//
// //eventlister for the search pet option
//     searchButton.addEventListner("click", function(){
//       const textToSave = inputTextField.value;
//       console.log("Save" + textToSave + "to firefore")
//         docRef.set({
//             PetInfo: textToSave
//
//         }).then(function(){
//             console.log("Saved");
//         }).catch(function(error){
//             console.log("Error",error)
//         })
//     })
//
//
//     //initialize variables
//     var petname, petage, pettype, furlength, gender, personality;
//     function PetInfo(){
//     petname = document.getElementById(name).value;
//     petage = document.getElementById(age).value;
//     pettype = document.getElementById(type-of-pet).value;
//     furlength = document.getElementById(furlength).value;
//     gender = document.getElementById(gender).value;
//     personality = document.getElementById(personality).value;
// }
//
//     //data -pet
//     document.getElementById('insert').onclick =function (){
//     PetInfo();
//     firebase.database().ref().set({  // add a reference value
//     NameOfPet: petname,
//     PetAge: petage,
//     PetType: pettype,
//     Fur : furlength,
//     Gender: gender,
//     PetPersonality : personality
// });
// }
//
//     //selection -pet
//     document.getElementById("select").onclick = function(){
//     PetInfo();
//     firebase.data().ref().on('value', function(snapshot){
//     document.getElementById().value = snapshot.val().NameOfPet;
//     document.getElementById().value = snapshot.val().PetAge;
//     document.getElementById().value = snapshot.val().PetType;
//     document.getElementById().value = snapshot.val().Fur;
//     document.getElementById().value = snapshot.val().Gender;
//     document.getElementById().value = snapshot.val().PetPersonality;
// })
// }
//     //update - pet
//     document.getElementById('insert').onclick =function (){
//     PetInfo();
//     firebase.database().ref().set({  // add a reference value
//     NameOfPet: petname,
//     PetAge: petage,
//     PetType: pettype,
//     Fur : furlength,
//     Gender: gender,
//     PetPersonality : personality
// });
// }
//
//
//
//     //initialize variables
//     //datat-pet
//     var username, adopter, adoptee, lostandfound;
//     function UserInfo(){
//     username = document.getElementById().value;
//     adopter = document.getElementById().value;
//     adoptee = document.getElementById().value;
//     lostandfound = document.getElementById().value;
// }
//
//     //data -pet
//     document.getElementById('insert').onclick =function (){
//     PetInfo();
//     firebase.database().ref().set({  // add a reference value
//     username: username,
//     owner: adopter,
//     adoptee: adoptee,
//     lstfnd : lostandfound
// });
// }
//
//     //selection -pet
//     document.getElementById("select").onclick = function(){
//     PetInfo();
//     firebase.data().ref().on('value', function(snapshot){
//     document.getElementById(usernmae).value = snapshot.val().username;
//     document.getElementById(owner).value = snapshot.val().owner;
//     document.getElementById(adoptee).value = snapshot.val().adoptee;
//     document.getElementById(lostandfound).value = snapshot.val().lstfnd;
//
// })
// }
//     //update - pet
//     document.getElementById('insert').onclick =function (){
//     PetInfo();
//     firebase.database().ref().set({  // add a reference value
//     username: username,
//     owner: adopter,
//     adoptee: adoptee,
//     lstfnd : lostandfound
// });
// }
//
