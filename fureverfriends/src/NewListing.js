import React, { useState, useEffect } from 'react';
import Header from "./Header";
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

    useEffect(() => {
        M.AutoInit();
        $(document).ready(function(){
            $('select').select();
          });
        
          M.textareaAutoResize($('#about-me'));
      });

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

    function checkFiles(){
        console.log(formState);
        console.log(fileState);
        console.log(profilePhotoURL);
        console.log(additionalPhotoURLS);
        console.log(applicationFileURL);
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
            if(url_count === fileState.total_urls){
                let newListing = {
                    pet_data: formState,
                    profileFiles: {
                        profilePhoto: {profilePhotoURL},
                        additionalPhotos: {additionalPhotoURLS},
                        applicationForm: {applicationFileURL}
                    }
                };
                console.log(newListing);
                createPetListing(newListing);
            }
        } else if (fileState.total_urls === 0){
            console.log("No files");
            let newListing = {
                pet_data: {formState},
                profileFiles: {
                    profilePhoto: "",
                    additionalPhotos: [],
                    applicationForm: ""
                }
            };
            console.log(newListing);
            createPetListing(newListing);
        }
    }

    function createPetListing(listingData){
        console.log(listingData);
        firestore.collection("PetInfo")
            .doc("PublicListings")
            .collection("AdoptionList")
            .doc("PetTypes")
            .collection(listingData.pet_data.type)
            .doc(listingData.pet_data.pet_id)
            .set(listingData)
            .then((docRef) => {
                console.log("Document written");
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
        console.log(urls)

        setFileState({
            ...fileState,
            has_profile_img: (profileFiles.profilePhoto.length > 0),
            num_additional: profileFiles.additionalPhotos.length,
            has_adoption_file: (profileFiles.applicationForm.length > 0),
            total_urls: urls
        });

        console.log(fileState);
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
        // pet information
        let petname = (document.getElementById('petname')).value;
        let pettype = (document.getElementById('type-of-pet')).value;
        let age = (document.getElementById('age')).value;
        let gender = (document.getElementById('gender')).value;
        let breed = (document.getElementById('breed')).value;
        let color = (document.getElementById('color')).value;
        let caredBy = (document.getElementById('cared-by')).value;
        let furLength = (document.getElementById('furLength')).value;
        let adoptionFee = (document.getElementById('adoptionFee')).value;
        let city = (document.getElementById('city')).value;
        let state = (document.getElementById('state')).value;
        let zip = (document.getElementById('zip')).value;
        let aboutMe = (document.getElementById('about-me')).value;

        // user contact information
        let contactName = (document.getElementById('contact-name')).value;
        let contactPhone = (document.getElementById('contact-phone')).value;
        let contactEmail = (document.getElementById('contact-email')).value;
        let contactWebsite = (document.getElementById('contact-website')).value;

        // files from user
        let petProfileImg = (document.getElementById('pet-profile-img')).files;
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
                name: petname,
                type: PFdata.TYPES[pettype],
                age: age,
                breed: breed,
                gender: gender,
                color: color,
                fur_length: furLength,
                photo_url: "",
                additional_photos: [],
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
                applicationForm: "",
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

        createPetListingData(new_pet_id, profileFiles);
    }

    let typeArray = PFdata.TYPES;
      typeArray.unshift("");
      const [petType, setPetType] = useState(typeArray);
      const type = petType.map(type => type)
      const handleChange = (e) => {
          //petColor(petType[e.target.value])
        let petTypeSelected = petType[e.target.value];
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

        M.AutoInit();
      }

    return (
        <div>
            <div className="listings-banner-wrap">
            <div className="listings-banner-img-wrap"></div>
            </div>
                <div className="listings-heading container">
                <h4 className="center-align">Create a profile for your pet</h4>
            </div>
            <div className="listings-profile-pic-wrap listings-section container">
                <h5>Set Profile Picture</h5>
                <h6>This picture will be the main image for your pet and will be seen in the listings page</h6>
                <form action="#">
                    <div className="file-field input-field">
                    <div className="btn">
                        <i className="material-icons">perm_media</i>
                        <input type="file" accept=".gif,.jpg,.jpeg,.png" id="pet-profile-img" onChange={e => preview_image(e)}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload an image (.gif,.jpg,.jpeg,.png)"/>
                    </div>
                    </div>
                </form>
                <img id="output_image"/>
            </div>
            <div className="listings-add-pic-wrap listings-section container">
                <h5>Set Additional Picture</h5>
                <h6>These are any additional pictures of your pet and can be seen in the pet profile page</h6>
                <form action="#">
                    <div className="file-field input-field">
                    <div className="btn">
                        <i className="material-icons">perm_media</i>
                        <input type="file" accept=".jpg,.jpeg,.png" id="pet-add-img" multiple/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload additional image(s) (.gif,.jpg,.jpeg,.png)"/>
                    </div>
                    </div>
                </form>
            </div>
            <div className="listings-pet-info listings-section container">
                <h5>Pet Information</h5>
                <h6>Some dropdowns will autofill upon pet type selection</h6>
                <form className="row">
                    <div className="left-filter col s12 m6 l6 x6">

                        <div className="listings-form-row">
                            <label for="petname">Name: </label>
                            <input type="text" id="petname" name="petname"/>
                        </div>

                        <div className="listings-form-row">
                            <label for="type-of-pet">Type of Pet</label>
                            <select id="type-of-pet" name="type-of-pet" onChange={e => handleChange(e)}>
                                {/*populated using JavaScript (see function petType()*/}
                                {type.map((address, key) => <option value={key}>{address}</option>)}
                            </select>
                        </div>

                        <div className="listings-form-row">
                            <label for="age">Age</label>
                            <select id="age" name="age">
                                <option value="Young">Young</option>
                                <option value="Teen">Teen</option>
                                <option value="Adult">Adult</option>
                            </select>
                        </div>

                        <div className="listings-form-row">
                            <label for="gender">Gender</label>
                            <select id="gender" name="gender">
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>

                        <div className="listings-form-row">
                        <label for="breed">Breed</label>
                        <select id="breed" name="breed">
                            {/*populated using JavaScript*/}
                        </select>
                        </div>

                        <div className="listings-form-row">
                            <label for="color">Color</label>
                            <select id="color" name="color">
                            {/*populated using JavaScript*/}
                            </select>
                        </div>

                        <div className="listings-form-row">
                            <label for="cared-by">Cared By</label>
                            <select id="cared-by" name="cared-by">
                                <option value="Private Owner">Private Owner</option>
                                <option value="Organization/Rescue">Organization/Rescue</option>
                            </select>
                        </div>
                    </div>
                    <div className="right-filter col s12 m6 l6 x6">
                        <div className="listings-form-row">
                            <label for="furLength">Fur Length</label>
                            <select id="furLength" name="furLength">
                                {/*populated using JavaScript*/}
                            </select>
                        </div>

                        <div className="listings-form-row">
                            <label for="personality">Personality</label>
                            <select id="personality" name="personality" multiple>
                                <option value="Quiet">Quiet</option>
                                <option value="Talkative">Talkative</option>
                                <option value="Social">Social</option>
                                <option value="Playful">Playful</option>
                                <option value="Independent">Independent</option>
                                <option value="Curious/Adventurous">Curious/Adventurous</option>
                                <option value="Loves to snuggle">Loves to snuggle</option>
                                <option value="Protective">Protective</option>
                                <option value="Energetic">Energetic</option>
                            </select>
                        </div>

                        <div className="listings-form-row">
                            <label for="adoptionFee">Adoption Fee </label>
                            <input type="text" id="adoptionFee" name="adoptionFee"/>
                        </div>

                        <div className="listings-form-row">
                            <label for="city">City </label>
                            <input type="text" id="city" name="city"/>
                        </div>

                        <div className="listings-form-row">
                            <label for="state">State  </label>
                            <input type="text" id="state" name="state"/>
                        </div>

                        <div className="listings-form-row">
                            <label for="zip">Zip Code </label>
                            <input type="number" id="zip" name="zip"/>
                        </div>

                        <div className="listings-form-row">
                            <label for="attributes">Pet Attributes</label>
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
                        </div>

                    </div>
                </form>
            </div>
            <div className="listings-about-me listings-section container">
                <h5>About me section</h5>
                <h6>Please fill out this section regarding any additional info (such as a backstory!)</h6>
                <form className="row">
                    <div className="input-field col s12">
                        <label for="textarea1">Pet Bio</label>
                        <textarea id="about-me" className="materialize-textarea"></textarea>
                    </div>
                </form>
            </div>

            <div className="listings-contact-info listings-section container">
                <h5>Contact Information</h5>
                <form className="listings-contact-form">
                    <div className="row">
                        <div className="left-filter col s12 m6 l6 x6">
                            <div className="input-field contact-input-wrap">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="contact-name" type="text" className="validate"/>
                                <label for="contact-name">Name </label>
                            </div>
                            <div className="input-field contact-input-wrap">
                                <i className="material-icons prefix">phone</i>
                                <input id="contact-phone" type="text" className="validate"/>
                                <label for="contact-phone">Phone </label>
                            </div>
                        </div>
                        <div className="right-filter col s12 m6 l6 x6">
                            <div className="input-field contact-input-wrap">
                                <i className="material-icons prefix">mail</i>
                                <input id="contact-email" type="text" className="validate"/>
                                <label for="contact-email">Email </label>
                            </div>
                            <div className="input-field contact-input-wrap">
                                <i className="material-icons prefix">language</i>
                                <input id="contact-website" type="text" className="validate"/>
                                <label for="contact-website">Website </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="listings-application-info listings-section container">
                <h5>Application Information</h5>
                <h6>Upload the file that the applicant will be filling out</h6>
                <form action="#">
                    <div className="file-field input-field">
                    <div className="btn">
                        <i className="material-icons">file_present</i>
                        <input type="file" accept=".doc,.docx,.pdf" id="pet-app-form"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload application form"/>
                    </div>
                    </div>
                </form>
            </div>

            <div className="listings-submit-button-wrap container center-align">
                <button className="btn waves-effect waves-light btn-large" type="button" name="action" onClick={() => processFormContents()}>Create Profile
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    )
}