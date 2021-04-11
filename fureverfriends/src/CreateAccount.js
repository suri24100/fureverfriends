import React, {useEffect, useLayoutEffect, useState, Component} from 'react';
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
    useEffect( () =>{
        M.AutoInit();
    })

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    // const [username, setUsername] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [accountType, setAccountType] = useState('');
    // const [zip, setZip] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorConfirm, setPasswordErrorConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, USER, handleSetUSER, currentUser } = useAuth();
    const history = useHistory();


    const clearInputs = () =>{
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
        document.getElementById("username").classList.remove("invalid");
        document.getElementById("first_name").classList.remove("invalid");
        document.getElementById("last_name").classList.remove("invalid");
        document.getElementById("user_zip").classList.remove("invalid");
        document.getElementById("email").classList.remove("invalid");
        document.getElementById("pass1").classList.remove("invalid");
        document.getElementById("pass2").classList.remove("invalid");
    }

    function handleOnChange(e){
        let id = e.target.id;
        const value = e.target.value;
        if(id === "pass1" || id === "pass2") {id = "pass"}
        handleSetUSER(id,value);
    }

    async function handleSignUp(e) {
        e.preventDefault();
        clearErrors();
        if(USER.username === ""){
            document.getElementById("username").classList.add("invalid");
            setUsernameError("Required")
        }
        if(USER.first_name === ""){
            document.getElementById("first_name").classList.add("invalid");
        }
        if(USER.last_name === ""){
            document.getElementById("last_name").classList.add("invalid");
        }
        if(USER.user_zip === ""){
            document.getElementById("user_zip").classList.add("invalid");
        }
        if(password === ""){
            document.getElementById("pass1").classList.add("invalid");
            setPasswordError("Required");
        }
        if(passwordConfirm === ""){
            document.getElementById("pass2").classList.add("invalid");
            setPasswordErrorConfirm("Required");
        }
        if(password !== passwordConfirm)
        {
            setLoading(false);
            return setPasswordErrorConfirm("Passwords do not match");
        }
        const snapshot = await firestore.collection("UserInfo").where("username", "==", USER.username).get();
        if(!snapshot.empty)
        {
            setLoading(false);
            return setUsernameError('Username already taken, please choose another one.');
        }
        try {
            setLoading(true);
            await signup(USER.email, password);
            saveUser();
            clearInputs();
            history.push('/CreateAccountConfirmation');
        }catch(err) {
            setError("Failed to create an account");
            if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                setEmailError("Invalid email");
                document.getElementById("email").classList.add("invalid");
            }
            if (err.code === "auth/weak-password") {
                setPasswordError(err.message);
                document.getElementById("pass1").classList.add("invalid");
                document.getElementById("pass2").classList.add("invalid");
            }
        }

        setLoading(false);
    }

    function saveUser(){
        firestore.collection("UserInfo").doc(USER.email).set(USER)
            .then(() => {
               // success
            });
    }

    return (
        <div className="create-account-body">
            <div className="signing-banner-wrap">
            </div>
            <div className="create-account">
                <div className="row">
                    <div className="col s12 m7 l5 form-box right">
                        <div className="row logo-wrap center valign-wrapper">
                            <img src="paw-green.svg"/>
                            <h3>Furever Friends</h3>
                            <img src="paw-green.svg"/>
                        </div>
                        <div className="row center">
                            <h3 className="col s12">Sign Up</h3></div>
                        <form>
                            <div className="row">
                                <div className="input-field col s12">
                                    <select id="account_type" onChange={handleOnChange}>
                                        <option value="Adopter">Adopter</option>
                                        <option value="Private Owner">Private Owner</option>
                                        <option value="Organization">Organization</option>
                                    </select>
                                    <label>I am signing up as:</label>
                                </div>
                                <div className="input-field col s12">
                                    <input type="text" id="username" name="username" className="validate"
                                           value={USER.username}
                                           onChange={handleOnChange}/>
                                   <label htmlFor="username">Username</label>
                                    <span className="helper-text left-align" data-error={usernameError}></span>
                                </div>
                                <div className="input-field col s12">
                                    <input type="text" id="first_name" name="first_name" className="validate"
                                           value={USER.first_name}
                                           onChange={handleOnChange}/>
                                    <label htmlFor="first_name">First Name</label>
                                    <span className="helper-text left-align" data-error="Required"></span>
                                </div>
                                <div className="input-field col s12">
                                    <input type="text" id="last_name" name="last_name" className="validate"
                                           value={USER.last_name}
                                           onChange={handleOnChange}/>
                                    <label htmlFor="last_name">Last Name</label>
                                    <span className="helper-text left-align" data-error="Required"></span>
                                </div>
                                <div className="input-field col s12">
                                    <input type="email" id="email" name="email" className="validate"
                                           value={USER.email}
                                           onChange={handleOnChange}/>
                                           <label htmlFor="email">Email Address</label>
                                    <span className="helper-text left-align" data-error={emailError}></span>
                                </div>
                                <div className="input-field col s12">
                                    <input type="tel" id="phone_number" name="phone_number"
                                           value={USER.phone_number}
                                           onChange={handleOnChange}/>
                                    <label htmlFor="phone_number">Phone Number (Optional)</label>
                                </div>
                                <div className="input-field col s12">
                                    <input type="number" id="user_zip" name="user_zip" className="validate"
                                           value={USER.user_zip}
                                           onChange={handleOnChange}/>
                                    <label htmlFor="user_zip">Zip Code</label>
                                    <span className="helper-text left-align" data-error="Required"></span>
                                </div>
                                <div className="input-field col s12">
                                    <input type="password" id="pass1" name="pass" className="validate"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                    <label htmlFor="pass">Enter Your Password</label>
                                    <span className="helper-text left-align" data-error={passwordError}></span>
                                    </div>
                                    <div className="input-field col s12">
                                    <label htmlFor="pass">Confirm Your Password</label>
                                    <input type="password" id="pass2" name="pass" className="validate"
                                           value={passwordConfirm}
                                           onChange={(e) => setPasswordConfirm(e.target.value)}/>
                                        <span className="helper-text left-align" data-error={passwordErrorConfirm}></span>
                                    </div>
                                <div className="col s12 center">
                                    {error && <Alert variant="danger">{error}</Alert>}
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
