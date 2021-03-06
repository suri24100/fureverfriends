import React, {useEffect, useState, Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import notification_icon from "./images/svg/notification.svg";
import messages_icon from "./images/svg/message.svg";
import M from "materialize-css";
import './css/style.css';
//need this for changing log in to log out in nav
import { useAuth } from "./AuthContext";
import {firestore} from "./ffdb";

export default function Header() {

    const [error, setError] = useState('');
    const { currentUser, logout, USER, handleClearUSER, setUSER} = useAuth();
    const [loading, setLoading] = useState(false);

    // loading has been initialized or changed, check for user info
    useEffect(() => {
        M.AutoInit();
        if(currentUser && USER.username === ""){
            getUser();
        }
    })


    async function handleLogOut()
    {
        setError("");

        try {
            await logout();
            handleClearUSER();
        } catch {
            setError("Failed to log out");
        }
    }

    async function getUser()
    {
        const snapshot = await firestore.collection("UserInfo")
            .where("email", "==", currentUser.email).get();
        setUSER(snapshot.docs[0].data());
    }

    return (
        <div>
            <div className="hdr-wrap hide-on-med-and-down">
                <div className="logo">
                    <Link to="/"><h2>Furever Friends</h2></Link>
                </div>
                <div className="primary-menu">
                    <Link to="/listings">Adopt</Link>
                    <Link to="/findahome">Rehome</Link>
                    <Link to="/quiz">Get Matched</Link>
                    {currentUser ? <Link to="/" onClick={handleLogOut}>Log Out</Link> : <Link to="/login">Log In</Link> }
                    {!currentUser ? <Link to="/create-account">Sign Up</Link> : <></> }
                    {currentUser ? <Link to="/account-info">{USER.username}</Link> : <></>}
                    {currentUser ? <Link className="header-icon" to="/my-matches">
                        <i className="material-icons">favorite</i>
                        {USER.new_notifications && USER.new_notifications.length > 0 ? <span className="new badge">{USER.new_notifications.length}</span> : ""}
                    </Link>
                        : <></>}
                </div>
            </div>
            <div className="navbar hide-on-large-only">
                <nav className="mobile-menu-wrapper nav-wrapper">
                    <div className="container">
                        <a href="#" className="sidenav-trigger" data-target="mobile-links" id="sidebarTrigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <Link to="/" className="brand-logo right">Furever Friends</Link>
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
                <li><Link to="/quiz"><span>Get Matched</span></Link></li>
                <li>{currentUser ? <Link to="/" onClick={handleLogOut}><span>Log Out</span></Link> : <Link to="/login"><span>Log In</span></Link> }</li>
                {!currentUser ? <li><Link to="/create-account">Sign Up</Link></li> : <></> }
                {currentUser && <li><Link to="/account-info"><span>My Account</span></Link></li>}
                </div>
            </ul>
        </div>
    )
}
