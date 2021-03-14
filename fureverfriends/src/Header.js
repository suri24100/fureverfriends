import React, {useEffect, useState, Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import notification_icon from "./images/svg/notification.svg";
import messages_icon from "./images/svg/message.svg";
import M from "materialize-css";
import './css/style.css';
//need this for changing log in to log out in nav
import { useAuth } from "./AuthContext";
import {auth, firestore} from "./ffdb";

export default function Header() {
    //everything has to be in one div
    //put the \> after image
    //change class to className
    // const [userState, setUserState] = useState( {
    //         logged_in: false
    //     });
    // function handleUserState() {
    //     let value = !userState.logged_in;
    //     setUserState({
	// 		...userState,
	// 		logged_in : value
	// 	});
    // }
    M.AutoInit();
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    // loading has been initialized or changed, check for user info
    useEffect(() => {
        if(currentUser && username === ''){
            getUsername();
        }
        console.log("Reloaded");
    })

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')


    async function handleLogOut()
    {
        setError("");

        try {
            await logout();
        } catch {
            setError("Failed to log out");
        }
    }

    async function getUsername()
    {
        setLoading(true);
        setEmail(currentUser.email)
        if(email){
            const snapshot = await firestore.collection("UserInfo")
                .where("Email", "==", email).get();
            await setUsername(snapshot.docs[0].data()["Username"]);
        }
        setLoading(false);
    }



    return (
        <div>
            <div className="hdr-wrap hide-on-med-and-down">
                <div className="logo">
                    <h2>Furever Friends</h2>
                </div>
                <div className="primary-menu">
                    <Link to="/">Home</Link>
                    <Link to="/listings">Adopt</Link>
                    <Link to="/findahome">Rehome</Link>
                    <Link to="/petcare">Pet Care</Link>
                    {currentUser ? <Link to="/Home" onClick={handleLogOut}>Log Out</Link> : <Link to="/login">Log In</Link> }
                    <img src={notification_icon} alt="Notifications"/>
                    <img src={messages_icon} alt="Messages"/>
                    {currentUser ? <Link disable = {loading} to="/UserProfile">{username}</Link> : <></>}
                </div>
            </div>
            <div className="navbar hide-on-large-only">
                <nav className="mobile-menu-wrapper nav-wrapper">
                    <div className="container">
                        <a href="#" className="sidenav-trigger" data-target="mobile-links" id="sidebarTrigger"> 
                            <i className="material-icons">menu</i>
                        </a>
                        <a href="#" className="brand-logo right">Furever Friends</a>
                    </div>
                </nav>
            </div>
    
            <ul className="mobile-menu sidenav hide-on-large-only" id="mobile-links">
                <div className="container">
                    <li className="side-logo">
                        <i className="material-icons">pets</i>
                        <span className="brand-name">Furever Friends</span>
                        <i className="material-icons">pets</i>
                    </li>
                </div>
                <div className="actual-menu">
                <li><Link to="/"><span>Home</span></Link></li>
                <li><Link to="/listings"><span>Adopt</span></Link></li>
                <li><Link to="/findahome"><span>Rehome</span></Link></li>
                <li><Link to="/petcare"><span>Pet Care</span></Link></li>
                <li>{currentUser ? <Link to="/Home" onClick={handleLogOut}><span>Log Out</span></Link> : <Link to="/login"><span>Log In</span></Link> }</li>
                <li><a href="#"><span>My Account</span></a></li>
                </div>
            </ul>
        </div>
    )
}