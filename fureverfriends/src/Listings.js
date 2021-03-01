import React, {useEffect, useState, Component} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/listings.css';
import {getTypeListing} from "./api-modules/PetfinderAPI";
import {forEach} from "react-bootstrap/ElementChildren";
import {Link, useRouteMatch} from "react-router-dom";


function PetCard(props){
    console.log(props.petInfo);
    const petInfo = props.petInfo;
    const [petDetails, setPetDetails] = useState({
        petfinder_listing: true,       // check whether from petfinder or not
        id: petInfo.id,
        name: petInfo.name,
        photo_url: (petInfo.photos[0]) ? petInfo.photos[0].large : "./images/petProfiles/default-placeholder-image.png",
        profile_url: petInfo.url,
        type: petInfo.type,
        age: petInfo.age,
        breed: petInfo.breed,
        location: {
            zipcode: petInfo.contact.address.postcode,
            city: petInfo.contact.address.city,
            state: petInfo.contact.address.state
        },
        cared_by: "",
        gender: petInfo.gender,
        fur_length: petInfo.coat,
        personality: petInfo.tags,
        good_with_pets: "",
        kid_friendly: "",
        vaccinated: petInfo.attributes.shots_current,
        neutered: petInfo.attributes.spayed_neutered,
        bonded_pair: "",
        allergy_friendly: ""
    });

    function calculateDistance(){
        // TODO: to be filled in later when we have Maps api setup
    }

    let match = useRouteMatch();

    return (
        <div className="listing-card col s12 m4 l3">
            <div className="card">
                <div className="card-image">
                    <Link to={`${match.url}/` + petDetails.id} className="profile-link-overlay">
                        <img src={petDetails.photo_url} />
                    </Link>
                    <a className="btn-floating halfway-fab waves-effect waves-light">
                        <i className="material-icons">favorite_border</i>
                    </a>
                </div>
                <div className="card-content">
                    <span className="name">{petDetails.name}</span>
                    <span className="location">{petDetails.location.city}, {petDetails.location.state}</span>
                </div>
            </div>
        </div>
    )
}

