import React, {useEffect, useState, Component} from 'react';
import {Link} from "react-router-dom";
import notification_icon from "./images/svg/notification.svg";
import messages_icon from "./images/svg/message.svg";
import './css/style.css';
//need this for changing log in to log out in nav

export default function Header() {
    //everything has to be in one div
    //put the \> after image
    //change class to className
    const [userState, setUserState] = useState( {
            logged_in: true
        });
    function handleUserState() {
        let value = !userState.logged_in;
        setUserState({
			...userState,
			logged_in : value
		});
    }

    return ( 
        <div className="hdr-wrap">
        <div className="logo">
            <h2>Furever Friends</h2>
        </div>
        <div className="primary-menu">
            <Link to="/">Home</Link>
            <Link to="/listings">Adopt</Link>
            <Link to="/findahome">Rehome</Link>
            <Link to="/petcare">Pet Care</Link>
            <a onClick={handleUserState}>{userState.logged_in ? <Link to="/logout">Log Out</Link> : <Link to="/login">Log In</Link> }</a>
            <img src={notification_icon} alt="Notifications"/>
            <img src={messages_icon} alt="Messages"/>
        </div>
        </div>
    )
}