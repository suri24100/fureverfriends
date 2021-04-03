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


export default function DisplayFavorites() {
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

            </div>
            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix"> notifications </i>*/}
                                <Link to="/">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">list </i>*/}
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/DisplayUserProfile"> ACCOUNT </Link>
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
                        <Link to ="/userprofile"  className="waves-effect btn"> Edit Profile </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}