import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link, useHistory} from "react-router-dom";
import {useAuth} from './AuthContext';
import {firestore} from "./ffdb";



export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, USER, handleSetUSER, setUSER } = useAuth();
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

    async function getUser(){

            const snapshot = await firestore.collection("UserInfo")
                .where("email", "==", email).get();
        setUSER(snapshot.docs[0].data());

        console.log(USER);

    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            clearErrors();
            setLoading(true);
            await login(email, password);
            await getUser();
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

    return (
        <div className="create-account-body">
            <div className="signing-banner-wrap">
            </div>
            <div className="create-account container">
                <div className="row">
                    <div className="col s12 m5 offset-m7 form-box">
                        <div className="row logo-wrap center">
                            <img src="paw-green.svg"/>
                            <h3>Furever Friends</h3>
                            <img src="paw-green.svg"/>
                        </div>
                        <div className="row center">
                            <h3>Log In</h3></div>

                        {error && <Alert variant="danger">{error}</Alert>}

                            <form onSubmit={handleLogin} className="center">

                                <h5>Welcome Back!</h5>

                                <div className="input-field col s12">
                                    <input type="email" id="email" name="email"
                                           value = {email}
                                           onChange ={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="email">Enter Your Email Address:</label>
                                    <p className="errorMsg">{emailError}</p>
                                </div>
                                <div className="input-field col s12">
                                    <input type="password" id="pass" name="pass"
                                           value = {password}
                                           onChange ={(e) => setPassword(e.target.value)}/>
                                    <label htmlFor="pass">Enter Your Password</label>
                                    <p className = "errorMsg"> {passwordError}</p>
                                </div>
                                <div className="col s12 center">
                                    <button disabled = {loading} className="btn">Log In</button>
                                    <div className="sub-text">
                                        <Link to="/ForgotPassword">Forgot Password?</Link>
                                    </div>
                                    <div className="sub-text">
                                        <span>Need to create an account? <Link to="/CreateAccount">Sign Up</Link>
                                        </span>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}