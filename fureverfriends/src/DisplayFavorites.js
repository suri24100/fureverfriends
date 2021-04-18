import React, { useState, useEffect } from 'react';
import './css/style.css';
import './css/displayprofile.css'
import ReactDOM from 'react-dom';
import './Listings.js';
import $ from 'jquery';
import M from "materialize-css";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";

// test code for creating a listing
import db, {firestore, storage} from "./ffdb";
import 'firebase/storage';
import {useAuth} from "./AuthContext";
import {Link} from "react-router-dom";
import Header from "./Header";
import Listings from "./Listings";
import {PET_PROFILE as pets} from "./api-modules/constants";
import {getProfileInfo} from "./api-modules/PetfinderAPI";


export default function DisplayFavorites() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [petInfo, setPetinfo] = useState({
        pets: [],
        hasPets: false,
        petsLoading: true
    });

    useEffect(()=>{
        if (USER.email.length > 0 && !loading){
            setLoading(true);
            // check if user has favorites
            if(USER.favorites && USER.favorites.length > 0){
                favorite();
            } else {
                setPetinfo({...petInfo, petsLoading: false})
            }
        }
    })

    /*
         if there is  pet in the db with petid return the petDets
          */
    async function getfavs(petID, petType, source){
        let favData = {};
        if (source === "PF") {
            // get full profile info from PF
            const pfDataFull = await getProfileInfo(petID);
            // profile found, save in consistent format
            if(pfDataFull) {
                favData = {
                    id: pfDataFull.id,
                    name: pfDataFull.name,
                    type: pfDataFull.type,
                    photo: pfDataFull.primary_photo_cropped ? pfDataFull.primary_photo_cropped.medium : placeholder_image,
                    source: "PF"
                }
            }
            else {          // profile was removed from PF, logging as empty
                favData = {
                    id: "",
                    name: "",
                    type: "",
                    photo: "",
                    source: "PF"
                };
            }
        } else {
            let docRef = firestore.collection("PetInfo")
                .doc("PublicListings")
                .collection("AdoptionList")
                .doc("PetTypes")
                .collection(petType)
                .doc(petID.toString());
            favData = await docRef.get()
                .then((doc) => {
                    const ffDataFull = doc.data();
                    const tempData = {
                        id: ffDataFull.pet_data.pet_id,
                        name: ffDataFull.pet_data.name,
                        type: ffDataFull.pet_data.pet_id.type,
                        photo: ffDataFull.profileFiles.profilePhoto ? ffDataFull.profileFiles.profilePhoto.profilePhotoURL : placeholder_image,
                        source: "PF"
                    };
                    return tempData;
                });
        }
        return favData;
    }

    function favorite(){
        if(USER.favorites.length > 0){
            let promises = USER.favorites.map(pet => {
                return getfavs(pet.id, pet.type, pet.source);
            });
            Promise.all(promises)
                .then(results => {
                    setPetinfo({
                        pets: results,
                        hasPets: true,
                        petsLoading: false
                    })
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <div className="actionsnav">

            <div className="listings-banner-wrap">
            </div>
            <div className="container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel">
                                <Link to="/">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item active current-page card-panel">
                                <Link to="/DisplayFavorites"> FAVORITES </Link></li>
                        </ul>
                    </div>
                        <div className="field col s12 m9">
                            <div className="collection profile-details">
                                <h2>Your Favorites</h2>
                                {petInfo.petsLoading ?
                                    <div className="center">
                                        <div className="preloader-wrapper small active center">
                                            <div className="spinner-layer spinner-green-only">
                                                <div className="circle-clipper left">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="gap-patch">
                                                    <div className="circle"></div>
                                                </div>
                                                <div className="circle-clipper right">
                                                    <div className="circle"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    petInfo.hasPets ?
                                            <div>
                                                {petInfo.pets.map((pet) =>
                                                    <div className="col s12 m12 l6 listing-card">
                                                        <div className="card" key={pet.id}>
                                                            <div className="card-image">
                                                                <img src={pet.photo}/>
                                                            </div>
                                                            <div className="card-action">
                                                                <Link onClick={() => window.scrollTo(0, 0)}
                                                                      to={"/listings/" + pet.type + "/profile/FF-" + pet.id}><i
                                                                    className="material-icons right">arrow_forward</i>{pet.name}'s
                                                                    PROFILE</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        :
                                            <div className="noPets"><p>You have no current favorites.<br/> If you did favorite a pet, it's possible they were already adopted.</p></div>

                                }
                            </div>
                        <Link to="/listings" className="waves-effect btn"> View More Pets </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
