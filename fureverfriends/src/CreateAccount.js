import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';

export default function CreateAccount(){
    return (
        <div className="signing-banner-wrap">
            <div className="signing-banner-img-wrap"></div>
            <div className="invis-wrap">
                <div className="info-wrap">
                    <div className="logo-wrap">
                        <img src="paw-green.svg"/>
                        <h3>Furever Friends</h3>
                        <img src="paw-green.svg"/>
                    </div>
                    <h3 className="subH">Log In</h3>
                    <div className="form-wrap" id="log-in-form">
                        <form className="account-form">
                            <h2 className="welcome-back-heading">Welcome Back!</h2>

                            <label for="email">Enter Your Email Address:</label>
                            <input type="email" id="email" name="email"/>

                            <label for="pass">Enter Your Password</label>
                            <input type="password" id="pass" name="pass"/>
                        </form>
                    </div>
                    <div className="bottom-info">
                        <div className="btn-wrap default">
                            <button className="signing-btn">Log In</button>
                        </div>
                        <div className="belowbutton-subheading">
                            <span>Need to create an account?<a href="#">Sign Up</a></span>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}