import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/signing.css';
import {Link} from "react-router-dom";
import {useAuth} from './AuthContext';



export default function CreateAccountConfirmation(){
    const {USER} = useAuth();

    return (
        <div className="create-account-body">
            <div className="signing-banner-wrap">
            </div>
            <div className="create-account confirmation">
                <div className="row">
                    <div className="col s12 m7 l5 form-box right">
                        <div className="row logo-wrap center valign-wrapper">
                            <img src="paw-green.svg"/>
                            <h3>Furever Friends</h3>
                            <img src="paw-green.svg"/>
                        </div>
                        <div className="row center">
                            <h3 className="col s12">Congratulations!</h3>
                        </div>
                        <div className="form-wrap">
                            <p>Your account has been created!</p>
                            <p>You can now favorite pets, message others, get alerts for new match and application statuses.
                                The email registered to your account is {USER.email}. For more information regarding
                                your account, click on the My Account button below
                            </p>
                            <div className="center">
                                <Link className="btn-large" to="/UserProfile">My Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
