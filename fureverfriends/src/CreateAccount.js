import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link, useHistory} from "react-router-dom";
import {useAuth} from './AuthContext';
import {firestore} from "./ffdb";

import $ from 'jquery';
import M from "materialize-css";


export default function CreateAccount(){
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [accountType, setAccountType] = useState('');
    const [zip, setZip] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorConfirm, setPasswordErrorConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    const clearInputs = () =>{
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setAccountType('');
        setZip('');
        setPassword('');
        setPasswordConfirm('');
        setPassword('');
        setPasswordConfirm('');
    }
    const clearErrors = () => {
        setError('');
        setUsernameError('')
        setEmailError('');
        setPasswordError('');
        setPasswordErrorConfirm('');
    }

    async function handleSignUp(e) {
        e.preventDefault();

        if(password !== passwordConfirm)
        {
            clearErrors();
            return setPasswordErrorConfirm("Passwords do not match");
        }

        const snapshot = await firestore.collection("UserInfo").where("Username", "==", username).get();
        if(!snapshot.empty)
        {
            return setUsernameError('Username already taken, please choose another one.');
        }


        try {
            clearErrors();
            setLoading(true);
            await signup(email, password);
            saveUser();
            clearInputs();
            history.push('/CreateAccountConfirmation')
        }catch(err) {
            clearErrors();
            setError("Failed to create an account");
            if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                setEmailError(err.message);
            }
            if (err.code === "auth/weak-password") {
                setPasswordError(err.message);
            }
        }

        setLoading(false);
    }

    function saveUser(){
        firestore.collection("UserInfo").add({
            Username: username,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phone,
            AccountType: accountType,
            UserZip: zip,
            UserBio: ""
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

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
                        <h3 className="subH">Sign Up</h3>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <div className="form-wrap" id="log-in-form">
                            <form onSubmit={handleSignUp} className="account-form">
                                <h2 className="welcome-back-heading">Welcome Back!</h2>

                                <label for="username">Enter New Username:</label>
                                <input type="username" id="username" name="username"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}/>
                                <p className="errorMsg">{usernameError}</p>

                                <label for="firstName">Enter Your First Name:</label>
                                <input type="firstName" id="firstName" name="firstName"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}/>

                                <label for="lastName">Enter Your Last Name:</label>
                                <input type="lastName" id="lastName" name="lastName"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}/>

                                <label for="email">Enter Your Email Address:</label>
                                <input type="email" id="email" name="email"
                                       value = {email}
                                       onChange ={(e) => setEmail(e.target.value)}/>
                                <p className="errorMsg">{emailError}</p>

                                <label for="phone">Enter Your Phone Number:</label>
                                <input type="phone" id="phone" name="phone"
                                       value={phone}
                                       onChange={(e) => setPhone(e.target.value)}/>

                                {/*<label htmlFor="accountType">Choose Account:</label>*/}
                                {/*<div className="input-field col s12">*/}
                                {/*    <select id="accountType" name="accountType">*/}
                                {/*        <option value="Adopter">Adopter</option>*/}
                                {/*        <option value="Private Owner">Private Owner</option>*/}
                                {/*        <option value="Organization ">Organization</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}

                                {/*<div className="input-field col s3 right">*/}
                                {/*    <select>*/}
                                {/*        <option value="" disabled selected>Sort By</option>*/}
                                {/*        <option value="1">Newest</option>*/}
                                {/*        <option value="2">Most Viewed</option>*/}
                                {/*        <option value="3">Least Viewed</option>*/}
                                {/*        <option value="3">Distance</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}

                                <label for="accountType">Choose Account:</label>
                                <input type="accountType" id="accountType" name="accountType"
                                       value={accountType}
                                       onChange={(e) => setAccountType(e.target.value)}/>

                                <label for="zip">Enter Your Zip Code:</label>
                                <input type="zip" id="zip" name="zip"
                                       value={zip}
                                       onChange={(e) => setZip(e.target.value)}/>

                                <label for="pass">Enter Your Password</label>
                                <input type="password" id="pass" name="pass"
                                       value = {password}
                                       onChange ={(e) => setPassword(e.target.value)}/>
                                <p className = "errorMsg"> {passwordError}</p>

                                <label htmlFor="pass">Confirm Your Password</label>
                                <input type="password" id="pass" name="pass"
                                       value={passwordConfirm}
                                       onChange={(e) => setPasswordConfirm(e.target.value)}/>
                                <p className="errorMsg"> {passwordErrorConfirm}</p>

                                <div className="bottom-info">
                                    <div className="btn-wrap default">
                                        <button disabled = {loading} className="signing-btn">Sign Up</button>
                                    </div>
                                </div>
                            </form>
                            <div className="bottom-info">
                                <div className="belowbutton-subheading">
                                    <span>Already have an account?<Link to="/Login">Log In</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}