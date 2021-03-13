import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/pet-profile.css';
import {useParams} from "react-router-dom";
import {getProfileInfo, getTypeListing} from "./api-modules/PetfinderAPI";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";

export default function PetProfile(){
    let { id } = useParams();
    let { prefix } = useParams();

    const [petDetails, setPetDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [profileFound, setProfileFound] = useState("loading");

    useEffect(() => {
        if(!petDetails){
            getPetData();
        }
    });

    async function getPetData(){
        if(prefix === "PF") {
            let petData = await getProfileInfo(id);
            if (petData) {
                await setPetDetails({
                    petfinder_listing: true,       // check whether from petfinder or not
                    id: petData.id,
                    name: petData.name,
                    photo_url: (petData.primary_photo_cropped) ? petData.primary_photo_cropped.medium : placeholder_image,
                    additional_photos: petData.photos,
                    profile_url: petData.url,
                    type: petData.type,
                    age: petData.age,
                    breed: petData.breeds.primary,
                    location: {
                        zipcode: petData.contact.address.postcode,
                        city: petData.contact.address.city,
                        state: petData.contact.address.state
                    },
                    cared_by: "",
                    contact: {
                        email: petData.contact.email,
                        phone: petData.contact.phone,
                        website: petData.url
                    },
                    gender: petData.gender,
                    fur_length: (petData.coat) ? petData.coat : "Unknown",
                    personality: (petData.tags.length > 0) ? petData.tags : "No traits given.",
                    good_with_cats: (petData.environment.cats) ? "Yes" :
                        (((petData.environment.cats) === null) ? "Unknown" : "No"),
                    good_with_dogs: (petData.environment.dogs) ? "Yes" :
                        (((petData.environment.dogs) === null) ? "Unknown" : "No"),
                    kid_friendly: (petData.environment.children) ? "Yes" :
                        (((petData.environment.children) === null) ? "Unknown" : "No"),
                    vaccinated: (petData.attributes.shots_current) ? "Yes" : "No",
                    neutered: (petData.attributes.spayed_neutered) ? "Yes" : "No",
                    bonded_pair: "",
                    special_needs: (petData.attributes.special_needs) ? "Yes" : "No",
                    allergy_friendly: "",
                    tags: petData.tags,
                    description: petData.description,
                    listing_created: petData.published_at
                });
                console.log(petData)
                setProfileFound("success");
            } else {
                setProfileFound("failed");
            }
        }
    }

    function favoritePet(){
        setIsFavorite(!isFavorite);
    }

    function ProfileContents(){
        return (
            <div className="row">
                <div className="col s12 m4 side-info">
                    <div className="main-photo hide-on-small-only"
                         style={{backgroundImage: `url(` + petDetails.photo_url + `)`}}>
                    </div>
                    <h3>Info</h3>
                    <ul>
                        <li><span className="title">Vaccinated:</span> {petDetails.vaccinated}</li>
                        <li><span className="title">Spayed/Neutered:</span> {petDetails.neutered}</li>
                        <li><span className="title">Special Needs:</span> {petDetails.special_needs}</li>
                        <li><span className="title">Good with Cats:</span> {petDetails.good_with_cats}</li>
                        <li><span className="title">Good with Dogs:</span> {petDetails.good_with_dogs}</li>
                        <li><span className="title">Kid-Friendly:</span> {petDetails.kid_friendly}</li>
                    </ul>
                    <a className="waves-effect waves-light btn-large" onClick={favoritePet}>
                        <i className="material-icons left">
                            {isFavorite ? "favorite" : "favorite_outline"}
                        </i>
                        {isFavorite ? "Unfavorite" : "Favorite"}
                    </a>
                </div>
                <div className="col s12 m8">
                    <h3>Meet {petDetails.name}!</h3>
                    <ul>
                        <li><span className="title">Location:</span> {petDetails.location.city}, {petDetails.location.state}</li>
                        <li><span className="title">Age:</span> {petDetails.age}</li>
                        <li><span className="title">Gender:</span> {petDetails.gender}</li>
                        <li><span className="title">Breed:</span> {petDetails.breed}</li>
                        <li><span className="title">Fur Length:</span> {petDetails.fur_length}</li>
                        <li><span className="title">Currently Cared for By:</span> {petDetails.good_with_pets}</li>
                        <li><span className="title">Personality:</span> {petDetails.personality}</li>
                        <li><span className="title">Adoption Fee:</span> Unknown</li>
                    </ul>
                    <h3>About Me</h3>
                    <p>{petDetails.description} {(prefix === "PF") && <a className="text-link" target="_blank" href={petDetails.profile_url}>[read more on PetFinder]</a>}</p>
                    <h3>Contact Information</h3>
                    <ul>
                        <li><span className="title">Email:</span> <a className="text-link" target="_blank" href={"mailto:" + petDetails.contact.email}>{petDetails.contact.email}</a></li>
                        <li><span className="title">Phone:</span> {petDetails.contact.phone}</li>
                        <li><span className="title">Website:</span> <a className="text-link" target="_blank" href={petDetails.contact.website}>Click Here</a></li>
                    </ul>
                    <h3>Application Process</h3>
                    {(prefix === "FF") ?
                        <div className="application-process">
                            <p>Please submit your application using one of the two methods below. If selected,
                                you will receive a notification that your application was accepted.
                                <a className="text-link" href="#"> Download application form here.</a>
                            </p>
                            <form className="col s12">
                                <div className="file-field input-field col s12">
                                    <h5>Upload File:</h5>
                                    <div className="btn">
                                        <i className="material-icons">
                                            folder
                                        </i>
                                        <input type="file"/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate"
                                               type="text"
                                               placeholder="Upload file"/>
                                    </div>
                                </div>
                                <div className="col s12 valign-wrapper">
                                    <h5 className="left">Or Scan Document Directly: </h5>
                                    <a className="scan-button waves-effect waves-light btn" onClick={favoritePet}>
                                        <i className="material-icons">
                                            camera_alt
                                        </i>
                                    </a>
                                </div>
                            </form>
                            <div className="col s12 submit-button">
                                <a className="waves-effect waves-light btn-large col s12" onClick={favoritePet}>
                                    Submit Application
                                </a>
                            </div>
                        </div>
                        :
                        <div className="pf-application">
                            <p>To learn more about {petDetails.name} and submit an adoption application, check out the full profile on PetFinder.com.</p>
                             <a className="btn-large" href={petDetails.profile_url} target="_blank">Apply on PetFinder</a>
                        </div>
                    }
                    </div>
            </div>
        )
    }

    function ProfileSlider(){
        return(
            <div className="image-slider">
                {petDetails ? <img src={petDetails.photo_url} /> : <img src={placeholder_image} />}
            </div>
        )
    }

    function PageNotFound(){
        return(
            <div className="row">
                <div className="col s12">
                    <h2>404: Pet Not Found</h2>
                    <h4>We're sorry, but the profile for this pet cannot be found right now.</h4>
                </div>
            </div>
        )
    }

    return(
        <div className="profile-page">
            <div className="banner-wrap">
                <Header/>
                <ProfileSlider />
            </div>
            <div className="container">
                {(profileFound === "success") && <ProfileContents />}
                {(profileFound === "failed") && <PageNotFound />}
            </div>
        </div>
    )
}