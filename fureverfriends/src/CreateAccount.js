import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link, useHistory} from "react-router-dom";
import db from './ffdb';
import {useAuth} from './AuthContext';

export default function CreateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorConfirm, setPasswordErrorConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const history = useHistory();

    const clearInputs = () =>{
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    }
    const clearErrors = () => {
        setError('');
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

        try {
            clearErrors();
            setLoading(true);
            await signup(email, password);
            clearInputs();
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
                    <br></br>
                    <h3 className="subH">Sign Up</h3>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <div className="form-wrap" id="log-in-form">
                        <form onSubmit={handleSignUp} className="account-form">

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
    )
}