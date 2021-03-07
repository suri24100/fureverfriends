import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link, useHistory} from "react-router-dom";
import db from './ffdb';
import {useAuth} from './AuthContext';

export default function CreateAccount(){
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const history = useHistory();

    const clearInputs = () =>{
        setEmail('');
        setPassword('');
    }
    const clearErrors = () => {
        setError('');
        setEmailError('');
        setPasswordError('');
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            clearErrors();
            setLoading(true);
            await login(email, password);
            clearInputs();
            history.push("/Home")
        }catch(err) {
            clearErrors();
            setError("Failed to log in");
            if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
                    setEmailError(err.message);
                }
            if (err.code === "auth/wrong-password") {
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
                    <h3 className="subH">Log In</h3>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <div className="form-wrap" id="log-in-form">
                        <form onSubmit={handleLogin}className="account-form">
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

                            <div className="bottom-info">
                                <div className="btn-wrap default">
                                    <button disabled = {loading} className="signing-btn">Log In</button>
                                </div>
                            </div>
                        </form>
                        <div className="bottom-info">
                            <div className="belowbutton-subheading">
                                <span>Need to create an account?<Link to="/CreateAccount">Sign Up</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}