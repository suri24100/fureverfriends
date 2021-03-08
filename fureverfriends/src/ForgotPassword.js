import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link} from "react-router-dom";
import db from './ffdb';
import {useAuth} from './AuthContext';


export default function ForgotPassword(){
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const clearInputs = () =>{
        setEmail('');
        setMessage('');
    }
    const clearErrors = () => {
        setError('');
        setEmailError('');
    }

    async function handleResetPassword(e) {
        e.preventDefault();

        try {
            clearErrors();
            setLoading(true);
            await resetPassword(email);
            clearInputs();
            setMessage("Check your inbox for further instructions");
        }catch(err) {
            clearErrors();
            setError("Failed to reset password");
            if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
                setEmailError(err.message);
            }
        }

        setLoading(false);

    }


    const authListener = () => {
        db.auth().onAuthStateChanged(user =>{
            if(user) {
                clearInputs();
                console.log("The user is logged in");
            }
            else{
                console.log("The user is not logged in");
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
                    <h3 className="subH">Password Reset</h3>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}

                    <div className="form-wrap" id="log-in-form">
                        <form onSubmit={handleResetPassword}className="account-form">
                            <h2 className="welcome-back-heading">Welcome Back!</h2>

                            <label for="email">Enter Your Email Address:</label>
                            <input type="email" id="email" name="email"
                                   value = {email}
                                   onChange ={(e) => setEmail(e.target.value)}/>
                            <p className="errorMsg">{emailError}</p>

                            <div className="bottom-info">
                                <div className="btn-wrap default">
                                    <button disabled = {loading} className="signing-btn">Reset Password</button>
                                </div>
                            </div>
                        </form>
                        <div className="bottom-info">
                            <div className="belowbutton-subheading">
                                <center><Link to="/Login">Login</Link></center>
                            </div>
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