import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/displayprofile.css';
import './css/home.css';
import Footer from "./Footer";
import {Link} from "react-router-dom";
import {firestore} from "./ffdb";
import {useAuth} from "./AuthContext";
import {Alert} from "react-bootstrap";
import M from "materialize-css";


export default function UserProfile() {
    const {USER, handleSetUSER, setUSER, updateEmail, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })

    const clearErrors = () => {
        setError('');
        setUsernameError('');
        setEmailError('');
    }

    function handleInput (e){ //access to input that calls it
    const id = e.target.id;
    const value = e.target.value;
    handleSetUSER(id,value);
    console.log(USER);
    }

//DON'T USE ADD, USE UPDATE - we don't want to add new users, just update them.
    async function saveUserProfile (e){
        e.preventDefault();

        const snapshot = await firestore.collection("UserInfo").where("username", "==", USER.username).get();
        if(!snapshot.empty && USER.username !== username)
        {
            clearErrors();
            setLoading(false);
            return setUsernameError('Username already taken, please choose another one.');
        }

        try {
            clearErrors();
            setLoading(true);
            if(currentUser.email !== USER.email)
            {
                await updateEmail(USER.email);
            }
            updateUser();
            setError("Account was successfully updated!")
        }catch(err) {
            clearErrors();
            setError("Failed to create an account");
            if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                setEmailError(err.message);
            }
        }

        setLoading(false);
    }

    function updateUser(){
         firestore.collection('UserInfo').doc(currentUser.email).update(USER)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    function cancelchanges(){
        window.location.reload(false);
    }

    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">
                <Header/>
            </div>
            {/*in order for this to work, would need to remove <Header/> in app.js*/}

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
                        <div>
                            <div className="userinfoform">
                                <form id="userinfo"  className="col s12">
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {console.log(username)}

                                    {/*/!*test*!/*/}
                                    {/*<div className="input-field col s6">*/}
                                    {/*    <i className="material-icons prefix">account_circle</i>*/}
                                    {/*    <input id="icon_prefix" type="text" className="validate" />*/}
                                    {/*    <label htmlFor="icon_prefix">First Name : </label>*/}
                                    {/*</div>*/}
                                    {/*<div className="input-field col s6">*/}
                                    {/*    /!*<i className="material-icons prefix">account_circle</i>*!/*/}
                                    {/*    <input className="validate" defaultValue={USER.last_name}*/}
                                    {/*           onChange={handleInput} id="last_name" type="text" />*/}
                                    {/*    <label htmlFor="last_name"> Last Name : </label>*/}
                                    {/*</div>*/}

                                    {/*/!*test end *!/*/}


                                    <br/>

                                    <div className="input-field inline col s12">
                                        <i className="material-icons prefix">assignment_ind</i>

                                        <input  type="text" id="username" name="username"
                                               defaultValue={USER.username}
                                               onChange={handleInput}/>
                                        <label htmlFor="username">Enter New Username</label>
                                        <p className="errorMsg">{usernameError}</p>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input type="text" id="first_name" name="first_name"
                                               defaultValue={USER.first_name}
                                               onChange={handleInput}/>
                                        <label htmlFor="first_name">Enter Your First Name:</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input type="text" id="last_name" name="last_name"
                                               defaultValue={USER.last_name}
                                               onChange={handleInput}/>
                                        <label htmlFor="last_name">Enter Your Last Name:</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">email</i>
                                        <input type="email" id="email" name="email"
                                               defaultValue={USER.email}
                                               onChange={handleInput}/>
                                        <label htmlFor="email">Enter Your Email Address:</label>
                                        <p className="errorMsg">{emailError}</p>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">local_phone</i>
                                        <input type="tel" id="phone_number" name="phone_number"
                                               defaultValue={USER.phone_number}
                                               onChange={handleInput}/>
                                        <label htmlFor="phone_number">Enter Your Phone Number:</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">pets</i>
                                        <select id="account_type" onChange={handleInput}>
                                            <option value="Adopter">Adopter</option>
                                            <option value="Private Owner">Private Owner</option>
                                            <option value="Organization">Organization</option>
                                        </select>
                                        <label>I am signing up as:</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <i className="material-icons prefix">add_location</i>
                                        <input type="number" id="user_zip" name="user_zip"

                                               defaultValue={USER.user_zip}
                                               onChange={handleInput}/>
                                        <label htmlFor="user_zip">Enter Your Zip Code:</label>
                                    </div>


                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">border_color</i>
                                            <textarea id="user_bio" className="materialize-textarea"
                                                      name="user_message"
                                                      defaultValue={USER.user_bio}
                                                      onChange={handleInput} />
                                            <label htmlFor="user_bio">About Me: </label>

                                    </div>

                                    {/*<div id="user_bio">*/}
                                    {/*    <label htmlFor="user_bio">About Me: </label>*/}
                                    {/*    <textarea id="user_bio" name="user_message"*/}
                                    {/*              defaultValue={USER.user_bio}*/}
                                    {/*              onChange={handleInput}>*/}
                                    {/*    </textarea>*/}
                                    {/*</div>*/}
                                    {/*<br/>*/}
                                </form>
                                {/*<button disabled={loading}  onClick={saveUserProfile}> Save Changes</button>*/}
                                <a disabled={loading}  onClick={saveUserProfile} className="waves-effect btn">Save Chances</a>

                                <a disabled={loading}  onClick={cancelchanges} style={{marginLeft: 350}} className="waves-effect btn"> Cancel</a>
                            </div>


                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

