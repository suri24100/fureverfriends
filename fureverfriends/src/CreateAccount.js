import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import {Link} from "react-router-dom";
import Login from "./Login";
import db from "./ffdb";

export default function CreateAccount(){
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () =>{
        setEmail('');
        setPassword('');
    }
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }
    const handleLogin = () => {
        clearErrors();

        db
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
                    setEmailError(err.message);
                } else if (err.code === "auth/wrong-password") {
                    setPasswordError(err.message);
                }
            });
    };

    const handleSignUp = () => {
        db
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                    setEmailError(err.message);
                } else if (err.code === "auth/weak-password") {
                    setPasswordError(err.message);
                }
            });
    };

    const handleLogOut = () => {
        return db.auth().signOut();
    };

    const authListener = () => {
        db.auth().onAuthStateChanged(user =>{
            if(user) {
                clearInputs();
                console.log("The user is logged in")
            }
            else{
                console.log("The user is not logged in")
            }
        })
    }

    useEffect(() =>{
        authListener();
    }, []);
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
                            <input type="email" id="email" name="email"
                                   value = {email}
                                   onChange ={(e) => setEmail(e.target.value)}/>
                            <p className="errorMsg">{emailError}</p>

                            <label for="pass">Enter Your Password</label>
                            <input type="password" id="pass" name="pass"
                                   value = {password}
                                   onChange ={(e) => setPassword(e.target.value)}/>
                            <p className = "errorMsg"> {passwordError}</p>
                        </form>
                    </div>
                    <div className="bottom-info">
                        <div className="btn-wrap default">
                            <button className="signing-btn"
                                    onClick = {handleSignUp}>
                                Sign Up</button>
                        </div>
                        <div className="belowbutton-subheading">
                            <span>Have an account already?<Link to="/Login">Log In</Link></span>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}