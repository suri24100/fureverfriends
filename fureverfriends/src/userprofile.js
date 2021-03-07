import React from "react";
import Header from "./Header";
import './css/style.css';
import './css/home.css';
import Footer from "./Footer";
import {Link} from "react-router-dom";


export default function userprofile() {


    return (
        <div className="actionsnav">
            <Header/>

            <div className="column2">
                <div className="vertical-menu">
                    <a href="msg">Messages</a>
                    <a href="ntf">Notifications</a>
                    <a href="yl">Your Listings</a>
                    <a href="information">Account Info</a>
                    <a href="ss">Safe Spawts</a>
                    <a href="favs">Favorites</a>
                </div>
            </div>



            <div className="column1" href="information">
                <div>
                    <div className="userinfoform">
                        <form id="userinfo">
                            <div id="username">
                                <label htmlFor="name">Name: </label>
                                <input type="text" id="name" name="user_name"/>
                            </div>

                            <br>
                                <div id="userlocation">
                                    <label htmlFor="location">Location: </label>
                                    <input type="text" id="location" name="user_name"/>
                                </div>
                                <br>
                                    <div id="usernumber">
                                        <label htmlFor="mail">Phone Number: </label>
                                        <input type="email" id="mail" name="user_email"/>
                                    </div>
                                    <br>
                                        <div id="useraccount">
                                            <label htmlFor="accounts"> Account Type: </label>
                                            <select name="accounttype" id=accounts>
                                                <option value="adopter"> Adopter</option>
                                                <option value="petowner"> Pet Owner</option>
                                            </select>
                                        </div>
                                        <br>
                                            <div id="userbio">
                                                <label htmlFor="aboutme">About Me: </label>
                                                <textarea id="aboutme" name="user_message"></textarea>
                                            </div>
                                            <br>
                        </form>
                        <button> Save Changes</button>
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
    )
}

