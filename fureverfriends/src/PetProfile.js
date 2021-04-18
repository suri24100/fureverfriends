import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/pet-profile.css';
import {useParams} from "react-router-dom";
import {getProfileInfo, getTypeListing} from "./api-modules/PetfinderAPI";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";
import {firestore} from "./ffdb";
import {useAuth} from "./AuthContext";


export default function PetProfile(){
    const {USER, handleSetUSER, currentUser} = useAuth();

    let { id } = useParams();
    let { prefix } = useParams();
    let { type } = useParams();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
       if(initialData && profileFound === "loading"){
           const newPetDetails = {
               petfinder_listing: false,
               pet_id: initialData.pet_data.pet_id,
               account_info: {
                   id: "",
                   email: ""
               },
               listing_type: initialData.pet_data.listing_type,
               name: initialData.pet_data.name,
               type: initialData.pet_data.type,
               age: initialData.pet_data.age,
               breed: initialData.pet_data.breed,
               gender: initialData.pet_data.gender,
               color: initialData.pet_data.color,
               fur_length: initialData.pet_data.fur_length,
               profile_url: initialData.pet_data.profile_url,
               location: {
                   zipcode: initialData.pet_data.location.zipcode,
                   city: initialData.pet_data.location.city,
                   state: initialData.pet_data.location.state
               },
               cared_by: initialData.pet_data.cared_by,
               contact: {
                   name: (initialData.pet_data.contact.name) ? initialData.pet_data.contact.name : "N/A",
                   email: initialData.pet_data.contact.email ? initialData.pet_data.contact.email : "N/A",
                   phone: initialData.pet_data.contact.phone ? initialData.pet_data.contact.phone : "N/A",
                   website: initialData.pet_data.website ? initialData.pet_data.contact.website : "N/A",
               },
               personality: initialData.pet_data.personality,
               good_with_cats: (initialData.pet_data.good_with_cats) ? "Yes" : "No",
               good_with_dogs: (initialData.pet_data.good_with_dogs) ? "Yes" : "No",
               kid_friendly: (initialData.pet_data.kid_friendly) ? "Yes" : "No",
               vaccinated: (initialData.pet_data.vaccinated) ? "Yes" : "No",
               spayed_neutered: (initialData.pet_data.spayed_neutered) ? "Yes" : "No",
               bonded_pair: (initialData.pet_data.bonded_pair) ? "Yes" : "No",
               allergy_friendly: (initialData.pet_data.allergy_friendly) ? "Yes" : "No",
               special_needs: (initialData.pet_data.special_needs) ? "Yes" : "No",
               adoption_fee: initialData.pet_data.adoption_fee,
               tags: initialData.pet_data.tags,
               description: initialData.pet_data.description,
               listing_created: initialData.pet_data.listing_created,     // new Date().toJSON()
               profileFiles: {
                   profilePhoto: (initialData.profileFiles.profilePhoto.profilePhotoURL) ? initialData.profileFiles.profilePhoto.profilePhotoURL : placeholder_image,
                   additionalPhotos: (initialData.profileFiles.additionalPhotos.length > 0) ? initialData.profileFiles.additionalPhotos : placeholder_image,
                   applicationForm: ""
               }
           }
           setPetDetails(newPetDetails);
           setProfileFound("success");
       }
    });

    const [petDetails, setPetDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState("loading");
    const [profileFound, setProfileFound] = useState("loading");

    useEffect(() => {
        if(profileFound === "loading"){
            getPetData();
        }
        if(currentUser && USER.email && USER.email.length > 0 && USER.favorites && isFavorite === "loading"){
            let checkFav = false;
            if(USER.favorites.length > 0){
                USER.favorites.map(pet => {
                    if(pet.id === id && pet.source === prefix) {
                        checkFav = true;
                    }
                })
            }
            setIsFavorite(checkFav);
        }
        if(!currentUser){
            setIsFavorite(false);
        }
    }, [USER]);

    async function getFFProfileInfo(id, type) {
        let profileData = {};
        let docRef = firestore.collection("PetInfo")
            .doc("PublicListings")
            .collection("AdoptionList")
            .doc("PetTypes")
            .collection(type)
            .doc(id);

        docRef.get().then((doc) => {
            if (doc.exists) {
                setInitialData(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        return profileData;
    }

    const getFavs = (petID, petType) =>{
        const favs = []
        firestore.collection("PetInfo")
            .doc("PublicListings")
            .collection("AdoptionList")
            .doc("PetTypes")
            .collection(petType)
            .doc(petID).get().then(querySnapshot => {
            querySnapshot(doc => {
                favs.push(doc.data(petID), doc.data(petType))
            })
        })
        return favs;
    }

    async function getPetData(){
        if(prefix === "PF") {
            let petData = await getProfileInfo(id);
            if (petData) {
                await setPetDetails({
                    petfinder_listing: true,
                    pet_id: petData.id,                 // Date.now().toString();
                    account_info: {             // private for account reference
                        id: "",
                        email: ""
                    },
                    listing_type: "AdoptionList",
                    name: petData.name,
                    type: petData.type,
                    age: petData.age,
                    breed: petData.breeds.primary,
                    gender: petData.gender,
                    color: petData.colors.primary,
                    fur_length: (petData.coat) ? petData.coat : "Unknown",
                    profile_url: petData.url,
                    location: {
                        zipcode: petData.contact.address.postcode,
                        city: petData.contact.address.city,
                        state: petData.contact.address.state
                    },
                    cared_by: "",
                    contact: {
                        name: "",
                        email: petData.contact.email,
                        phone: petData.contact.phone ? petData.contact.phone : "Not provided.",
                        website: petData.url
                    },
                    personality: (petData.tags.length > 0) ? petData.tags : [],
                    good_with_cats: (petData.environment.cats) ? "Yes" :
                        (((petData.environment.cats) === null) ? "Unknown" : "No"),
                    good_with_dogs: (petData.environment.dogs) ? "Yes" :
                        (((petData.environment.dogs) === null) ? "Unknown" : "No"),
                    kid_friendly: (petData.environment.children) ? "Yes" :
                        (((petData.environment.children) === null) ? "Unknown" : "No"),
                    vaccinated: (petData.attributes.shots_current) ? "Yes" : "No",
                    spayed_neutered: (petData.attributes.spayed_neutered) ? "Yes" : "No",
                    bonded_pair: "",
                    allergy_friendly: "",
                    special_needs: (petData.attributes.special_needs) ? "Yes" : "No",
                    adoption_fee: "",
                    tags: [],
                    description: petData.description,
                    applicationForm: "",
                    listing_created: petData.published_at,
                    profileFiles: {
                        profilePhoto: (petData.primary_photo_cropped) ? petData.primary_photo_cropped.medium : placeholder_image,
                        additionalPhotos: petData.photos,
                        applicationForm: ""
                    }
                });
                setProfileFound("success");
            } else {
                setProfileFound("failed");
            }
        }
        else if (prefix === "FF") {
            let promise = await getFFProfileInfo(id, type);
        }
        else{
            setProfileFound("failed");
        }
    }

    function favoritePet(){
        if(currentUser && USER.favorites){
            // copy of user's favorites list
            let newFavoritesArr = USER.favorites.map(pet => pet);
            // data to push to or remove from favorites array
            const petInfo = {id: petDetails.pet_id, type: petDetails.type, source: prefix};
            // check if pet already in favorites, add or remove accordingly
            if(newFavoritesArr.some(pet => pet.id === id)){
                if(isFavorite) {
                    //newFavoritesArr = newFavoritesArr.splice(newFavoritesArr.indexOf(petInfo), 1)
                    newFavoritesArr = newFavoritesArr.filter(pet => {
                        return !( pet.id === petInfo.id && pet.type === petInfo.type && pet.source === petInfo.source)
                    });
                    setIsFavorite(false);
                }
            } else {
                if(!isFavorite){
                    newFavoritesArr.push(petInfo);
                    setIsFavorite(true);
                }
            }
            // update state to change button
            // save update to database
            let dbUserInfo = firestore.collection("UserInfo")
                .doc(USER.email)
                .update({favorites: newFavoritesArr})
                .then(() => console.log('Changed!'))
                .catch((error) => console.log('Error changing favorites!'));
            // update local USER copy to match
            handleSetUSER("favorites", newFavoritesArr);
        }
    }

    function ProfileContents(){
        return (
            <div className="row">
                <div className="col s12 m4 l4 side-info">
                    <div className="main-photo hide-on-small-only"
                         style={{backgroundImage: `url(` + petDetails.profileFiles.profilePhoto + `)`}}>
                    </div>
                    <h3>Info</h3>
                    <ul>
                        <li><span className="title">Vaccinated:</span> {petDetails.vaccinated}</li>
                        <li><span className="title">Spayed/Neutered:</span> {petDetails.spayed_neutered}</li>
                        <li><span className="title">Special Needs:</span> {petDetails.special_needs}</li>
                        <li><span className="title">Good with Cats:</span> {petDetails.good_with_cats}</li>
                        <li><span className="title">Good with Dogs:</span> {petDetails.good_with_dogs}</li>
                        <li><span className="title">Kid-Friendly:</span> {petDetails.kid_friendly}</li>
                    </ul>
                    {isFavorite !== "loading" ?
                        <a className="waves-effect waves-light btn-large" onClick={favoritePet}>
                            <i className="material-icons left">
                                {isFavorite ? "favorite" : "favorite_outline"}
                            </i>
                            {isFavorite ? "Unfavorite" : "Favorite"}
                        </a>
                        :
                        <></>
                    }
                </div>
                <div className="col s12 m7 l4">
                    <h3>Meet {petDetails.name}!</h3>
                    <ul>
                        <li><span className="title">Location:</span> {petDetails.location.city}, {petDetails.location.state}</li>
                        <li><span className="title">Age:</span> {petDetails.age}</li>
                        <li><span className="title">Gender:</span> {petDetails.gender}</li>
                        <li><span className="title">Breed:</span> {petDetails.breed}</li>
                        <li><span className="title">Fur Length:</span> {petDetails.fur_length}</li>
                        <li><span className="title">Personality:</span> {(petDetails.personality && petDetails.personality.length > 0) ? petDetails.personality.map(trait => <span className="personality">{trait}</span>) : "No traits given."}</li>
                        <li><span className="title">Adoption Fee:</span> {petDetails.adoption_fee.length > 0 ? "$" + petDetails.adoption_fee : "Not listed."}</li>
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
                            </form>
                            <div className="col s12 submit-button">
                                <a className="waves-effect waves-light btn-large col s12">
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
                <div className="col s12 center disclaimer">
                    <p><span className="title">Notice:</span> The above listing is for demonstration purposes only and the animal cannot be adopted from this website.</p>
                </div>
            </div>
        )
    }

    function ProfileSlider(){
        return(
            <div className="image-slider">
                {prefix === "PF" ?
                    petDetails ?
                        petDetails.profileFiles.additionalPhotos.length > 0 ?
                                petDetails.profileFiles.additionalPhotos.map(photo =>
                                    <img src={photo.full} />
                                )
                                :
                                <img src={petDetails.profileFiles.profilePhoto} />

                        :
                        <img src={placeholder_image} />

                    :
                    petDetails ?
                        <img src={petDetails.profileFiles.profilePhoto} />
                        :
                        <img src={placeholder_image}/>
                }

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
            <div className="gradient hide-on-med-and-down"></div>
            <div className="banner-wrap">
                <ProfileSlider />
            </div>
            <div className="container">
                {(profileFound === "success") && <ProfileContents />}
                {(profileFound === "failed") && <PageNotFound />}
            </div>
        </div>
    )
}
