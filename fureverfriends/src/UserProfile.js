import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/style.css';
import './css/home.css';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import ffdb, {firestore} from "./ffdb";

import {useAuth} from "./AuthContext";
import db from "./ffdb";


// function deleteVal() {
//     this.deleteVal = this.delete.bind(this);
// }


export default function UserProfile() {
    const {USER, handleSetUSER, setUSER} = useAuth()
    const [userInfo, setuserInfo] = useState({ //setstate is async
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        account_type: "",
        user_zip: "",
        user_bio: "",
        pet_listings: [],
        favorites: [],
        longitude: "",
        latitude : ""
});



function handleinput (props){ //access to input that calls it
    const id = props.target.id
    const value = props.target.value //value vs valueOf
    // console.log(id)
    // console.log(value)
    setuserInfo({...userInfo, [id]:value})
    console.log(userInfo)
}

//DON'T USE ADD, USE UPDATE - we don't want to add new users, just update them.
    function saveuserprofile (){
        firestore.collection('UserInfo').doc(USER.username).update({ //pass documents from the object.
            // username : 'avocoder',
            // first_name: ' ',
            // last_name: '',
            // email: '',
            // phone_number: '',
            // user_zip: '',
            // user_bio: ''
            // username: USER.username,
            // first_name: USER.first_name,
            // last_name: USER.last_name,
            // email: USER.email,
            // phone_number: USER.phone_number,
            // account_type: USER.account_type,
            // user_zip: USER.user_zip,
            // user_bio: USER.user_bio,
        // "username": {
            "first_name": "USER.first_name",
            "last_name": "USER.last_name",
            "email": "USER.email",
            "phone_number":  "USER.phone_number",
            "account_type": "USER.account_type",
            "user_zip": "USER.user_zip",
            "user_bio": "USER.user_bio"

        })//statevariaABLE
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}




    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">
                <Header/>
                <div className="listings-banner-img-wrap"></div>
            </div>

            <div className = "container">
                <div className="row">
                <div className="col s12 m3">
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
                        <div>
                            <div className="userinfoform">
                                <form id="userinfo">
                                    <br/>
                                    <div className="input-field col s12">
                                        <input type="text" id="username" name="username"
                                               defaultValue={USER.username}
                                               onChange={handleinput}/>
                                        <label htmlFor="username">Enter New Username</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="text" id="first_name" name="first_name"
                                               defaultValue={USER.first_name}
                                               onChange={handleinput} />
                                        <label htmlFor="first_name">Enter Your First Name:</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="text" id="last_name" name="last_name"
                                               defaultValue={USER.last_name}
                                               onChange={handleinput} />
                                        <label htmlFor="last_name">Enter Your Last Name:</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="email" id="email" name="email"
                                               defaultValue={USER.email}
                                               onChange={handleinput} />
                                        <label htmlFor="email">Enter Your Email Address:</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="tel" id="phone_number" name="phone_number"
                                               defaultValue={USER.phone_number}
                                               onChange={handleinput} />
                                        <label htmlFor="phone_number">Enter Your Phone Number:</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <select id="account_type" onChange={handleinput} >
                                            <option value="Adopter">Adopter</option>
                                            <option value="Private Owner">Private Owner</option>
                                            <option value="Organization">Organization</option>
                                        </select>
                                        <label>I am signing up as:</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="number" id="user_zip" name="user_zip"
                                               defaultValue={USER.user_zip}
                                               onChange={handleinput} />
                                        <label htmlFor="user_zip">Enter Your Zip Code:</label>
                                    </div>

                                    <br/>
                                    <div id="userbio">
                                        <label htmlFor="aboutme">About Me: </label>
                                        <textarea id="userBio" name="user_message" onChange={handleinput}></textarea>
                                    </div>
                                    <br/>
                                </form>
                                <button onClick={handleinput} > Save Changes</button>
                                {/*<button onClick={deleteVal}> Delete Profile</button>*/}
                            </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

