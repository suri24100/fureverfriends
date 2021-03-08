import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/style.css';
import './css/home.css';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {firestore} from "./ffdb";



export default function UserProfile() {
const [userInfo, setuserInfo] = useState({ //setstate is async
    userID : " ",
    userName : " ",
    userLocation : " ",  //address, street, zip, city, state
    userPhoneNum : " ",
    userAccountType : " ",
    userBio : " "
});

function handleinput (props){ //access to input that calls it
    const id = props.target.id
    const value = props.target.value //value vs valueOf
    // console.log(id)
    // console.log(value)
    setuserInfo({...userInfo, [id]:value})
    console.log(userInfo)
}
function saveuserprofile (){
    firestore.collection("UserInfo")
        .add(userInfo)//statevariaABLE
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
                    <div >
                        <a href="msg">Messages</a>
                        <a href="ntf">Notifications</a>
                        <a href="yl">Your Listings</a>
                        <a href="information">Account Info</a>
                        <a href="ss">Safe Spawts</a>
                        <a href="favs">Favorites</a>
                    </div>
                </div>


                <div className="col s12 m9" href="information">
                <div>
                    <div className="userinfoform">
                        <form id="userinfo">
                            <div id="username">
                                <label htmlFor="name">User name: </label>
                                <input type="text" id="userID" name="user_uname" onChange={handleinput}/>
                            </div>
                            <div id="username">
                                <label For="name">Name: </label>
                                <input type="text" id="name" name="user_name"/>
                            </div>

                            <br/>
                                <div id="userlocation">
                                    <label For="location">Location: </label>
                                    <input type="text" id="location" name="user_loc"/>
                                </div>
                                <br/>
                            <div id="usernumber">
                                <label htmlFor="mail">Phone Number: </label>
                                <input type="email" id="mail" name="user_email"/>
                            </div>
                            <br/>
                            <div id="useraccount">
                                <label For="accounts"> Account Type: </label>
                                <select name="accounttype" id= "accounts" >
                                    <option value="adopter"> Adopter</option>
                                    <option value="petowner"> Pet Owner</option>
                                </select>
                            </div>
                            <br/>
                                <div id="userbio">
                                    <label For="aboutme">About Me: </label>
                                    <textarea id="aboutme" name="user_message"></textarea>
                                </div>
                                <br/>
                        </form>
                        <button onClick={saveuserprofile}> Save Changes</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

