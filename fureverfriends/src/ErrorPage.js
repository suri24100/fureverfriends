import React, {useEffect, useState, Component} from 'react';
import './css/404Page.css'
import {Link} from "react-router-dom";

export default function ErrorPage(){
    return (
        <div className="error-page">
            <div className="signing-banner-wrap">
            </div>
            <div className="error-contents">
                <div className="row">
                    <div className="col s12">
                        <div className="right message-contents">
                            <h2>Breaking Mews!</h2>
                            <p>Unfurtunately, this page does not exist.</p>
                            <Link className="btn-large" to="/">
                                <i className="material-icons left">arrow_back</i>
                                Click to go Home
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
