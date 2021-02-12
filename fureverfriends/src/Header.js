import React, {useEffect, useState, Component} from 'react';
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
            <a href="home.html">Home</a>
            <a href="listings.html">Adopt</a>
            <a>Rehome</a>
            <a>Pet Care</a>
            <a onClick={handleUserState}>{userState.logged_in ? "Log Out" : "Log In" }</a>
            <img src="\images\svg\notification.svg"/>
            <img src="\images\svg\message.svg"/>
        </div>
        </div>
    )
}