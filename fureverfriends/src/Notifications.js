import React, {Component, useEffect, useRef, useState} from 'react';
import {useAuth} from "./AuthContext";
import M from "materialize-css";
import getPetProfileFromFB, {firestore} from "./ffdb";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";
import './App'
import './css/signing.css';
import {getProfileInfo} from "./api-modules/PetfinderAPI";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";
import firebase from "firebase";

export default function Notifications() {
    const {USER, handleSetUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [petInfo, setPetinfo] = useState({
        pets: [],
        hasPets: false,
        petsLoading: true
    });
    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log(USER);
    })

    useEffect(()=>{
        if (USER.email && USER.email.length > 0 && !loading) {
            console.log(USER);
            setLoading(true);
            // check if user has favorites
            if (USER.matches && USER.matches.length > 0) {
                matches();
            } else {
                setPetinfo({...petInfo, petsLoading: false})
            }
        }
    })

    function matches(){
        let promises = USER.matches.map(pet => {
            return getMatches(pet.id, pet.type, pet.source);
        });
        Promise.all(promises)
            .then(results => {
                setPetinfo({
                    pets: results.filter(res => res.id),
                    hasPets: true,
                    petsLoading: false
                })
                if(USER.new_notifications && USER.new_notifications.length > 0){
                    handleSetUSER("new_notifications", []);
                    const docRef = firestore.collection("UserInfo").doc(USER.email);
                    const promise = docRef.update({
                        new_notifications: []
                    })
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    async function getMatches(petID, petType, source){
        let favData = {};
        let docRef = firestore.collection("PetInfo")
            .doc("PublicListings")
            .collection("AdoptionList")
            .doc("PetTypes")
            .collection(petType)
            .doc(petID.toString());
        favData = await docRef.get()
            .then((doc) => {
                console.log(petID, petType)
                const ffDataFull = doc.data();
                const tempData = {
                    id: ffDataFull.pet_data.pet_id,
                    name: ffDataFull.pet_data.name,
                    type: ffDataFull.pet_data.type,
                    photo: ffDataFull.profileFiles.profilePhoto ? ffDataFull.profileFiles.profilePhoto.profilePhotoURL : placeholder_image,
                    source: "FF"
                };
                return tempData;
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        return favData ? favData : {};
    }



    return (

        <div className="actionsnav">

            <div className="listings-banner-wrap">

            </div>

            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active current-page card-panel">
                                <Link to="/my-matches">MATCHES </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/my-listings"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/my-favorites"> FAVORITES </Link></li>
                        </ul>
                    </div>

                    <div className="field col s12 m9" href="information">
                        <div className="collection profile-details">
                            <h2>Your Matches</h2>
                            {!petInfo.hasPets ?
                                !petInfo.petsLoading ?
                                    <div className="center noMatches">
                                        <p>You have no current matches.</p>
                                        <Link to="/quiz"> Take our Purrsonality Quiz to find yours!</Link>
                                    </div>
                                    :
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
                                <div>
                                    {petInfo.pets.map((pet) =>
                                        <div className="col s12 m12 l6 listing-card">
                                            <div className="card" key={pet.id}>
                                                <div className="card-image">
                                                    <img src={pet.photo} />
                                                </div>
                                                <div class="card-action">
                                                    <Link className="truncate" onClick={() => window.scrollTo(0, 0)} to={"/listings/" + pet.type + "/profile/FF-" + pet.id}><i className="material-icons right">arrow_forward</i>{pet.name}'s PROFILE</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
