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

// Create a new pet listing/profile
const createNewPetProfile = async (listingType, petData) => {
 // Add a new document in collection related to listing type
 firestore.collection("test-collection").doc("TestID").set({name:"Fluffy"})
     .then(() => {
      console.log("Document successfully written!");
     })
     .catch((error) => {
      console.error("Error writing document: ", error);
     });
}

// Adoption List Interactions
const getAdoptionList = () => {
 firestore.collection("AdoptionList").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
   console.log(`${doc.id} => ${doc.data()}`);
  });
 });
}

// Get an existing pet listing/profile
const getPetProfileData = (listingType) => {

}



 // Update pet listing/profile


// get Adopted list

// get Lost/Found list


export default db;
export {createNewPetProfile, getAdoptionList, firestore };