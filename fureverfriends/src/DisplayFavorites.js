import React, { useState, useEffect } from 'react';
import './css/style.css';
import './css/newListings.css';
import ReactDOM from 'react-dom';
import './Listings.js';
import $ from 'jquery';
import M from "materialize-css";

// test code for creating a listing
import db, {firestore, getfavs, storage} from "./ffdb";
import 'firebase/storage';
import {useAuth} from "./AuthContext";
import {Link} from "react-router-dom";
import Header from "./Header";


export default function DisplayFavorites() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [petInfo, setPetinfo] = useState({
        pets: [],
        hasPets: false
    });

    useEffect(()=>{
        if (USER.email.length > 0 && !loading){
            setLoading(true);
            favorite()
        }
    })

    function favorite(){
        let promises = USER.favorites.map(pet => {
            return getfavs(pet.id, pet.type);
        })
        Promise.all(promises)
            .then(results => {
                setPetinfo({
                    pets: results,
                    hasPets: true
                })
            })
            .catch(e => {
                console.log(e);
            });
    }
    async function petfinderfavs(){
        let petfinderfavs = [];
        await USER.favorites.map((pet) => {
            pet_name: []
        })
    }

    try {

    }
catch (e) {

}
    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">

            </div>
            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix"> notifications </i>*/}
                                <Link to="/Notifacations">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">list </i>*/}
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item card active card-panel hoverable">
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/DisplayFavorites"> FAVORITES </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="col s12 m9" href="information">
                        <div className="collection">
                            <br/>
                            <div className="listing-card col s12 m6 l4">
                                <div className="card">
                                    <div className="card-content">
                                        {petInfo.pets.map((pet) =>
                                            <div className="card">
                                                <div className="card-content">
                                                    <span className="name">{pet.pet_data.favorites}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Link to ="/listings"  className="waves-effect btn"> View More Pets </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
