import React, {Component, useEffect, useState} from 'react';
import {useAuth} from "./AuthContext";
import M from "materialize-css";
import getPetProfileFromFB from "./ffdb";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";
import Modal from "./Modal";

export default function Notifications() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })



    return (

        <div className="actionsnav">
            {/*in order for this to work, would need to remove <Header/> in app.js, need to fix the camel cases when user info is displayed*/}

            <div className="listings-banner-wrap">

            </div>

            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix"> notifications </i>*/}
                                <Link to="/Notifications">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item card active card-panel hoverable">
                                {/*<i className="small material-icons prefix">list </i>*/}
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/DisplayUserProfile"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">favorite  </i>*/}
                                <Link to="/DisplayFavorites"> FAVORITES </Link></li>
                        </ul>
                    </div>

                    <div className="field col s12 m9" href="information">
                        <div className="collection">
                            <br/>
                            <div className="listing-card col s12 m6 l4">
                                <Alert> We have found you a new match! </Alert>
                                <div  onClick={() => console.log('clicked')}>
                                    <button onClick={() => setIsOpen(true)}>View Matches</button>

                                        <Modal className="waves-effect btn" open={isOpen} onClose={() => setIsOpen(false)}>
                                            No matches yet!
                                        </Modal>

                                </div>


                            </div>
                        </div>
                        <Link to ="/listings"  className="waves-effect btn" isOpen={true} onClose={() => setIsOpen(false)} > View listings for more</Link >
                    </div>
                </div>
            </div>
        </div>
    )
}