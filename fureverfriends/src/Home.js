import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './css/style.css';
import './css/home.css';
import $ from 'jquery';
import M from "materialize-css";
import PFdata from "./api-modules/constants.js";
import {Link, useHistory} from "react-router-dom";

export default function Home() {
    const history = useHistory();

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    useEffect(() => {
        M.AutoInit();
        $(document).ready(function(){
            $('select').select();
          });
      });
      function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
      const [geoData, setGeoData] = useState({});

      const prevGeoData = usePrevious(geoData);

      useEffect(() => {
        if(prevGeoData !== geoData && geoData.lat){
            processFormContents();
        }
      })

      var enableCurrentRadio = false;
    var enableZipRadio = false;
    var currentLocation = {};

    function enableCurrent() {
        enableCurrentRadio = true;
        enableZipRadio = false;
        let locationInput = document.getElementById("location");
        locationInput.style.display = "none";
    }


    function enableZip() {
        enableCurrentRadio = false;
        enableZipRadio = true;
        let locationInput = document.getElementById("location");
        locationInput.style.display = "inline";
        locationInput.style.width = "40%";
        locationInput.style.marginLeft = "8%";
        locationInput.style.marginTop = "-100px";
        locationInput.style.marginBottom = "";
        let addPadding = document.getElementById("addPadding");
        addPadding.style.paddingBottom = "-2vw";
    }

      function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      let typeArray = PFdata.TYPES;
      const [petType, setPetType] = useState(typeArray);
      const type = petType.map(type => type)
      const handleChange = (e) => {
          //petColor(petType[e.target.value])
        let petTypeSelected = petType[e.target.value];
        let breedArray = [];
        if (petTypeSelected == "dog") { 
            for (let i = 0; i < PFdata.DOG.breeds.length; i++) {
                breedArray[i] = PFdata.DOG.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "cat") { 
            for (let i = 0; i < PFdata.CAT.breeds.length; i++) {
                breedArray[i] = PFdata.CAT.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "rabbit") { 
            for (let i = 0; i < PFdata.RABBIT.breeds.length; i++) {
                breedArray[i] = PFdata.RABBIT.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "small_furry") { 
            for (let i = 0; i < PFdata.SMALL_FURRY.breeds.length; i++) {
                breedArray[i] = PFdata.SMALL_FURRY.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "horse") { 
            for (let i = 0; i < PFdata.HORSE.breeds.length; i++) {
                breedArray[i] = PFdata.HORSE.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "bird") { 
            for (let i = 0; i < PFdata.BIRD.breeds.length; i++) {
                breedArray[i] = PFdata.BIRD.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "scales_fins_other") { 
            for (let i = 0; i < PFdata.SCALES_FINS_OTHER.breeds.length; i++) {
                breedArray[i] = PFdata.SCALES_FINS_OTHER.breeds[i].name;
            } 
        }
        else if (petTypeSelected == "barnyard") { 
            for (let i = 0; i < PFdata.BARNYARD.breeds.length; i++) {
                breedArray[i] = PFdata.BARNYARD.breeds[i].name;
            } 
        }
        //console.log(petColorArray.length);

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

    //called from the "find my furever friend" button
    function processFormContents() {
        let pettype = (document.getElementById('type-of-pet')).value;
        let age = (document.getElementById('age')).value;
        let breed = (document.getElementById('breed')).value;
        let location = "";
        if (enableCurrentRadio) {
            location = currentLocation;

        } else if (enableZipRadio) {
            location = (document.getElementById('location')).value;
        }
        const newSearchFilter = {
            type: PFdata.TYPES[pettype],
            age: age.toLowerCase(),
            breed: breed,
            location: location,
            geoData: geoData
            //geodata: geodata
        }

        console.log(newSearchFilter);
        if (type) {
            history.push("/listings/" + PFdata.TYPES[pettype] + "-" + age);
        }
        /*history.push("/listings/" + PFdata.TYPES[pettype] + "-" + age + "-" + breed + "-" + location + "-" + geoData.zip + "-" + geoData.lon + "-" + geoData.lat);*/
    }

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
            var x = {zip: zip, lat: json.city.coord.lat, lon: json.city.coord.lon};
            setGeoData(x);
            
        }).catch((err) => {
            console.log(err.message)
        })
    }

    function getLocation() {
        console.log("Suri Test")
        if (enableZipRadio) {
            let location = document.getElementById("location").value;
            getLocationAsync(location);
        }
        else if (enableCurrentRadio) {
            if (navigator.geolocation) { //check if geolocation is available
                navigator.geolocation.getCurrentPosition(function(position){
                    console.log(position)
                    currentLocation = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }
                  processFormContents();
                });   
            }
        }
    }

    return (
    <div class="home-page">
        <div className="banner-wrap">
        <div className="banner-img-wrap">
            {/*<img className="banner-img" src="home-banner.png">*/}
        </div>
        <div className="heading hide-on-small-only">
            <span>Let us help you find your best friend</span>
        </div>
        <div className="subheading hide-on-small-only">
            <span>Simply search below or take our quiz</span>
        </div>
    </div>
    <div className="search-or-quiz-wrap container hide-on-small-only">
        <form className="row">
            <div className="center-align quiz-wrap col s12 m6 l6 x6">
                <Link class="waves-effect waves-light btn q-btn" to="/quiz">Take The Quiz!</Link>
            </div>
            <div className="search-wrap container col s12 m6 l6 x6">
                <div className="search">
                    <div className="listings-form-row">
                        <label for="type-of-pet">Type of Pet</label>
                        <select id="type-of-pet" name="type-of-pet" onChange={e => handleChange(e)}>
                            <option disabled selected></option>
                            {/*populated using JavaScript (see function petType()*/}
                            {type.map((address, key) => <option value={key}>{address}</option>)}
                        </select>
                    </div>

                    <div className="listings-form-row">
                        <label for="age">Age</label>
                        <select id="age" name="age">
                            <option value="baby">Baby</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>

                    <div className="listings-form-row">
                        <label for="breed">Breed</label>
                        <select id="breed" name="breed">
                            {/*populated using JavaScript*/}
                        </select>
                    </div>

                    <div className="listings-form-row">
                        <label>Location: </label>
                        <p>
                            <label>
                                <input className="home-radio with-gap" name="group1" type="radio" onClick={() => enableCurrent()}/>
                                <span className="lc">Use Current Location</span>
                            </label>
                        </p>
                        <label>
                            <input className="home-radio with-gap" name="group1" type="radio" onClick={() => enableZip()}/>
                            <span className="lc" id="addPadding">Enter Zip Code</span>
                        </label>
                        <input type="number" name="location" id="location" className="locationInput"/> 
                    </div>

                    <div className="search-btn-wrap container">
                    <button className="search-btn" type="button" name="action" onClick={() => getLocation()}>Find My Furever Friend!</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div className="search-or-quiz-wrap-mobile container center-align hide-on-med-and-up">
        <h4>Let us help you find your best friend!</h4>
        <a class="waves-effect waves-light btn q-btn ">Take The Quiz!</a>
        <p className="subheading-mobile">OR search below!</p>
        <div className="search-wrap container">
            <div className="row1 row">
                <div className="listings-form-row">
                    <label for="type-of-pet">Type of Pet</label>
                    <select id="type-of-pet" name="type-of-pet" onChange={e => handleChange(e)}>
                        <option disabled selected></option>
                        {/*populated using JavaScript (see function petType()*/}
                        {type.map((address, key) => <option value={key}>{address}</option>)}
                    </select>
                </div>
            </div>
            <div className="row2 row">
                <div className="listings-form-row">
                    <label for="age">Age</label>
                    <select id="age" name="age">
                        <option value="baby">Baby</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
            </div>
            <div className="row3 row">
                <div className="listings-form-row">
                    <label for="breed">Breed</label>
                    <select id="breed" name="breed">
                        {/*populated using JavaScript*/}
                    </select>
                </div>
            </div>
            <p>Location:</p>
            <div className="row4 row"> 
                <div className="listings-form-row col s12 left-align">
                    <label>
                        <input className="home-radio with-gap" name="group1" type="radio" onClick={() => enableCurrent()}/>
                        <span className="lc">Use Current Location</span>
                    </label>
                </div>
            </div>
            <div className="row5 row">
                <div className="listings-form-row col s12 left-align">
                    <label>
                        <input className="home-radio with-gap" name="group1" type="radio" onClick={() => enableZip()}/>
                        <span className="lc" id="addPadding">Enter Zip Code</span>
                    </label>
                    <input type="number" name="location" id="location" className="locationInput"/> 
                </div>
            </div>
            <div className="search-btn-wrap container">
                <button className="search-btn" type="button" name="action" onClick={() => getLocation()}>Find My Furever Friend!</button>
            </div>
        </div>
    </div>
    <div className="lost-and-found-wrap">
        <div className="lost-and-found-img">
            <img className="ls-img" src="./images/lost-and-found.png"/>
        </div>
        <div className="heading">
            <p>Looking to rehome a friend?</p>
        </div>
        <div className="subheading">
            <p>Let us help you find their next family! Fill out information regarding your pet to create a listing using the link below! Note that adoptees must have an account with Furever Friends.
            </p>
        </div>
        <div className="lost-and-found-button default">
            <Link to="/findahome"><button className="ls-btn"><span>Rehome Pet</span></button></Link>
        </div>
    </div>
    <div className="newsletters-wrap">
        <div className="news-img-wrap">
            {/*<img className="news-img" src="./pexels-jayden-burdick-3397935.png" />*/}
        </div>
        <div className="heading">
            <a href="#" className="about-us-btn">About Us</a>
        </div>
        <div className="subheading">
            <p>Learn more about this website and it's creators!</p>
        </div>
    </div>
    </div>
    )
}
