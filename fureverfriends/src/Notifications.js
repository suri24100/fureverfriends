import React, {Component, useEffect, useState} from 'react';
import {useAuth} from "./AuthContext";
import M from "materialize-css";
import getPetProfileFromFB from "./ffdb";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";
import './App'

export default function Notifications() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })



    return (

        <div className="actionsnav">

            <div className="listings-banner-wrap">

            </div>

            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active current-page card-panel">
                                <Link to="/notifications">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/my-listings"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/my-favorites"> FAVORITES </Link></li>
                        </ul>
                    </div>

                    <div className="field col s12 m9" href="information">
                        <div className="collection profile-details">
                            <h2>Your Notifications</h2>
                            <br/>
                            <div className="listing-card col s12 m6 l4">
                                <Alert> We have found you a new match! </Alert>
                                <div  onClick={() => console.log('clicked')}>
                                    <button onClick={() => setIsOpen(true)}>View Matches</button>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
