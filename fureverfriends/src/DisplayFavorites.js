import React, { useState, useEffect } from 'react';
import './css/style.css';
import './css/newListings.css';
import ReactDOM from 'react-dom';
import './Listings.js';
import $ from 'jquery';
import M from "materialize-css";

// test code for creating a listing
import db, {firestore, storage} from "./ffdb";
import 'firebase/storage';
import {useAuth} from "./AuthContext";
import {Link} from "react-router-dom";
import Header from "./Header";
import PFdata from "./api-modules/constants.js";


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

    /*
         if there is  pet in the db with petid return the petDets
          */
    async function getfavs(petID, petType){
        let favData = {};
        if (typeof petID === 'number') {
         // TODO pull pet from petfinder API (petfinder's petID is number rather than string we use in the DB.
        } else {
            let docRef = firestore.collection("PetInfo")
                .doc("PublicListings")
                .collection("AdoptionList")
                .doc("PetTypes")
                .collection(petType)
                .doc(petID.toString());
            favData = await docRef.get()
                .then((doc) => {return doc.data()});
        }
        return favData;
    }

    function favorite(){
        let promises = USER.favorites.map(pet => {
            return getfavs(pet.id, pet.type);
        });
        Promise.all(promises)
            .then(results => {
                console.log( results);
                setPetinfo({
                    pets: results,
                    hasPets: true
                })
            })
            .catch(e => {
                console.log(e);
            });
    }
/*
check for both db and PF
if it pet exists in db and is favorited then return
if pet exists in PF and is favorited then return but if it doesnt then do nothing
 */
    // useEffect(() =>{
    //     if(ffListings && pfListings && (prevFFListings !== ffListings)){
    //             try {
    //                 name = "FF: " ;
    //             } catch (e) {
    //                 name = "PF: ";
    //             }
    //         }
    //     }

    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">

            </div>
            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel hoverable">
                                <Link to="/Notifacations">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel hoverable">
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item card active card-panel hoverable">
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
                                                {Object.keys(pet).length === 0 ? (
                                                    <div className="card-content">
                                                        <span className="name">Pet from PetFinder API</span>
                                                    </div>
                                                ) : (
                                                    <div className="card-content">
                                                        <Link style={{color: "black"}} to={"/listings/"+pet.pet_data.type+"/profile/FF-"+pet.pet_data.pet_id}>
                                                            <span className="name">{pet.pet_data.name}</span>
                                                        </Link>
                                                    </div>
                                                )}
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

//this is updated
