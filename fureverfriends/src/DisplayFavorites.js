import React, { useState, useEffect } from 'react';
import './css/style.css';
import './css/newListings.css';
import ReactDOM from 'react-dom';
import './Listings.js';
import $ from 'jquery';
import M from "materialize-css";

// test code for creating a listing
import db, {firestore, storage} from "./ffdb";
import 'firebase/storage';
import {useAuth} from "./AuthContext";
import {Link} from "react-router-dom";
import Header from "./Header";
import Listings from "./Listings";
import {PET_PROFILE as pets} from "./api-modules/constants";


export default function DisplayFavorites() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [petInfo, setPetinfo] = useState([]);

    useEffect(()=>{
        if (USER.email.length > 0 && !loading){
            setLoading(true); //trackinmg when the page loaded
            favorites()
        }
    })

//user needed to be auth in order to get the listings
    useEffect(()=>{
        console.log(petInfo)}, [petInfo] //call all the {} everytime petinfo changes :state management
    )
//race condition : overriding thats why only getting one array at a time
    //deal with duplicates

    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
     console.log("Reloaded");
    })

    async function favorites(){
        let profileData = [];
        await USER.pet_listings.map((pets) =>  {
            let docRef = firestore.collection("PetInfo")
                .doc("PublicListings")
                .collection("AdoptionList")
                .doc("PetTypes")
                .collection(pets.id)
                .doc(pets.favorites);
            docRef.get().then((doc) => {
                profileData.push(doc.data())
            });
        })
        setPetinfo(profileData)
        return profileData;
   console.log(favorites)
        //need to addd petfinder info and delete if petfinder posting is deleted
    }

    async function petfinderfavs(){
        let petfinderfavs = [];
        await USER.favorites.map((pets) => {
            let docRef = firestore.collection("")
        })
    }

    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">

            </div>
            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix"> notifications </i>*/}
                                <Link to="/Notifacations">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">list </i>*/}
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item card active card-panel hoverable">
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/DisplayFavorites"> FAVORITES </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="col s12 m9" href="information">
                        <div className="collection">
                            <br/>
                            <div className="listing-card col s12 m6 l4">
                                <div className="card">
                                    <div className="card-content">
                                        <span className="name">{USER.favorites}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Link to ="/listings"  className="waves-effect btn"> View More Pets </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
