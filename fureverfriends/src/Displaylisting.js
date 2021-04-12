import React, { useState, useEffect } from 'react';
import './css/style.css';
import './css/newListings.css';
import ReactDOM from 'react-dom';
import './Listings.js';
import $ from 'jquery';
import M from "materialize-css";
import db, {firestore, storage} from "./ffdb";
import {getPetProfileFromFB} from "./ffdb"


import Listings from "./Listings";


import './css/home.css';
import './css/style.css'

import {Link} from "react-router-dom";
import {useAuth} from "./AuthContext";
import {PET_PROFILE as petDetails} from "./api-modules/constants";


export default function Displaylisting() {
    useEffect(()=>{
        if (USER.email.length > 0 && !loading){
            setLoading(true); //trackinmg when the page loaded
            listing()
        }
    })

    //recc:
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [petInfo, setPetinfo] = useState([]);
//user needed to be auth in order to get the listings
    useEffect(()=>{
    console.log(petInfo)}, [petInfo] //call all the {} everytime petinfo changes :state management
    )
//race condition : overriding thats why only getting one array at a time
    //deal with duplicates

    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })


    //if user.email exists then load the listing else nothing

    async function listing(){
        let profileData = [];
        await USER.pet_listings.map((pets) =>  {
            let docRef = firestore.collection("PetInfo")
                .doc("PublicListings")
                .collection("AdoptionList")
                .doc("PetTypes")
                .collection(pets.type)
                .doc(pets.id);
            docRef.get().then((doc) => {
                // const petInfoCopy = petInfo.map(pet => pet)
                // petInfoCopy.push(doc.data())
                profileData.push(doc.data())
            });
        })
        setPetinfo(profileData)
     //save profile data in state : put it as perinfo
//copy of petinfo array , const x = [...array] use slide
        return profileData;

    }


  // console.log(getPetProfileFromFB)
    // console.log(USER.pet_listings[]) //gets array
    //console.log(getPetProfileFromFB(USER.pet_listings[0].id, USER.pet_listings[0].type))
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
                            <Link to="/">NOTIFICATIONS</Link>
                        </li>
                        <li className="card-content collection-item card active card-panel hoverable">
                            {/*<i className="small material-icons prefix">list </i>*/}
                            <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                        </li>
                        <li className="card-content collection-item active card-panel hoverable">
                            {/*<i className="small material-icons prefix">account_circle </i>*/}
                            <Link to="/account-info"> ACCOUNT </Link>
                        </li>
                        <li className="card-content collection-item active card-panel hoverable">
                            {/*<i className="small material-icons prefix">favorite  </i>*/}
                            <Link to="/DisplayFavorites"> FAVORITES </Link></li>
                    </ul>
                </div>

                <div className="field col s12 m9" href="information">
                <div className="listing-card col s12 m9">
                    <div className="card">
                        <div className="card-content">
                            {petInfo.map((pets) =>
                                <div className="card">
                                    <div className="card-content">
                                        <span className="name"> {pets.pet_data.name}  </span>
                                        <span className="name"> {pets.pet_data.type}  </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>


                    <Link to ="/findahome"  className="waves-effect btn"> Add New Listing </Link>
        </div>
            </div>
        </div>

    )
}
