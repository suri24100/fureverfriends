import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import { Alert } from "react-bootstrap"
import {Link} from "react-router-dom";
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
            document.getElementById('email').classList.remove("invalid");
            setLoading(true);
            await resetPassword(email);
            clearInputs();
            setMessage("Check your inbox for further instructions");
        }catch(err) {
            clearErrors();
            setError("Failed to reset password");
            if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
                setEmailError("Account not found.");
                document.getElementById('email').classList.add("invalid");
            }
        }

        setLoading(false);

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
                            <h3 className="col s12">Password Reset</h3>
                        </div>
                        <form onSubmit={handleResetPassword} className="center">
                                <div className="input-field col s12">
                                    <input type="email" id="email" name="email" className="validate"
                                       value = {email}
                                       onChange ={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="email">Enter Your Email Address:</label>
                                    <p className="helper-text left-align">{emailError}</p>
                                </div>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <div className="col s12 center">
                                    <button disabled = {loading} className="btn">Reset Password</button>
                                    <div className="sub-text">
                                        <Link to="/Login">Login</Link>
                                        <br/>
                                        <span>Need to create an account? <Link to="/CreateAccount">Sign Up</Link></span>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
