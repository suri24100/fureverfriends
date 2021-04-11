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
            document.getElementById('email').classList.remove("invalid");
            document.getElementById('pass').classList.remove("invalid");
            setLoading(true);
            await login(email, password);
            await getUser();
            clearInputs();
            history.push("/Home")
        }catch(err) {
            clearErrors();
            setError("Failed to log in");
            if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
                    setEmailError("No account found with this email.");
                    document.getElementById('email').classList.add("invalid");
                }
            if (err.code === "auth/wrong-password") {
                    setPasswordError("Invalid password.");
                    document.getElementById('pass').classList.add("invalid");
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
                    <div className="col s12 m7 l5 form-box right">
                        <div className="row logo-wrap center valign-wrapper">
                            <img src="paw-green.svg"/>
                            <h3>Furever Friends</h3>
                            <img src="paw-green.svg"/>
                        </div>
                        <div className="row center">
                            <h3 className="col s12">Welcome Back!</h3>
                        </div>
                            <form onSubmit={handleLogin} className="center">
                                <div className="input-field col s12">
                                    <input type="email" id="email" name="email" className="validate"
                                           value = {email}
                                           onChange ={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="email">Enter Your Email Address:</label>
                                    <p className="helper-text left-align">{emailError}</p>
                                </div>
                                <div className="input-field col s12">
                                    <input type="password" id="pass" name="pass" className="validate"
                                           value = {password}
                                           onChange ={(e) => setPassword(e.target.value)}/>
                                    <label htmlFor="pass">Enter Your Password</label>
                                    <p className="helper-text left-align"> {passwordError}</p>
                                </div>
                                {error && <Alert variant="danger">{error}</Alert>}
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
