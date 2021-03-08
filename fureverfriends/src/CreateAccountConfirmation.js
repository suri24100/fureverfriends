import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import {Link} from "react-router-dom";
import {useAuth} from './AuthContext';



export default function CreateAccountConfirmation(){
    const {currentUser} = useAuth();

    return (
        <body>
            <div className="listings-banner-wrap">
                <Header/>
                <div className="listings-banner-img-wrap"></div>
            </div>
            <div className="signing-banner-wrap">
                <div className="signing-banner-img-wrap"></div>
                <div className="invis-wrap">
                    <div className="info-wrap">
                        <div className="logo-wrap">
                            <img src="paw-green.svg"/>
                            <h3>Furever Friends</h3>
                            <img src="paw-green.svg"/>
                        </div>
                        <br></br>
                        <div className="form-wrap" id="log-in-form">
                            <form className="account-form">
                                <h1 style="color:  #379683;">Congratulations!</h1>
                                <h2 style="color:  #379683;">Your account has been created!</h2>

                                <p>You can now favorite pets, message others, get alerts for new matchs and application statuses.
                                    The email registered to your account is {currentUser.email}. For more information regarding
                                    your account, click on the My Account button below
                                </p>
                            </form>
                            <div className="bottom-info">
                                <div className="btn-wrap default">
                                    <button className="signing-btn">
                                        <Link to="/UserProfile">My Account</Link>
                                    </button>
                                </div>
                                <div className="belowbutton-subheading">
                                    <span>Need to create an account?<Link to="/Listing">Sign Up</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}