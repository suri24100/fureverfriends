import React, {useEffect, useState} from "react";
import Header from "./Header";
import './css/pet-profile.css';
import {useParams} from "react-router-dom";
import {getProfileInfo, getTypeListing} from "./api-modules/PetfinderAPI";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";
import {firestore} from "./ffdb";


export default function PetProfile(){
    let { id } = useParams();
    let { prefix } = useParams();
    let { type } = useParams();

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
       if(initialData && profileFound === "loading"){
           console.log("Pet Data: " + initialData)
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
                   state: initialData.pet_data.state
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
           console.log(initialData);
           setProfileFound("success");
       }
    });

    const [petDetails, setPetDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [profileFound, setProfileFound] = useState("loading");

    useEffect(() => {
        if(profileFound === "loading"){
            getPetData();
        }
    });

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
                console.log("Document data:", doc.data());
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
                        phone: petData.contact.phone,
                        website: petData.url
                    },
                    personality: (petData.tags.length > 0) ? petData.tags : "No traits given.",
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
                console.log(petData)
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
        setIsFavorite(!isFavorite);
    }

    function ProfileContents(){
        return (
            <div className="row">
                <div className="col s12 m4 side-info">
                    <div className="main-photo hide-on-small-only"
                         style={{backgroundImage: `url(` + petDetails.profileFiles.profilePhoto + `)`}}>
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
                <div className="col s12 center disclaimer">
                    <p><span className="title">Notice:</span> The above listing is for demonstration purposes only and the animal cannot be adopted from this website.</p>
                </div>
            </div>
        )
    }

    function ProfileSlider(){
        return(
            <div className="image-slider">
                {petDetails ? <img src={petDetails.profileFiles.profilePhoto} /> : <img src={placeholder_image} />}
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
            <div className="header-bg"></div>
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
