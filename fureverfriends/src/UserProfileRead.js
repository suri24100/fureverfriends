import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/style.css';
import './css/home.css';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import ffdb, {firestore} from "./ffdb";
import {useAuth} from "./AuthContext";


export default function UserProfileRead() {
    const {currentUser} = useAuth()



    const [userInfo, setuserInfo] = useState({//setstate is async
        userID : {currentUser:userInfo},//currentUser.uid, //user id should be givennnnnn -- primary key
        userName :{currentUser:userInfo},
        userLocation : {currentUser:userInfo}, //zip
        userPhoneNum : {currentUser:userInfo},
        userAccountType :{currentUser:userInfo},
        userBio : {currentUser:userInfo}
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
    const docRef = ffdb.collection("UserInfo").doc("userId");

// Valid options for source are 'server', 'cache', or
// 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
// for more information.
    const getOptions = {
        source: 'cache'
    };

// Get a document, forcing the SDK to fetch from the offline cache.
    docRef.get(getOptions).then((doc) => {
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        console.log("Cached document data:", doc.data());
    }).catch((error) => {
        console.log("Error getting cached document:", error);
    });

    class userInformation {
        constructor (userName, userID, userAccountType, userBio, userLocation, userPhoneNum) {
            this.userName = userName;
            this.userID = userID;
            this.userAccountType = userAccountType;
            this.userBio = userBio;
            this.userLocation = userLocation;
            this.userPhoneNum = userPhoneNum
        }
        toString() {
            return this.userName + ',' + this.userID+ ',' +this.userAccountType + ',' + this.userBio + ',' + this.userLocation + ',' + this.userPhoneNum;
        }
    }

// Firestore data converter
    const userinfoConverter = {
        toFirestore: function(UserInfo) {
            return {
                userName: UserInfo.username,
                userID: UserInfo.userID,
            };
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            return new userInformation(data.userName, data.userID);
        }
    };

    ffdb.collection("UserInfo").doc(" ")
        .withConverter(userinfoConverter)
        .get().then((doc) => {
        if (doc.exists){
            // Convert to City object
            const UserInfo = doc.data();
            // Use a City instance method
            console.log(UserInfo.toString());
        } else {
            console.log("No such document!");
        }}).catch((error) => {
        console.log("Error getting document:", error);
    });

    ffdb.collection("UserInfo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });

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
                                        <input type="text" id="userID" name="user_uname" defaultValue={userInfo} />
                                    </div>
                                    <div id="username">
                                        <label htmlFor="name">Name: </label>
                                        <input type="text" id="userName" name="user_name" defaultValue={userInfo} />
                                    </div>

                                    <br/>
                                    <div id="userlocation">
                                        <label htmlFor="location">Location: </label>
                                        <input type="text" id="userLocation" name="user_loc" defaultValue={userInfo} />
                                    </div>
                                    <br/>
                                    <div id="usernumber">
                                        <label htmlFor="mail">Phone Number: </label>
                                        <input type="email" id="userPhoneNum" name="user_email" defaultValue={userInfo} />
                                    </div>
                                    <br/>
                                    <div id="useraccount">
                                        <label htmlFor="accounts" defaultValue={currentUser} onChange={userInfo}> Account Type: </label>
                                        <select name="userAccountType" id="accounts">
                                            <option value="userAccountType"> Adopter</option>
                                            <option value="userAccountType"> Pet Owner</option>
                                        </select>
                                    </div>
                                    <br/>
                                    <div id="userbio">
                                        <label htmlFor="aboutme">About Me: </label>
                                        <textarea id="userBio" name="user_message" defaultValue={currentUser} onChange={handleinput}></textarea>
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
