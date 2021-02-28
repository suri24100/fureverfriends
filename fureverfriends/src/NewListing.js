import React, { useState, useEffect } from 'react';
import Header from "./Header";
import './css/style.css';
import './css/newListings.css';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import M from "materialize-css";

//all the data from PetFinderAPI
import test from "./api-modules/constants.js";
console.log("types test: " + test.TYPES.length);

function processFormContents() {
    var petProfileImg = (document.getElementById('pet-profile-img')).value;
    var petAddImg = (document.getElementById('pet-add-img')).value;
    var petname = (document.getElementById('petname')).value;
    var pettype = (document.getElementById('type-of-pet')).value;
    var age = (document.getElementById('age')).value;
    var gender = (document.getElementById('gender')).value;
    var breed = (document.getElementById('breed')).value;
    var color = (document.getElementById('color')).value;
    var caredBy = (document.getElementById('cared-by')).value;
    var furLength = (document.getElementById('furLength')).value;
    var personality = (document.getElementById('age')).value;
    var adoptionFee = (document.getElementById('adoptionFee')).value;
    var city = (document.getElementById('city')).value;
    var state = (document.getElementById('state')).value;
    var zip = (document.getElementById('zip')).value;
    var attributes = (document.getElementById('attributes')).value;
    var aboutMe = (document.getElementById('about-me')).value;
    var contactName = (document.getElementById('contact-name')).value;
    var contactPhone = (document.getElementById('contact-phone')).value;
    var contactEmail = (document.getElementById('contact-email')).value;
    var contactWebsite = (document.getElementById('contact-website')).value;
    var applicationForm = (document.getElementById('pet-app-form')).value;

    const newPetProfile = {
        pet_profile_img: petProfileImg,
        pet_add_img: petAddImg,
        pet_name : petname,
        pet_type : pettype,
        age : age,
        gender : gender,
        breed : breed, 
        color : color,
        caredBy : caredBy,
        furLength : furLength,
        personality : personality,
        adoptionFee : adoptionFee,
        city : city,
        state : state,
        zip : zip,
        attributes : attributes,
        about_me : aboutMe,
        contact_name : contactName,
        contact_phone : contactPhone,
        contact_email : contactEmail,
        contact_website : contactWebsite,
        application_form: applicationForm,
    };

    console.log(newPetProfile);
}

export default function NewListing() {

    useEffect(() => {
        M.AutoInit();
        $(document).ready(function(){
            $('select').select();
          });
        
          M.textareaAutoResize($('#about-me'));
      });

    return (
        <div>
            <div className="listings-banner-wrap">
            <Header/>
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
                        <input type="file" accept=".gif,.jpg,.jpeg,.png" id="pet-profile-img"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload an image (.gif,.jpg,.jpeg,.png)"/>
                    </div>
                    </div>
                </form>
            </div>
            <div className="listings-add-pic-wrap listings-section container">
                <h5>Set Profile Picture</h5>
                <h6>These are any additional pictures of your pet and can be seen in the pet profile page</h6>
                <form action="#">
                    <div className="file-field input-field">
                    <div className="btn">
                        <i className="material-icons">perm_media</i>
                        <input type="file" accept=".gif,.jpg,.jpeg,.png" id="pet-add-img" multiple/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload additional image(s) (.gif,.jpg,.jpeg,.png)"/>
                    </div>
                    </div>
                </form>
            </div>
            <div className="listings-pet-info listings-section container">
                <h5>Pet Information</h5>
                <form className="row">
                    <div className="left-filter col s12 m6 l6 x6">

                        <div className="listings-form-row">
                            <label for="petname">Name: </label>
                            <input type="text" id="petname" name="petname"/>
                        </div>

                        <div className="listings-form-row">
                            <label for="type-of-pet">Type of Pet</label>
                            <select id="type-of-pet" name="type-of-pet">
                                <option value="Cat">Cat</option>
                                <option value="Dog">Dog</option>
                                <option value="HamsterGuinea">Small Furbabies</option>
                                <option value="Rabbit">Rabbit</option>
                                <option value="Fish">Fish</option>
                                <option value="ReptileAmphibians">Reptile and Amphibian</option>
                                <option value="Bird">Bird</option>
                                <option value="Other">Other</option>
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
                            <select id="attributes" name="attributes" multiple>
                                <option value="Vaccinated">Vaccinated</option>
                                <option value="NeuteredSpayed">Neutered/Spayed</option>
                                <option value="PetFriendly">Pet Friendly</option>
                                <option value="5orolder">Good with Kids 5 or older</option>
                                <option value="allKids">Good with all kids</option>
                                <option value="Hypoallergenic">Hypoallergenic</option>
                                <option value="BondedPair">Bonded Pair</option>
                            </select>
                        </div>

                    </div>
                </form>
            </div>
            <div className="listings-about-me listings-section container">
                <h5>About me section</h5>
                <form className="row">
                    <div className="input-field col s12">
                        <label for="textarea1">Please fill out this section regarding any additional info (such as a backstory!)</label>
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
                        <input type="file" accept=".doc,.docx,.txt,.zip,.pdf" id="pet-app-form"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload application form"/>
                    </div>
                    </div>
                </form>
            </div>

            <div className="listings-submit-button-wrap container center-align">
                <button className="btn waves-effect waves-light btn-large" type="submit" name="action" onClick={processFormContents}>Create Profile
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    )
}