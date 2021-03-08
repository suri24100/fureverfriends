import React, {useEffect, useState, Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import notification_icon from "./images/svg/notification.svg";
import messages_icon from "./images/svg/message.svg";
import './css/style.css';
//need this for changing log in to log out in nav
import { useAuth } from "./AuthContext";
import {firestore} from "./ffdb";

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
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')





    async function handleLogOut()
    {
        setError("");

        try {
            await logout();
            //history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }

    // async function getUsername()
    // {
    //     try {
    //         setEmail(currentUser.email)
    //         setLoading(true);
    //         const snapshot = await firestore.collection("UserInfo").where("Email", "==", email).get();
    //         console.log(snapshot.docs[0].data()["Username"]);
    //         setLoading(false);
    //     }
    //     catch{
    //
    //     }
    //     return snapshot.docs[0].data()["Username"];
    // }



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
            {currentUser ? <Link to="/logout" onClick={handleLogOut}>Log Out</Link> : <Link to="/login">Log In</Link> }
            <img src={notification_icon} alt="Notifications"/>
            <img src={messages_icon} alt="Messages"/>
            {currentUser ? <Link disable = {loading} to="/UserProfile">{currentUser.email}</Link> : <></>}
        </div>
        </div>
    )
}