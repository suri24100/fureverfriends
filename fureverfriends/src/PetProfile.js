import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/pet-profile.css';
import {useParams} from "react-router-dom";
import {getProfileInfo, getTypeListing} from "./api-modules/PetfinderAPI";

export default function PetProfile(){
    let { name } = useParams();
    let { id } = useParams();

    const [petDetails, setPetDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [profileFound, setProfileFound] = useState(false);

    useEffect(() => {
        if(!petDetails){
            getPetData();
        }
    });

    async function getPetData(){
        let petData = await getProfileInfo(id);
        if(petData){
            await setPetDetails({
                petfinder_listing: true,       // check whether from petfinder or not
                id: petData.id,
                name: petData.name,
                photo_url: (petData.primary_photo_cropped) ? petData.primary_photo_cropped.medium : "./images/petProfiles/default-placeholder-image.png",
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
                fur_length: petData.coat,
                personality: (petData.tags.length > 0) ? petData.tags : "No traits given.",
                good_with_pets: "",
                kid_friendly: "",
                vaccinated: petData.attributes.shots_current,
                neutered: petData.attributes.spayed_neutered,
                bonded_pair: "",
                allergy_friendly: "",
                tags: petData.tags,
                description: petData.description
            });
            console.log(petData)
        } else{
            // pet not found, display error message
        }
    }

    function favoritePet(){
        setIsFavorite(!isFavorite);
    }

    function ProfileContents(){
        return (
            <div className="row">
                <div className="col s12 m4">
                    <div className="main-photo"
                         style={{backgroundImage: `url(` + petDetails.photo_url + `)`}}>
                    </div>
                    <h3>Info</h3>
                    <ul>
                        <li><span className="title">Vaccinated:</span> {petDetails.vaccinated}</li>
                        <li><span className="title">Spayed/Neutered:</span> {petDetails.neutered}</li>
                        <li><span className="title">Good with Other Pets:</span> {petDetails.good_with_pets}</li>
                        <li><span className="title">Kid-Friendly:</span> {petDetails.kid_friendly}</li>
                    </ul>
                    <a className="waves-effect waves-light btn-large" onClick={favoritePet}>
                        <i className="material-icons left">
                            {isFavorite ? "favorite" : "favorite_outline"}
                        </i>
                        {isFavorite ? "Unfavorite" : "Favorite"}
                    </a>
                </div>
                <div className="col s12 m8 side-info">
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
                    <p>{petDetails.description}</p>
                    <h3>Contact Information</h3>
                    <ul>
                        <li><span className="title">Email:</span> <a className="text-link" target="_blank" href={"mailto:" + petDetails.contact.email}>{petDetails.contact.email}</a></li>
                        <li><span className="title">Phone:</span> {petDetails.contact.phone}</li>
                        <li><span className="title">Website:</span> <a className="text-link" target="_blank" href={petDetails.contact.website}>Click Here</a></li>
                    </ul>
                    <h3>Application Process</h3>
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
                                <input type="file" />
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
            </div>
        )
    }

    function ProfileSlider(){
        return(
            <div className="image-slider">
                {petDetails ? <img src={petDetails.photo_url} /> : ""}
            </div>
        )
    }

    function PageNotFound(){
        return(
            <div className="row">
                <div className="col s12">
                    <h2>404: Pet Not Found</h2>
                    <p>Sorry!</p>
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
                {petDetails ?
                    <ProfileContents />
                    :
                    <PageNotFound />
                }
            </div>
        </div>
    )
}