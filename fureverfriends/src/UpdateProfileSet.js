// import React, {useEffect, useState} from "react";
// import Header from "./Header";
// import './css/style.css';
// import './css/home.css';
// import Footer from "./Footer";
// import {Link} from "react-router-dom";
// import ffdb, {firestore} from "./ffdb";
// import {useAuth} from "./AuthContext";
//
//
// export default function UserProfileRead() {
//
//     const [userInfo, setuserInfo] = useState({//setstate is async|| make object calls here from constants.js
//         userID : {currentUser:userInfo},//currentUser.uid, //user id should be givennnnnn -- primary key
//         userName :{currentUser:userInfo},
//         userLocation : {currentUser:userInfo}, //zip
//         userPhoneNum : {currentUser:userInfo},
//         userAccountType :{currentUser:userInfo},
//         userBio : {currentUser:userInfo}
//     });
//
//     function handleinput (props){ //access to input that calls it
//         const id = props.target.id
//         const value = props.target.value //value vs valueOf
//         // console.log(id)
//         // console.log(value)
//         setuserInfo({...userInfo, [id]:value})
//         console.log(userInfo)
//
//     }
//     function saveuserprofile (){
//         firestore.collection("UserInfo")
//             .add(userInfo)//statevariaABLE
//             .then((docRef) => {
//                 console.log("Document written with ID: ", docRef.id);
//             })
//             .catch((error) => {
//                 console.error("Error adding document: ", error);
//             });
//     }
//
//     const onSubmit = e =>{
//         e.preventDefault()
//         ffdb.collection("UserProfile").set({
//             userID: " ",
//             userName: " ",
//             userLocation: " ",
//             userPhoneNum: " ",
//             userAccountType: " ",
//             userBio: " ",
//         })
//             .then(() => setuserInfo() ) //this needs to return the objects int the constants.js
//     }
// //on submit: when the user clicks save after adding values to the input field,
//     //the input values are supposed to overwrite the existing values in the database
//     const deleteVal = (id) =>{
//         ffdb.collection("UserProfile").doc(id).delete()
//     }
//
//
//     return (
//         <div className="actionsnav">
//
//             <div className="listings-banner-wrap">
//                 <Header/>
//                 <div className="listings-banner-img-wrap"></div>
//             </div>
//
//             <div className = "container">
//                 <div className="row">
//                     <div className="col s12 m3">
//                         <div >
//                             <a href="msg">Messages</a>
//                             <a href="ntf">Notifications</a>
//                             <a href="yl">Your Listings</a>
//                             <a href="information">Account Info</a>
//                             <a href="ss">Safe Spawts</a>
//                             <a href="favs">Favorites</a>
//                         </div>
//                     </div>
//
//
//                     <div className="col s12 m9" href="information">
//                         <div>
//                             <div className="userinfoform">
//                                 <form id="userinfo">
//                                     <div id="username">
//                                         <label htmlFor="name">User name: </label>
//                                         <input type="text" id="userID" name="user_uname" defaultValue={userInfo} />
//                                     </div>
//                                     <div id="username">
//                                         <label htmlFor="name">Name: </label>
//                                         <input type="text" id="userName" name="user_name" defaultValue={userInfo} />
//                                     </div>
//
//                                     <br/>
//                                     <div id="userlocation">
//                                         <label htmlFor="location">Location: </label>
//                                         <input type="text" id="userLocation" name="user_loc" defaultValue={userInfo} />
//                                     </div>
//                                     <br/>
//                                     <div id="usernumber">
//                                         <label htmlFor="mail">Phone Number: </label>
//                                         <input type="email" id="userPhoneNum" name="user_email" defaultValue={userInfo} />
//                                     </div>
//                                     <br/>
//                                     <div id="useraccount">
//                                         <label htmlFor="accounts" defaultValue={userInfo}> Account Type: </label>
//                                         <select name="userAccountType" id="accounts">
//                                             <option value="userAccountType"> Adopter</option>
//                                             <option value="userAccountType"> Pet Owner</option>
//                                         </select>
//                                     </div>
//                                     <br/>
//                                     <div id="userbio">
//                                         <label htmlFor="aboutme">About Me: </label>
//                                         <textarea id="userBio" name="user_message" defaultValue={currentUser} onChange={handleinput}></textarea>
//                                     </div>
//                                     <br/>
//                                 </form>
//                                 <button onClick={saveuserprofile}> Save Changes</button>
//                                 <button onClick={deleteVal}> Save Changes</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
