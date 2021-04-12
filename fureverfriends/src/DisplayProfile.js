import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/style.css';
import './css/home.css';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {firestore} from "./ffdb";
import {useAuth} from "./AuthContext";
import {Alert} from "react-bootstrap";
import M from "materialize-css";


export default function DisplayProfile() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })

    async function DisplayProfile (e){
        e.preventDefault();

        const snapshot = await firestore.collection("UserInfo").where("username", "==", USER.username).get();
        if(!snapshot.empty && USER.username !== username)
        {
            setLoading(false);
        }

        try {
            setLoading(true);
        }catch(err) {
            setLoading(true);
        }

        setLoading(false);
    }


    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">
                <div className="listings-banner-img-wrap"></div>

            </div>



            <div className = "container">
                <div className="row">
                    <br/>
                    <br/>
                    <div className="col s12 m3" id = "sidenav">
                        <div class = "collection">
                            <a href="msg" class = "collection-item">Messages</a>
                            <a href="ntf" class ="collection-item">Notifications</a>
                            <a href="yl" class = "collection-item">Your Listings</a>
                            <a href="information" class = "collection-item">Account Info</a>
                            <a href="ss" class= "collection-item">Safe Spawts</a>
                            <a href="favs" class = "collection-item">Favorites</a>
                        </div>
                    </div>

                    <div className="col s12 m9" href="information">
                        <div className="collection">
                            <ul>
                                <li><span className="title">User Name :</span> {USER.username}</li>
                                <li><span className="title">First Name :</span> {USER.first_name}</li>
                                <li><span className="title">Last Name :</span> {USER.last_name}</li>
                                <li><span className="title">Email :</span> {USER.email}</li>
                                <li><span className="title">Phone Number :</span> {USER.phone_number}</li>
                                <li><span className="title">Account Type :</span> {USER.account_type}</li>
                                <li><span className="title">Location :</span> {USER.Location}</li>
                                <li><span className="title">Bio :</span> {USER.user_bio}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

