import React, {useState, useEffect, useReducer} from 'react';
import './css/style.css';
import './css/newListings.css';
import './css/home.css';
import './Listings.js';
import './css/displayprofile.css'

import {Link} from "react-router-dom";
import {useAuth} from "./AuthContext";
import {getPetProfileFromFB} from "./ffdb"


export default function Displaylisting() {
    const {USER, currentUser} = useAuth();

    useEffect(()=>{
        if(username === ''){
            setUsername(USER.username);
        }
        if (currentUser && USER.pet_listings.length > 0 && !loading){
            setLoading(1); //tracking when the page loaded
            listing();
        }
    })

    const [loading, setLoading] = useState(0);
    const [username, setUsername] = useState('');
    const [petInfo, setPetinfo] = useState({
        pets: [],
        hasPets: false
    });

    function listing(){
        // if length of Array(0), then map will not work
        let promises = USER.pet_listings.map(pet => {
            return getPetProfileFromFB(pet.id, pet.type);
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

    return (
        <div className="actionsnav">
            <div className="listings-banner-wrap"></div>
            <div className="container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li className="card-content collection-item active card-panel">
                                <Link to="/">NOTIFICATIONS </Link>
                            </li>
                            <li className="card-content collection-item active current-page card-panel">
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/account-info"> ACCOUNT </Link>
                            </li>
                            <li className="card-content collection-item active card-panel">
                                <Link to="/DisplayFavorites"> FAVORITES </Link></li>
                        </ul>
                    </div>
                    <div className="field col s12 m9">
                        <div className="collection profile-details">
                            <h2>Your Pet Listings</h2>
                                {!petInfo.hasPets ?
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
                                                <div className="card" key={pet.pet_data.pet_id}>
                                                    <div className="card-image">
                                                         <img src={pet.profileFiles.profilePhoto.profilePhotoURL} />
                                                    </div>
                                                    <div class="card-action">
                                                        <Link onClick={() => window.scrollTo(0, 0)} to={"/listings/" + pet.pet_data.type + "/profile/FF-" + pet.pet_data.pet_id}><i className="material-icons right">arrow_forward</i>{pet.pet_data.name}'s PROFILE</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                }
                        </div>
                        <Link to="/findahome" className="waves-effect btn"> Add New Listing</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
