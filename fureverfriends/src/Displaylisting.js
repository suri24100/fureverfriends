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

import Listings from "./Listings";


import './css/home.css';
import './css/style.css'

import {Link} from "react-router-dom";
import {useAuth} from "./AuthContext";
import {PET_PROFILE as petDetails} from "./api-modules/constants";





export default function Displaylisting() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })


    async function listing(id, type) {
        let profileData = {};
        let docRef = firestore.collection("PetInfo")
            .doc.data("PublicListings")
            .collection("AdoptionList")
            .doc.data("PetTypes")
            .collection(type)
            .doc.data(id);

        return profileData;
    }
    console.log(petDetails)

    return (

    <div className="actionsnav">
        {/*in order for this to work, would need to remove <Header/> in app.js, need to fix the camel cases when user info is displayed*/}

        <div className="listings-banner-wrap">

        </div>



        <div className = "container">
            <div className="row">
                <div className="sub-nav col s12 m3" id="side-nav full">
                    <ul className="sub-nav-options collection">
                        <li className="card-content collection-item active card-panel hoverable">
                            {/*<i className="small material-icons prefix"> notifications </i>*/}
                            <Link to="/">NOTIFICATIONS </Link>
                        </li>
                        <li className="card-content collection-item card active card-panel hoverable">
                            {/*<i className="small material-icons prefix">list </i>*/}
                            <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                        </li>
                        <li className="card-content collection-item active card-panel hoverable">
                            {/*<i className="small material-icons prefix">account_circle </i>*/}
                            <Link to="/DisplayUserProfile"> ACCOUNT </Link>
                        </li>
                        <li className="card-content collection-item active card-panel hoverable">
                            {/*<i className="small material-icons prefix">favorite  </i>*/}
                            <Link to="/DisplayFavorites"> FAVORITES </Link></li>
                    </ul>
                </div>

                <div className="field col s12 m9" href="information">
                    <div className="collection">
                        <br/>
                        <div className="listing-card col s12 m6 l4">
                            <div className="card">
                                <div className="card-image">
                                    <a className="btn-floating halfway-fab">
                                        <i className="material-icons">favorite_border</i>
                                    </a>
                                </div>
                                <div className="card-content">
                                    <span className="name">{}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to ="/findahome"  className="waves-effect btn"> Add New Listing </Link>
                </div>
            </div>
        </div>
    </div>
    )
}