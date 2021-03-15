import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link, useHistory} from "react-router-dom";
import {useAuth} from './AuthContext';
import {firestore} from "./ffdb";
import USER from './api-modules/constants'

import $ from 'jquery';
import M from "materialize-css";


export default function CreateAccount(){
    useEffect( () =>{
        M.AutoInit();
    })



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

    function setUser(){
        // const id = e.target.id
        // const value = e.target.value
        // // console.log(id)
        // // console.log(value)
        // // setState({...USER,
        // //     [id]:value})
        // // console.log(USER)
        // USER.({ID;
        // console.log(USER)
        // // console.log(value)
    }

    async function handleSignUp(e) {
        e.preventDefault();

        if(password !== passwordConfirm)
        {
            clearErrors();
            setLoading(false);
            return setPasswordErrorConfirm("Passwords do not match");
        }
        const snapshot = await firestore.collection("UserInfo").where("Username", "==", username).get();
        if(!snapshot.empty)
        {
            clearErrors();
            setLoading(false);
            return setUsernameError('Username already taken, please choose another one.');
        }


        try {
            clearErrors();
            setLoading(true);
            await signup(email, password);
            saveUser();
            clearInputs();
            history.push('/CreateAccountConfirmation');
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
        <div className="create-account-body">
            <div className="signing-banner-wrap">
                <Header/>
            </div>
            <div className="create-account container">
                <div className="row">
                    <div className="col s12 m5 offset-m7 form-box">
                        <div className="row logo-wrap center">
                            <img src="paw-green.svg"/>
                            <h3>Furever Friends</h3>
                            <img src="paw-green.svg"/>
                        </div>
                        <div className="row center"><h3 className="subH">Sign Up</h3></div>

                        {error && <Alert variant="danger">{error}</Alert>}
                        <form>
                            <div className="row body-row">
                                <div className="input-field col s12">
                                    <input type="text" id="username" name="username"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                   <label htmlFor="username">Enter New Username</label>
                                    <p className="errorMsg">{usernameError}</p>
                                </div>
                                <div className="input-field col s12">
                                    <input type="text" id="first_name" name="first_name"
                                           value={firstName}
                                           onChange={(e) => setFirstName(e.target.value)}/>
                                    <label htmlFor="first_name">Enter Your First Name:</label>
                                </div>
                                <div className="input-field col s12">
                                    <input type="text" id="last_name" name="last_name"
                                           value={lastName}
                                           onChange={(e) => setLastName(e.target.value)}/>
                                    <label htmlFor="last_name">Enter Your Last Name:</label>
                                </div>
                                <div className="input-field col s12">
                                    <input type="email" id="email" name="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                           <label htmlFor="email">Enter Your Email Address:</label>
                                    <p className="errorMsg">{emailError}</p>
                                </div>
                                <div className="input-field col s12">
                                    <input type="tel" id="phone_number" name="phone_number"
                                           value={phone}
                                           onChange={(e) => setPhone(e.target.value)}/>
                                    <label htmlFor="phone_number">Enter Your Phone Number:</label>
                                </div>
                                <div className="input-field col s12">
                                    <select id="account_type" onChange={(e) => setAccountType(e.target.value)}>
                                        <option value="Adopter">Adopter</option>
                                        <option value="Private Owner">Private Owner</option>
                                        <option value="Organization">Organization</option>
                                    </select>
                                    <label>I am signing up as:</label>
                                </div>
                                <div className="input-field col s12">
                                    <input type="number" id="user_zip" name="user_zip"
                                           value={zip}
                                           onChange={(e) => setZip(e.target.value)}/>
                                    <label htmlFor="user_zip">Enter Your Zip Code:</label>
                                </div>
                                <div className="input-field col s12">
                                    <input type="password" id="pass" name="pass"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                    <label htmlFor="pass">Enter Your Password</label>
                                    <p className="errorMsg"> {passwordError}</p>
                                    </div>
                                    <div className="input-field col s12">
                                    <label htmlFor="pass">Confirm Your Password</label>
                                    <input type="password" id="pass" name="pass"
                                           value={passwordConfirm}
                                           onChange={(e) => setPasswordConfirm(e.target.value)}/>
                                        <p className="errorMsg"> {passwordErrorConfirm}</p>
                                    </div>
                                <div className="col s12 center">
                                    <button className="btn" disabled={loading} onClick={(e) => handleSignUp(e)} type="button">Sign Up</button>
                                    <div className="sub-text">
                                        <span>Already have an account? <Link to="/Login">Log In</Link></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}