import React, {useEffect, useState} from "react";
import Header from "./Header";
import {useParams} from "react-router-dom";
import {getProfileInfo, getTypeListing} from "./api-modules/PetfinderAPI";


export default function PetProfile(){
    let { name } = useParams();
    let { id } = useParams();

    const [petDetails, setPetDetails] = useState();

    useEffect(() => {
        if(!petDetails){
            getPetData();
        }
        else{
        }
    });

    async function getPetData(){
        console.log(id);
        let petData = await getProfileInfo(id);
        if(petData){
            await setPetDetails({
                petfinder_listing: true,       // check whether from petfinder or not
                id: petData.id,
                name: petData.name,
                photo_url: (petData.photos[0]) ? petData.photos[0].large : "./images/petProfiles/default-placeholder-image.png",
                profile_url: petData.url,
                type: petData.type,
                age: petData.age,
                breed: petData.breed,
                location: {
                    zipcode: petData.contact.address.postcode,
                    city: petData.contact.address.city,
                    state: petData.contact.address.state
                },
                cared_by: "",
                gender: petData.gender,
                fur_length: petData.coat,
                personality: petData.tags,
                good_with_pets: "",
                kid_friendly: "",
                vaccinated: petData.attributes.shots_current,
                neutered: petData.attributes.spayed_neutered,
                bonded_pair: "",
                allergy_friendly: ""
            });
        } else{
            // pet not found, display error message
        }
        console.log(petData);
    }

    // const [petDetails, setPetDetails] = useState({
    //     petfinder_listing: true,       // check whether from petfinder or not
    //     id: petInfo.id,
    //     name: petInfo.name,
    //     photo_url: (petInfo.photos[0]) ? petInfo.photos[0].large : "./images/petProfiles/default-placeholder-image.png",
    //     profile_url: petInfo.url,
    //     type: petInfo.type,
    //     age: petInfo.age,
    //     breed: petInfo.breed,
    //     location: {
    //         zipcode: petInfo.contact.address.postcode,
    //         city: petInfo.contact.address.city,
    //         state: petInfo.contact.address.state
    //     },
    //     cared_by: "",
    //     gender: petInfo.gender,
    //     fur_length: petInfo.coat,
    //     personality: petInfo.tags,
    //     good_with_pets: "",
    //     kid_friendly: "",
    //     vaccinated: petInfo.attributes.shots_current,
    //     neutered: petInfo.attributes.spayed_neutered,
    //     bonded_pair: "",
    //     allergy_friendly: ""
    // });

    function ProfileContents(){
        return (
            <div className="row">
                <div className="col s12 m3">
                    <img src={petDetails.photo_url}/>
                    <h3>Info</h3>
                </div>
                <div className="col s12 m9">
                    <h3>Meet {name}!</h3>
                    <p></p>
                    <h3>About Me</h3>
                    <p></p>
                    <h3>Contact Information</h3>
                    <p></p>
                    <h3>Application Process</h3>
                    <p></p>
                </div>
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
                <div className="banner-img-wrap"></div>
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