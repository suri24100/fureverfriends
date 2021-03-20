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


export default function DisplayUserProfile() {
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
            {/*in order for this to work, would need to remove <Header/> in app.js*/}

            <div className="listings-banner-wrap">
                <Header/>
            </div>



            <div className = "container">
                <div className="row">
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
                            <br/>
                            <div>
                                <span className="title " style={{color: " #379683"}}>User Name : </span> {USER.username}
                            </div>

                            <div>
                                <div>

                                    <span className="title" style={{color: " #379683"}} >First Name : </span> {USER.first_name}
                                </div>

                                <div>
                                    <span className="title" style={{color: " #379683"}} >Last Name : </span> {USER.last_name}
                                </div>
                            </div>


                            <div>
                                <span className="title" style={{color: " #379683"}} >Email: </span> {USER.email}
                            </div>

                            <div>
                                <span className="title" style={{color: " #379683"}} > Phone Number: </span> {USER.phone_number}
                            </div>

                            <div>
                                <span className="title" style={{color: " #379683"}} > Account Type: </span> {USER.account_type}
                            </div>

                            <div>
                                <span className="title" style={{color: " #379683"}} > Location: </span> {USER.user_zip}
                            </div>


                            <div>
                                <span className="title" style={{color: " #379683"}} > Bio: </span> {USER.user_bio}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