export default function Listings(){

    const [petListings, setPetListings] = useState( null);

    useEffect(() => {
        if(!petListings){
            getListingData();
            console.log(petListings);
        }
        else{
            console.log(petListings);
        }
    });

    async function getListingData(){
        let newPetListings = await getTypeListing("cat", 100);
        setPetListings(newPetListings);
    }

    function generateCards(){
        let cardList = petListings.map(pet => <PetCard petInfo={pet} />);
        return(
            <>{cardList}</>
        )
    }

    // displays a loading circle while listings are fetched asynchronously
    function showLoading(){
        return(
            <div className="col s12 center">
                <div className="preloader-wrapper big active">
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
        )
    }

    return (
    <div className="listings-page">
        <div className="banner-wrap">
            <Header/>
            <div className="banner-img-wrap"></div>
            <div className="heading">
                <span>Listing your potential new friend</span>
            </div>
            <div className="subheading">
                <span>Filter below for better results!</span>
            </div>
        </div>

        <div className="additional-filters-wrap row">
            <div className="top">
                <div className="heading">
                    <h3>Additional Filters</h3>
                </div>
                <div className="apply-btn-wrap default">
                    <button className="apply-btn"><span>Apply Filters</span></button>
                </div>
            </div>
            <div className="forms">
                <div className="row1">
                    <form action="#" method="post" className="search-form" id="search-form">
                        <div className="wrap">
                            <label for="type-of-pet">Type of Pet:</label>
                            <select id="type-of-pet" name="type-of-pet" onchange="populate(this.id,'breed')">
                                <option value=""></option>
                                <option value="Cat">Cat</option>
                                <option value="Dog">Dog</option>
                                <option value="HamsterGuinea">Small Furbabies</option>
                                <option value="Rabbit">Rabbit</option>
                                <option value="Fish">Fish</option>
                                <option value="ReptileAmphibians">Reptile & Amphibian</option>
                                <option value="Bird">Bird</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                
                        <div className="wrap">
                            <label for="age">Age:</label>
                            <select id="age" name="age">
                                <option value="No Preference">No Preference</option>
                                <option value="Young">Young</option>
                                <option value="Teen">Teen</option>
                                <option value="Adult">Adult</option>
                            </select>
                        </div>

                        <div className="wrap">
                            <label for="breed">Breed:</label>
                            <select id="breed" name="breed" className="breed">
                                {/*populated with JavaScript */}
                            </select>
                        </div>

                        <div className="wrap">
                            <label for="zip-code">Zip Code:</label>
                            <input type="number" id="zip-code" name="zip-code" className="zip-code"></input>
                        </div>

                        <div className="wrap">
                            <label for="distance">Distance:</label>
                            <select id="distance" name="distance">
                                <option value="25 miles">25 miles</option>
                                <option value="50 miles">50 miles</option>
                                <option value="100 miles">100 miles</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="row2">
                    <form className="row2form">
                        <div className="wrap">
                            <label for="gender">Gender:</label>
                            <select id="gender" name="gender">
                                <option value="No Preference">No Preference</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>

                        <div className="wrap">
                            <label for="fur length">Fur Length:</label>
                            <select id="fur length" name="fur length">
                                <option value="No Preference">No Preference</option>
                                <option value="Short Hair">Short Hair</option>
                                <option value="Medium Hair">Medium Hair</option>
                                <option value="Long Hair">Long Hair</option>
                            </select>
                        </div>

                        <div className="wrap">
                            <label for="caregiver">Current Caregiver:</label>
                            <select id="caregiver" name="caregiver">
                                <option value="No Preference">No Preference</option>
                                <option value="Private Owner">Private Owner</option>
                                <option value="Rescue/Shelter">Rescue/Shelter</option>
                            </select>
                        </div>

                        <div className="wrap">
                            <label for="personality">Personality:</label>
                            <select id="personality" name="personality">
                                <option value="No Preference">No Preference</option>
                                <option value="Social">Social</option>
                                <option value="Independent">Independent</option>
                                <option value="Talkative">Talkative</option>
                                <option value="Quiet">Quit</option>
                                <option value="Playful">Playful</option>
                                <option value="Shy">Shy</option>
                                <option value="Adaptable">Adaptable</option>
                            </select>
                        </div>
                    </form>
                </div>

                <div className="row3">
                    <div className="wrap">
                        <input type="checkbox" id="good with other pets" name="good with other pets" value="good with other pets"></input>
                        <label for="good with other pets"> Good with other pets</label>
                    </div>
                    <div className="wrap">
                        <input type="checkbox" id="kid friendly" name="kid friendly" value="kid friendly"></input>
                        <label for="kid friendly"> Kid Friendly</label>
                    </div>
                    <div className="wrap">
                        <input type="checkbox" id="vaccinated" name="vaccinated" value="vaccinated"></input>
                        <label for="vaccinated"> Vaccinated</label>
                    </div>
                    <div className="wrap">
                        <input type="checkbox" id="neutered/spayed" name="neutered/spayed" value="neutered/spayed"></input>
                        <label for="neutered/spayed">Neutered/Spayed</label>
                    </div>
                    <div className="wrap">
                        <input type="checkbox" id="bonded pair" name="bonded pair" value="bonded pair"></input>
                        <label for="bonded pair">Bonded Pair</label>
                    </div>
                    <div className="wrap">
                        <input type="checkbox" id="allergy friendly" name="allergy friendly" value="allergy friendly"></input>
                        <label for="allergy friendly">Allergy Friendly</label>
                    </div>
                </div>
            </div>
        </div>
        <hr className="line-break"/>
        <div className="results-wrap ">
            <div className="sort-wrap">
                <form className="sort-by-form">
                    <label for="caregiver">Sort By:</label>
                    <select id="caregiver" name="caregiver">
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Adoption Fee (asc)">Adoption Fee (asc)</option>
                        <option value="Adoption Fee (desc)">Adoption Fee (desc)</option>
                    </select>
                </form>
            </div>
        </div>
        <div className="container">
            <div className="row">
                {(!petListings) ?
                    showLoading() :
                    generateCards()
                }
            </div>
            <div className="row pet-listing-nav">
                <div className="col s12 center">
                    <button className="btn waves-effect waves-light" type="button" name="action" disabled>
                        Prev
                        <i className="material-icons left">navigate_before</i>
                    </button>
                    <button className="btn waves-effect waves-light" type="button" name="action">
                        Next
                        <i className="material-icons right">navigate_next</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}