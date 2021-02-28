import React, {useEffect, useState} from "react";
import Header from "./Header";
import {useParams} from "react-router-dom";
import {getProfileInfo, getTypeListing} from "./api-modules/PetfinderAPI";


export default function PetProfile(){
    let { name } = useParams();
    let { id } = useParams();

    const [petDetails, setPetDetails] = useState(null);

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
        setPetDetails(petData);
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

    return(
        <div>
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
            <h1>You made it to the profile of {name}</h1>
        </div>
    )
}