import React, { useState, useEffect, useLayoutEffect } from 'react';
import './css/style.css';
import './css/newListings.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import M from "materialize-css";

//all the data from PetFinderAPI
import PFdata from "./api-modules/constants.js";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";

// test code for creating a listing
import db, {firestore, storage} from "./ffdb";
import 'firebase/storage';
import {useAuth} from "./AuthContext";
import {Link} from "react-router-dom";

var globalZip = "";

/* code from: http://talkerscode.com/webtricks/preview-image-before-upload-using-javascript.php */
function preview_image(event) {
    let reader = new FileReader();
    reader.onload = function() {
        let output = document.getElementById('output_image');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function NewListing() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    useEffect(() => {
        M.AutoInit();
        $(document).ready(function(){
            $('select').select();
          });
        if(USER.email.length > 0){
            M.textareaAutoResize($('#about-me'));
            setLoggedIn(true);
            setPageLoaded(true);
        }
        else if(USER.email === ""){
            setPageLoaded(true);
        }
    });

    const {USER} = useAuth();

    const [pageLoaded, setPageLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [listingSaved, setListingSaved] = useState(false);
    let processing = false;
    const [petInfo, setPetInfo] = useState({
        pet_name: "",
        profile_url: "",
        pet_id: ""
    });
    const [dynamicDescription, setDynamicDescription] = useState({
        content: "",
        rating: -1,
    });
    useEffect(() => {
        console.log(dynamicDescription.content)
    }, [dynamicDescription.content])
    const [formState, setFormState] = useState(null);
    const [fileState, setFileState] = useState({
        has_profile_img: false,
        num_additional: false,
        has_adoption_file: false,
        total_urls: -1
    });
    useEffect(() => {
        checkFiles();
    });
    const [profilePhotoURL, setProfilePhotoURL] = useState("");
    useEffect(() => {
        checkFiles();
    });
    const [additionalPhotoURLS, setAdditionalProfileURLS] = useState([]);
    useEffect(() => {
        checkFiles();
    });
    const [applicationFileURL, setApplicationFileURL] = useState("");
    useEffect(() => {
        checkFiles();
    });

    const [geoData, setGeoData] = useState({});

    //FINDING LONG AND LAT FOR ZIP CODE (API STUFF)
    function getLocationAsync(zip) {
        const apikey = '317f5c81a3241fbb45bbf57e335d466d';
        const path = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&appid=${apikey}`;
        
        return fetch(path)
        .then((res) => {
            return res.json()
        }).then((json) => {
            //console.log(JSON.stringify(json,null,2))
            //console.log(json)
            //console.log(json.city.coord);
            //getLocation(json.city.coord)
            setGeoData(json.city.coord);
            
        }).catch((err) => {
            console.log(err.message)
        })
    }

    function checkFiles(){
        let url_count = 0;
        if(fileState.total_urls > 0){
            if(fileState.has_profile_img && profilePhotoURL.length > 0){
                url_count++;
            }
            if(fileState.num_additional === additionalPhotoURLS.length){
                url_count += fileState.num_additional;
            }
            if(fileState.has_adoption_file && applicationFileURL.length > 0){
                url_count++;
            }
            // correct number received
            if(url_count === fileState.total_urls && !processing){
                processing = true;
                getLocationAsync(globalZip);
                console.log(globalZip);
                console.log("suri 4/11: " + geoData.lat)
                let newListing = {
                    lat: geoData.lat,
                    lon: geoData.lon,
                    pet_data: formState,
                    published_at: new Date().toJSON(),
                    profileFiles: {
                        profilePhoto: {profilePhotoURL},
                        additionalPhotos: {additionalPhotoURLS},
                        applicationForm: {applicationFileURL}
                    }
                };
                createPetListing(newListing);
            }
        } else if (fileState.total_urls === 0 && !processing){
            console.log("No files");
            processing = true;
            /*getLocationAsync(globalZip);
            console.log(globalZip);
            console.log("suri 4/11: " + geoData.lat)*/
            let newListing = {
                lat: geoData.lat,
                lon: geoData.lon,
                published_at: new Date().toJSON(),
                pet_data: {formState},
                profileFiles: {
                    profilePhoto: "",
                    additionalPhotos: [],
                    applicationForm: ""
                }
            };
            createPetListing(newListing);
        }
    }

    function createPetListing(listingData){
        console.log(listingData);
        console.log(listingData.pet_data.type);
        console.log(listingData.pet_data.pet_id);

        firestore.collection("PetInfo")
            .doc("PublicListings")
            .collection("AdoptionList")
            .doc("PetTypes")
            .collection(listingData.pet_data.type)
            .doc(listingData.pet_data.pet_id)
            .set(listingData)
            .then((docRef) => {
                console.log("Document written");
                setListingSaved(true);
                let newPetListings = USER.pet_listings.map(item => item);
                newPetListings.push({id: petInfo.pet_id, type: listingData.pet_data.type});
                console.log(newPetListings);
                const userRef = firestore.collection("UserInfo")
                    .doc(USER.email);
                let setWithMerge = userRef.set({
                    pet_listings: newPetListings
                }, {merge: true});
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
        });
    }

    async function uploadFile(file, metadata, filepath, listingReference){
        // Create a root reference
        let storageRef = storage.ref();
        let uploadTask = storageRef.child(filepath).put(file, metadata);
        let download_url = "";
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused': // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case 'running': // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    if(listingReference === "additional_image_urls"){
                        let tmp = additionalPhotoURLS;
                        tmp.push(downloadURL);
                        setAdditionalProfileURLS(tmp);
                    } else if (listingReference === "profile_image_url"){
                        setProfilePhotoURL(downloadURL);
                    } else if (listingReference === "adoption_file_url") {
                        setApplicationFileURL(downloadURL);
                    }
                });
            }
        );
    }

    function createPetListingData(newPetID, profileFiles){

        const urls = (profileFiles.profilePhoto.length +
            profileFiles.additionalPhotos.length +
            profileFiles.applicationForm.length);

        setFileState({
            ...fileState,
            has_profile_img: (profileFiles.profilePhoto.length > 0),
            num_additional: profileFiles.additionalPhotos.length,
            has_adoption_file: (profileFiles.applicationForm.length > 0),
            total_urls: urls
        });

        let metadata = {};
        let filepath = "";
        // handle images to get URLs for profile data
        if(profileFiles.profilePhoto.length > 0) {
            const profile_image = profileFiles.profilePhoto[0];
            // Create a reference to image name
            switch (profile_image.type) {
                case "image/png":
                    metadata = {
                        contentType: 'image/png'
                    };
                    filepath = "listings/profiles/" + newPetID + "/img1.png";
                    break;
                case"image/jpeg":
                    metadata = {
                        contentType: 'image/jpeg'
                    };
                    filepath = "listings/profiles/" + newPetID + "/img1.jpeg";
                    break;
                case "image/jpg":
                    metadata = {
                        contentType: 'image/jpg'
                    };
                    filepath = "listings/images/" + newPetID + "/img1.jpg";
                    break;
                default:
                    console.log("Error: unhandled image type")
            }
            uploadFile(profile_image, metadata, filepath, "profile_image_url");
        }
        for(let photoIndex = 0; photoIndex < profileFiles.additionalPhotos.length; photoIndex++) {
            const profile_image = profileFiles.additionalPhotos[photoIndex];
            // Create the file metadata
            metadata = {};
            filepath = "";
            // Create a reference to image name
            switch (profile_image.type) {
                case "image/png":
                    metadata = {
                        contentType: 'image/png'
                    };
                    filepath = "listings/profiles/" + newPetID + "/img" + (photoIndex + 2) + ".png";
                    break;
                case"image/jpeg":
                    metadata = {
                        contentType: 'image/jpeg'
                    };
                    filepath = "listings/profiles/" + newPetID + "/img" + (photoIndex + 2) + ".jpeg";
                    break;
                case "image/jpg":
                    metadata = {
                        contentType: 'image/jpg'
                    };
                    filepath = "listings/images/" + newPetID + "/img" + (photoIndex + 2) + ".jpg";
                    break;
                default:
                    console.log("Error: unhandled image type")
            }
            uploadFile(profile_image, metadata, filepath, "additional_image_urls");
        }
        if(profileFiles.applicationForm.length > 0) {
            const file = profileFiles.applicationForm[0];
            // Create a reference to image name
            switch (file.type) {
                case "application/pdf":
                    metadata = {
                        contentType: 'application/pdf'
                    };
                    filepath = "listings/profiles/" + newPetID + "/application_file.pdf";
                    break;
                case"image/jpeg":
                    metadata = {
                        contentType: 'application/doc'
                    };
                    filepath = "listings/profiles/" + newPetID + "/application_file.doc";
                    break;
                case "application/docx":
                    metadata = {
                        contentType: 'application/docx'
                    };
                    filepath = "listings/images/" + newPetID + "/application_file.docx";
                    break;
                default:
                    console.log("Error: unhandled image type")
            }
            uploadFile(file, metadata, filepath, "adoption_file_url");
        }
    }

    function processFormContents() {
        const errorCheck = document.getElementById("form-error-contents");
        document.getElementById("submit-button").disabled = true;
        if(errorCheck) {errorCheck.remove()}
        let requirementsMet = true;
        // pet information
        // REQUIRED
        let petProfileImg = (document.getElementById('pet-profile-img')).files;
        console.log(petProfileImg)
        if(petProfileImg.length === 0) {
            document.getElementById('pet-profile-img-input').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('pet-profile-img-input').classList.remove('invalid');
        }
        let petname = (document.getElementById('petname')).value;
        if(petname === "") {
            document.getElementById('petname').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('petname').classList.remove('invalid');
        }
        let pettype = (document.getElementById('type-of-pet')).value;
        if(pettype === "") {
            document.getElementById('type-of-pet').parentElement.classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('type-of-pet').parentElement.classList.remove('invalid');
        }
        let caredBy = (document.getElementById('cared-by')).value;
        if(caredBy === "") {
            document.getElementById('cared-by').parentElement.classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('cared-by').parentElement.classList.remove('invalid');
        }
        let adoptionFee = (document.getElementById('adoptionFee')).value;
        if(adoptionFee === "") {
            document.getElementById('adoptionFee').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('adoptionFee').classList.remove('invalid');
        }
        let city = (document.getElementById('city')).value;
        if(city === "") {
            document.getElementById('city').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('city').classList.remove('invalid');
        }
        let state = (document.getElementById('state')).value;
        if(state === "") {
            document.getElementById('state').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('state').classList.remove('invalid');
        }
        let zip = (document.getElementById('zip')).value;
        //globalZip = zip;
        if(zip === "") {
            document.getElementById('zip').classList.add('invalid');
            requirementsMet = false;
        } else {
            getLocationAsync(zip);
            document.getElementById('zip').classList.remove('invalid');
        }
        let contactName = (document.getElementById('contact-name')).value;
        if(contactName === "") {
            document.getElementById('contact-name').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('contact-name').classList.remove('invalid');
        }
        let contactEmail = (document.getElementById('contact-email')).value;
        if(contactEmail === "") {
            document.getElementById('contact-email').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('contact-email').classList.remove('invalid');
        }
        let aboutMe = (document.getElementById('about-me')).value;
        if(aboutMe === "") {
            document.getElementById('about-me').classList.add('invalid');
            requirementsMet = false;
        } else {
            document.getElementById('about-me').classList.remove('invalid');
        }

        if(requirementsMet) {
            // NOT REQUIRED
            let age = (document.getElementById('age')).value;
            let gender = (document.getElementById('gender')).value;
            let breed = (document.getElementById('breed')).value;
            let color = (document.getElementById('color')).value;
            let furLength = (document.getElementById('furLength')).value;
            let contactPhone = (document.getElementById('contact-phone')).value;
            let contactWebsite = (document.getElementById('contact-website')).value;

            // files from user
            let petAddImg = (document.getElementById('pet-add-img')).files;
            let applicationForm = (document.getElementById('pet-app-form')).files;

            // get attributes separately for database structure
            const attributesField = document.getElementById('attributes')
            const attributes = [...attributesField.options]
                .filter(option => option.selected)
                .map(option => option.value);
            const personalityField = document.getElementById('personality');
            const personality = [...personalityField.options]
                .filter(option => option.selected)
                .map(option => option.value);

            // create an ID for the pet
            const new_pet_id = Date.now().toString();

            const newPetListing = {
                petfinder_listing: false,
                pet_id: new_pet_id,
                account_info: {
                    username: USER.username,
                    email: USER.email
                },
                listing_type: "AdoptionList",
                name: petname,
                type: PFdata.TYPES[pettype],
                age: age,
                breed: breed,
                gender: gender,
                color: color,
                fur_length: furLength,
                profile_url: "",
                location: {
                    zipcode: zip,
                    city: city,
                    state: state
                },
                cared_by: caredBy,
                contact: {
                    name: contactName,
                    email: contactEmail,
                    phone: contactPhone,
                    website: contactWebsite
                },
                personality: personality,
                good_with_cats: attributes.includes("good_with_cats"),
                good_with_dogs: attributes.includes("good_with_dogs"),
                kid_friendly: attributes.includes("kid_friendly"),
                vaccinated: attributes.includes("vaccinated"),
                spayed_neutered: attributes.includes("spayed_neutered"),
                bonded_pair: attributes.includes("bonded_pair"),
                allergy_friendly: attributes.includes("allergy_friendly"),
                special_needs: attributes.includes("special_needs"),
                adoption_fee: adoptionFee,
                tags: [],
                description: aboutMe,
                listing_created: new Date().toJSON()
            }
            const profileFiles = {
                profilePhoto: petProfileImg,
                additionalPhotos: petAddImg,
                applicationForm: applicationForm
            }

            setFormState(newPetListing);
            setFileState({
                ...fileState,
                pet_data: newPetListing
            });

            setPetInfo({
                pet_name: newPetListing.name,
                profile_url: "/listings/" + newPetListing.type + "/profile/FF-" + newPetListing.pet_id,
                pet_id: newPetListing.pet_id
            })

            createPetListingData(new_pet_id, profileFiles);
        }
        else{
            document.getElementById("submit-button").disabled = false;
            const errorMessage = <p>Oops! You missed some required information above.
                <br/>Please fill it in before submitting.</p>;
            const newP = document.createElement("p");
            newP.setAttribute("id", "form-error-contents");
            newP.innerHTML = "Oops! You missed some required information above. <br/> Please fill it in before submitting.";
            document.getElementById("form-error-message").appendChild(newP);
        }
    }

    let typeArray = PFdata.TYPES;
    const type = typeArray.map(type => type)
    const handleChange = (e) => {

        let petTypeSelected = type[e.target.value];
        let petColorArray = [];
        let furLengthArray = [];
        let breedArray = [];
        if (petTypeSelected == "dog") {
            petColorArray = PFdata.DOG.colors;
            furLengthArray = PFdata.DOG.coats;
            for (let i = 0; i < PFdata.DOG.breeds.length; i++) {
                breedArray[i] = PFdata.DOG.breeds[i].name;
            }
        }
        else if (petTypeSelected == "cat") {
            petColorArray = PFdata.CAT.colors;
            furLengthArray = PFdata.CAT.coats;
            for (let i = 0; i < PFdata.CAT.breeds.length; i++) {
                breedArray[i] = PFdata.CAT.breeds[i].name;
            }
        }
        else if (petTypeSelected == "rabbit") {
            petColorArray = PFdata.RABBIT.colors;
            furLengthArray = PFdata.RABBIT.coats;
            for (let i = 0; i < PFdata.RABBIT.breeds.length; i++) {
                breedArray[i] = PFdata.RABBIT.breeds[i].name;
            }
        }
        else if (petTypeSelected == "small_furry") {
            petColorArray = PFdata.SMALL_FURRY.colors;
            furLengthArray = PFdata.SMALL_FURRY.coats;
            for (let i = 0; i < PFdata.SMALL_FURRY.breeds.length; i++) {
                breedArray[i] = PFdata.SMALL_FURRY.breeds[i].name;
            }
        }
        else if (petTypeSelected == "horse") {
            petColorArray = PFdata.HORSE.colors;
            furLengthArray = ["Not Applicable"];
            for (let i = 0; i < PFdata.HORSE.breeds.length; i++) {
                breedArray[i] = PFdata.HORSE.breeds[i].name;
            }
        }
        else if (petTypeSelected == "bird") {
            petColorArray = PFdata.BIRD.colors;
            furLengthArray = ["Not Applicable"];
            for (let i = 0; i < PFdata.BIRD.breeds.length; i++) {
                breedArray[i] = PFdata.BIRD.breeds[i].name;
            }
        }
        else if (petTypeSelected == "scales_fins_other") {
            petColorArray = PFdata.SCALES_FINS_OTHER.colors;
            furLengthArray = ["Not Applicable"];
            for (let i = 0; i < PFdata.SCALES_FINS_OTHER.breeds.length; i++) {
                breedArray[i] = PFdata.SCALES_FINS_OTHER.breeds[i].name;
            }
        }
        else if (petTypeSelected == "barnyard") {
            petColorArray = PFdata.BARNYARD.colors;
            furLengthArray = PFdata.BARNYARD.coats;
            for (let i = 0; i < PFdata.BARNYARD.breeds.length; i++) {
                breedArray[i] = PFdata.BARNYARD.breeds[i].name;
            }
        }

    //console.log(petColorArray.length);

    let petColorSelect = document.getElementById('color');
    while (petColorSelect.firstChild) {
        petColorSelect.removeChild(petColorSelect.firstChild);
    }
    for (let i = 0; i < petColorArray.length; i++) {
        let petOption = document.createElement('option');
        petOption.innerHTML = capitalize(petColorArray[i]);
        petOption.value = petColorArray[i];
        petOption.setAttribute("id", "petTypeOption");
        petColorSelect.appendChild(petOption);
    }
    petColorSelect.disabled = false;

    let petFurSelect = document.getElementById('furLength');
    while (petFurSelect.firstChild) {
        petFurSelect.removeChild(petFurSelect.firstChild);
    }
    for (let i = 0; i < furLengthArray.length; i++) {
        let petOption = document.createElement('option');
        petOption.innerHTML = capitalize(furLengthArray[i]);
        petOption.value = petColorArray[i];
        petOption.setAttribute("id", "petTypeOption");
        petFurSelect.appendChild(petOption);
    }
    petFurSelect.disabled = false;

    let breedSelect = document.getElementById('breed');
    while (breedSelect.firstChild) {
        breedSelect.removeChild(breedSelect.firstChild);
    }
    for (let i = 0; i < breedArray.length; i++) {
        let petOption = document.createElement('option');
        petOption.innerHTML = capitalize(breedArray[i]);
        petOption.value = breedArray[i];
        petOption.setAttribute("id", "petTypeOption");
        breedSelect.appendChild(petOption);
    }
    breedSelect.disabled = false;

    M.AutoInit();
  }
    const handleDescription = (info) => {
        const userInput = info.target.value;
        setDynamicDescription({
            ...dynamicDescription,
            content: userInput
        });
        // DEMO ONLY, setting the ratings by length
        let tempRating = -1;
        if(userInput.length > 100){
            tempRating = 4;
        }
        else if(userInput.length > 75){
            tempRating = 3;
        }
        else if(userInput.length > 50){
            tempRating = 2;
        }
        else if(userInput.length > 25){
            tempRating = 1;
        }
        else if(userInput.length > 10){
            tempRating = 0;
        }
        setDynamicDescription({
            ...dynamicDescription,
            rating: tempRating
        });
    }

    return (
        <div className="create-profile">
            <div className="listings-banner-wrap">
            </div>
            <div className="container">
            <div className="listings-heading">
                <h4 className="center">Create a profile for your pet</h4>
                <p className="intro-text">Profiles are public listings that help your animal find its Furever Friend.
                    Please include as much information about him or her as possible.
                    That information will help us find the purrfect match.
                </p>
            </div>
                {pageLoaded ?
                    <>{loggedIn ?
                        <>
                        {listingSaved ?
                            <div className="row">
                                <div className="col s12 m8 offset-m2 login-required">
                                    <div className="col s12 center">
                                        <h5>{petInfo.pet_name}'s profile has been created!</h5>
                                        <Link className="btn-large" to={petInfo.profile_url}>Check it Out</Link>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row form-container">
                                    <div className="divider"></div>
                                    <div className="listings-profile-pic-wrap listings-section">
                                        <h5>Set Profile Picture</h5>
                                        <p>This will be the most prominent picture of your pet. Choose your favorite to go here!</p>
                                        <form>
                                            <div className="file-field input-field">
                                                <div className="btn">
                                                    <i className="material-icons">perm_media</i>
                                                    <input type="file" accept=".gif,.jpg,.jpeg,.png"
                                                           id="pet-profile-img" onChange={e => preview_image(e)}/>
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text" id="pet-profile-img-input" className="validate"
                                                           placeholder="Upload an image (.gif,.jpg,.jpeg,.png)"/>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>
                                            </div>
                                        </form>
                                        <img id="output_image"/>
                                    </div>
                                    <div className="listings-add-pic-wrap listings-section">
                                        <h5>Set Additional Picture</h5>
                                        <p>Got more photos you want to display? Add them here.</p>
                                        <form action="#">
                                            <div className="file-field input-field">
                                                <div className="btn">
                                                    <i className="material-icons">perm_media</i>
                                                    <input type="file" accept=".jpg,.jpeg,.png" id="pet-add-img"
                                                           multiple/>
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text"
                                                           placeholder="Upload additional image(s) (.gif,.jpg,.jpeg,.png)"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="listings-pet-info listings-section">
                                        <h5>Pet Information</h5>
                                        <p>This section provides an overview about your pet. Many of the fields, including personality, help your pet show up more in searches and matches.</p>
                                        <form className="row">
                                            <div className="left-filter col s12 m6 l6 x6">
                                                <div className="input-field">
                                                    <label htmlFor="petname" className="active">Name</label>
                                                    <input type="text" id="petname" name="petname" className="validate"/>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>
                                                <div className="input-field">
                                                    <label htmlFor="type-of-pet" className="active">Type of Pet</label>
                                                    <select id="type-of-pet" name="type-of-pet" className="validate"
                                                            onChange={e => handleChange(e)}>
                                                        <option value="" disabled selected> </option>
                                                        {type.map((address, key) =>
                                                            <option value={key}>{address}</option>)}
                                                    </select>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="age" className="active">Age</label>
                                                    <select id="age" name="age">
                                                        <option value="" disabled selected></option>
                                                        <option value="Young">Young</option>
                                                        <option value="Teen">Teen</option>
                                                        <option value="Adult">Adult</option>
                                                    </select>
                                                    <span className="helper-text"></span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="gender" className="active">Gender</label>
                                                    <select id="gender" name="gender">
                                                        <option value="" disabled selected> </option>
                                                        <option value="Female">Female</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Unknown">Unknown</option>
                                                    </select>
                                                    <span className="helper-text"></span>
                                                </div>

                                                <div className="input-field">
                                                    <label idhtmlFor="breed" className="active">Breed</label>
                                                    <select id="breed" name="breed" disabled="disabled">
                                                    </select>
                                                    <span className="helper-text"></span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="color" className="active">Color</label>
                                                    <select id="color" name="color" disabled="disabled">
                                                        {/*populated using JavaScript*/}
                                                    </select>
                                                    <span className="helper-text"></span>
                                                </div>
                                                <div className="input-field">
                                                    <label htmlFor="furLength" className="active">Fur Length</label>
                                                    <select id="furLength" name="furLength" disabled="disabled">
                                                        {/*populated using JavaScript*/}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="right-filter col s12 m6 l6 x6">
                                                <div className="input-field">
                                                    <label htmlFor="cared-by" className="active">Cared By</label>
                                                    <select id="cared-by" name="cared-by" className="validate">
                                                        <option value="" disabled selected> </option>
                                                        <option value="Private Owner">Private Owner</option>
                                                        <option value="Organization/Rescue">Organization or Rescue</option>
                                                    </select>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>


                                                <div className="input-field">
                                                    <label htmlFor="adoptionFee" className="active">Adoption Fee </label>
                                                    <input type="text" id="adoptionFee" name="adoptionFee" className="validate"/>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="city" className="active">City </label>
                                                    <input type="text" id="city" name="city" className="validate"/>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>

                                                <div className="input-field" >
                                                    <label htmlFor="state" className="active">State </label>
                                                    <input type="text" id="state" name="state" className="validate"/>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="zip" className="active">Zip Code </label>
                                                    <input type="number" id="zip" name="zip" className="validate"/>
                                                    <span className="helper-text" data-error="Required">Required</span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="personality" className="active">Personality</label>
                                                    <select id="personality" name="personality" multiple>
                                                        <option value="playful">Playful</option>
                                                        <option value="talkative">Talkative</option>
                                                        <option value="adventurous">Adventurous</option>
                                                        <option value="affectionate">Affectionate</option>
                                                        <option value="independent">Independent</option>
                                                        <option value="energetic">Energetic</option>
                                                        <option value="calm">Calm</option>
                                                        <option value="protective">Protective</option>
                                                        <option value="quiet">Quiet</option>
                                                        <option value="social">Social</option>
                                                    </select>
                                                    <span className="helper-text"></span>
                                                </div>

                                                <div className="input-field">
                                                    <label htmlFor="attributes" className="active">Pet Attributes</label>
                                                    <select id="attributes" name="attributes" multiple="multiple">
                                                        <option value="vaccinated">Vaccinated</option>
                                                        <option value="spayed_neutered">Neutered/Spayed</option>
                                                        <option value="good_with_cats">Good with Cats</option>
                                                        <option value="good_with_dogs">Good with Dogs</option>
                                                        <option value="kid_friendly">Good with Kids</option>
                                                        <option value="special_needs">Special Needs</option>
                                                        <option value="special_needs">Allergy Friendly</option>
                                                        <option value="bonded_pair">Bonded Pair</option>
                                                    </select>
                                                    <span className="helper-text"></span>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="listings-about-me listings-section">
                                            <h5>About Me</h5>
                                            <p>Just like humans, all animals have their own unique personality, likes, dislikes, and backstory.
                                                Sharing those details here will help your pet find a human that can give them them the
                                                kind of life they need and want.
                                            </p>
                                            <form className="row">
                                                <div className="input-field col s12">
                                                <label htmlFor="about-me">Pet Description</label>
                                                <textarea id="about-me" className="materialize-textarea validate"
                                                          required="required"
                                                          onChange={handleDescription}></textarea>
                                                <span className="helper-text" data-error="Required">Required</span>
                                            </div>
                                                <div className="col s12 description-note">
                                                <span className="match-title">Matchability Rating: </span>
                                                <span className="match-stars tooltipped" data-position="bottom" data-html="true" data-tooltip={(dynamicDescription.rating + 1) + " out of 5 stars"}>
                                                    <i className={"material-icons " + ((dynamicDescription.rating < 0) ? "" : "filled-star")}>{(dynamicDescription.rating < 0) ? 'star_outline' : 'star' }</i>
                                                    <i className={"material-icons " + ((dynamicDescription.rating < 1) ? "" : "filled-star")}>{(dynamicDescription.rating < 1) ? 'star_outline' : 'star' }</i>
                                                    <i className={"material-icons " + ((dynamicDescription.rating < 2) ? "" : "filled-star")}>{(dynamicDescription.rating < 2) ? 'star_outline' : 'star' }</i>
                                                    <i className={"material-icons " + ((dynamicDescription.rating < 3) ? "" : "filled-star")}>{(dynamicDescription.rating < 3) ? 'star_outline' : 'star' }</i>
                                                    <i className={"material-icons " + ((dynamicDescription.rating < 4) ? "" : "filled-star")}>{(dynamicDescription.rating < 4) ? 'star_outline' : 'star' }</i>
                                                </span>
                                                <a className="material-icons right modal-trigger" href="#rating_modal">help_outline</a>
                                                <div id="rating_modal" className="modal">
                                                    <div className="modal-content">
                                                        <h4>What is a Matchability Rating?</h4>
                                                        <p>Research suggests that certain types of profile content can help a pet get adopted more quickly.
                                                        Using that research, combined with our Artificial Intelligence software, FureverFriends analyzes your pet's About Me description and gives it
                                                        a rating based on how well it matches other successful adoption profiles. The higher the rating, the better
                                                        the odds that your pet will find their Furever Friend.</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <a href="#!"
                                                           className="modal-close btn-flat">Done</a>
                                                    </div>
                                                </div>
                                            </div>
                                            </form>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="listings-contact-info listings-section ">
                                        <h5>Contact Information</h5>
                                        <p>This contact information will be posted publicly on the profile to allow
                                            potential adopters to contact you with questions and inquiries. </p>
                                        <form className="row">
                                                <div className="left-filter col s12 m6 l6 x6">
                                                    <div className="input-field">
                                                        <i className="material-icons prefix">account_circle</i>
                                                        <input id="contact-name" type="text" className="validate"/>
                                                        <label htmlFor="contact-name">Name</label>
                                                        <span className="helper-text" data-error="Required">Required</span>
                                                    </div>
                                                    <div className="input-field">
                                                        <i className="material-icons prefix">phone</i>
                                                        <input id="contact-phone" type="text" className="validate"/>
                                                        <label htmlFor="contact-phone">Phone</label>
                                                        <span className="helper-text"></span>
                                                    </div>
                                                </div>
                                                <div className="right-filter col s12 m6 l6 x6">
                                                    <div className="input-field">
                                                        <i className="material-icons prefix">mail</i>
                                                        <input id="contact-email" type="text" className="validate"/>
                                                        <label htmlFor="contact-email">Email</label>
                                                        <span className="helper-text" data-error="Required">Required</span>
                                                    </div>
                                                    <div className="input-field">
                                                        <i className="material-icons prefix">language</i>
                                                        <input id="contact-website" type="text" className="validate"/>
                                                        <label htmlFor="contact-website">Website</label>
                                                        <span className="helper-text"></span>
                                                    </div>
                                                </div>
                                        </form>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="listings-application-info listings-section">
                                        <h5>Application Information</h5>
                                        <p>Upload a file for the applicant to fill out when they're interested in adopting.</p>
                                        <form className="row" action="#">
                                            <div className="file-field input-field">
                                                <div className="btn">
                                                    <i className="material-icons">file_present</i>
                                                    <input type="file" accept=".doc,.docx,.pdf" id="pet-app-form"/>
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text"
                                                           placeholder="Upload application form"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="listings-submit-button-wrap center-align">
                                        <button className="btn btn-large" type="button" id="submit-button"
                                                name="action" onClick={processFormContents}>Create Profile
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                    <div id="form-error-message" className="row center red-text"></div>
                                </div>
                        }</>
                        :
                        <div className="row">
                            <div className="col s12 m8 offset-m2 login-required">
                                <div className="col s12 center">
                                    <p className="intro-text">To create a profile, please login or create an account.</p>
                                    <Link to="/login" className="btn-large">Login</Link>
                                    <p>OR</p>
                                    <Link to="/CreateAccount" className="btn-large">Create an Account</Link>
                                </div>
                            </div>
                        </div>
                    }</>
                    :
                    <div className="row"></div>
                }

            </div>
        </div>
    )
}
