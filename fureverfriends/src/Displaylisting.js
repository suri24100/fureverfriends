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

    async function Displaylisting(e){
        e.preventDefault();

        const snapshot = await firestore.collection("UserInfo").where("username", "==", USER.username).get();
        if(!snapshot.empty && USER.username !== username)
        {
            setLoading(false);
        }

        try {
            setLoading(true);
        }catch(err) {
            setLoading(true);
        }

        setLoading(false);
    }


    return (
        <div className="actionsnav">
            {/*in order for this to work, would need to remove <Header/> in app.js, need to fix the camel cases when user info is displayed*/}

            <div className="listings-banner-wrap">
                <Header/>
            </div>
            <div className = "container">
                <div className="row">
                    <div className="col s12 m3" id = "sidenav">
                        <div className = "collection">
                            <a href="msg" className = "collection-item" >Messages</a>
                            <a href="ntf" className ="collection-item"  >Notifications</a>
                            <a href="yl" className = "collection-item"  >Your Listings</a>
                            <a href="information" className = "collection-item"  >Account Info</a>
                            <a href="ss" className = "collection-item" >Safe Spawts</a>
                            <a href="favs" className = "collection-item" >Favorites</a>
                        </div>
                    </div>

                    <div className="col s12 m9" href="information">
                        <div className="collection">
                            <br/>
                            <div className="listing-card col s12 m6 l4">
                                <div className="card">
                                    <div className="card-content">
                                        <span className="name">{USER.pet_listings}</span>
                                        <span className="location">{USER.location}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Link to ="/userprofile"  className="waves-effect btn"> Edit Profile </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}