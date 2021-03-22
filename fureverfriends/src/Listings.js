import React, {useEffect, useState, Component, useReducer, useRef} from 'react';
import Header from "./Header";
import './css/style.css';
import './css/listings.css';
import {getFilteredListings, getTypeListing} from "./api-modules/PetfinderAPI";
import {forEach} from "react-bootstrap/ElementChildren";
import {Link, useRouteMatch} from "react-router-dom";
import PFdata from "./api-modules/constants.js";
import M from "materialize-css";
import placeholder_image from "./images/petProfiles/default-placeholder-image.png";
import {firestore} from "./ffdb";

function PetCard(props){
    const petInfo = props.petInfo;
    let formattedPetInfo = {};
    // FF pet listing
    if(petInfo.pet_data){
        console.log(petInfo);
        formattedPetInfo = {
            petfinder_listing: false,
            pet_id: petInfo.pet_data.pet_id,
            account_info: {
                id: "",
                email: ""
            },
            listing_type: petInfo.pet_data.listing_type,
                name: petInfo.pet_data.name,
                type: petInfo.pet_data.type,
                age: petInfo.pet_data.age,
                breed: petInfo.pet_data.breed,
                gender: petInfo.pet_data.gender,
                color: petInfo.pet_data.color,
                fur_length: petInfo.pet_data.fur_length,
                profile_url: petInfo.pet_data.profile_url,
                location: {
                zipcode: petInfo.pet_data.location.zipcode,
                    city: petInfo.pet_data.location.city,
                    state: petInfo.pet_data.state
            },
            cared_by: petInfo.pet_data.cared_by,
                contact: {
                name: petInfo.pet_data.contact.name,
                email: petInfo.pet_data.contact.email,
                phone: petInfo.pet_data.contact.phone,
                website: petInfo.pet_data.website
            },
            personality: petInfo.pet_data.personality,
            good_with_cats: petInfo.pet_data.good_with_cats,
            good_with_dogs: petInfo.pet_data.good_with_dogs,
            kid_friendly: petInfo.pet_data.kid_friendly,
            vaccinated: petInfo.pet_data.vaccinated,
            spayed_neutered: petInfo.pet_data.spayed_neutered,
            bonded_pair: petInfo.pet_data.bonded_pair,
            allergy_friendly: petInfo.pet_data.allergy_friendly,
            special_needs: petInfo.pet_data.special_needs,
            adoption_fee: petInfo.pet_data.adoption_fee,
            tags: petInfo.pet_data.tags,
            description: petInfo.pet_data.description,
            listing_created: petInfo.pet_data.listing_created,     // new Date().toJSON()
            profileFiles: {
                profilePhoto: (petInfo.profileFiles.profilePhoto.profilePhotoURL) ? petInfo.profileFiles.profilePhoto.profilePhotoURL : placeholder_image,
                additionalPhotos: (petInfo.profileFiles.additionalPhotos.length > 0) ? petInfo.profileFiles.additionalPhotos : placeholder_image,
                applicationForm: ""
            }
        }
    }
    // petfinder listing
    else if (petInfo.id) {formattedPetInfo = {
            petfinder_listing: true,
            pet_id: petInfo.id,
            account_info: {
                id: "",
                email: ""
            },
            listing_type: "AdoptionList",
            name: petInfo.name,
            type: petInfo.type,
            age: petInfo.age,
            breed: petInfo.breed,
            gender: petInfo.gender,
            color: petInfo.color,
            fur_length: petInfo.coat,
            profile_url: petInfo.url,
            location: {
                zipcode: petInfo.contact.address.postcode,
                city: petInfo.contact.address.city,
                state: petInfo.contact.address.state
            },
            cared_by:"",
            contact: {
                name: "",
                email: petInfo.contact.email,
                phone: petInfo.contact.phone,
                website: petInfo.url
            },
            personality: petInfo.tags,
            good_with_cats: petInfo.environment.cats,
            good_with_dogs: petInfo.environment.dogs,
            kid_friendly: petInfo.environment.children,
            vaccinated: petInfo.attributes.shots_current,
            spayed_neutered: petInfo.attributes.spayed_neutered,
            bonded_pair: false,
            allergy_friendly: false,
            special_needs: petInfo.attributes.special_needs,
            adoption_fee: false,
            tags: [],
            description: petInfo.description,
            listing_created: petInfo.published_at,     // new Date().toJSON()
            profileFiles: {
                profilePhoto: (petInfo.primary_photo_cropped) ? petInfo.primary_photo_cropped.small : placeholder_image,
                additionalPhotos: petInfo.photos,
                applicationForm: ""
            }
        }
    }
    const [petDetails, setPetDetails] = useState(formattedPetInfo);

    function toRad(deg) {
        return deg * (Math.PI/180);
    }

    function calculateDistance(x1, y1, x2, y2) {
        var R = 3956; // mi
        var dLat = toRad(x2-x1);
        var dLon = toRad(y2-y1);
        var xr1 = toRad(x1);
        var xr2 = toRad(x2);
        console.log("latitude2 in radians: " + xr2);
  
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(xr1) * Math.cos(xr2);
  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    let match = useRouteMatch();
    let prefix = petDetails.petfinder_listing ? "PF-" : "FF-";
    let newURL = `${match.url}/` + petDetails.type + "/profile/" + prefix + petDetails.pet_id;

    return (
            <div className="listing-card col s12 m6 l4">
                <div className="card">
                    <div className="card-image">
                        <Link to={newURL} className="profile-link-overlay">
                            <img src={petDetails.profileFiles.profilePhoto} />
                        </Link>
                        <a className="btn-floating halfway-fab">
                            <i className="material-icons">favorite_border</i>
                        </a>
                    </div>
                    <div className="card-content">
                        <span className="name">{petDetails.name}</span>
                        <span className="location">{petDetails.location.city}, {petDetails.location.state}</span>
                    </div>
                </div>
            </div>
    )
}

export default function Listings(){

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const [pageLoaded, setPageLoaded] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [ffListings, setFFListings] = useState(null);
    const [pfListings, setPFListings] = useState(null);
    const [petListings, setPetListings] = useState( null);


    const [filters, setFilters] = useState({
        type: "all",
        location:{
            zipcode: "",
            distance: 0,
        },
        age: [],
        gender: [],
        size: [],
        coat: [],
        color: [],
        breed: []
    });
    useEffect( () => {
        console.log("type has changed to " + filters.type);
        generateFilters("filter-age");
        generateFilters("filter-gender");
        generateFilters("filter-size");
        generateFilters("filter-furlen");
        generateFilters("filter-color");
        generateFilters("filter-breed");
        generateFilters("filter-zipcode");
    }, [filters.type]);

    const [applyFilter, setApplyFilter] = useState(false);


    const prevPage = usePrevious(pageNumber);
    const prevListings = usePrevious(petListings);
    const prevFFListings = usePrevious(ffListings);
    const prevpfListings = usePrevious(pfListings);

    // SURI: The prevLisings != petListings is called when new pets are
    // retrieved from petfinder. If you need to do something with location
    // after getting pets, do it there
    useEffect(() => {
        if(!pageLoaded){
            let promise = getListingData(pageNumber);
            generateFilters("filter-type");
            generateFilters("filter-location");
            setApplyFilter(true);
            setPageLoaded(true);
        }
        else if(prevPage !== pageNumber){
            getListingData(pageNumber);
        }
        else if(prevListings !== petListings){
            setApplyFilter(false);
        }
        // if(prevFFListings !== ffListings || prevpfListings !== pfListings){
        //     let newCombinedListings = ffListings.concat(pfListings);
        //     setPetListings(newCombinedListings);
        // }
    }, [pageLoaded, pageNumber, petListings]);
    useEffect(() =>{
        if(ffListings && pfListings && (prevFFListings !== ffListings)){
            let newCombinedListings = ffListings.concat(pfListings);
            setPetListings(newCombinedListings);
            console.log(newCombinedListings)
        }
    }, [ffListings, pfListings]);

    const [cardList, setCardList] = useState([]);
    const prevCardList = usePrevious(cardList);

    async function getListingData(pageNum){
        let newPFListings = await getFilteredListings(filters,10, pageNum);
        let newFFListings = await getFFListings(filters, pageNum);
        setPFListings(newPFListings);
    }

    async function getFFListings(filters, pageNum) {
        let listingData = [];
        if(filters.type === "all"){
            console.log("FF all")
            firestore.collection("PetInfo")
                .doc("PublicListings")
                .collection("AdoptionList")
                .doc("PetTypes").collection("dog").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        listingData.push(doc.data());
                    })
                }).then(() => {
                    firestore.collection("PetInfo")
                        .doc("PublicListings")
                        .collection("AdoptionList")
                        .doc("PetTypes").collection("cat").get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                // doc.data() is never undefined for query doc snapshots
                                listingData.push(doc.data());
                                console.log(doc.data());
                            })}).then(() => {setFFListings(listingData); console.log(listingData)});
                }
                )
        } else {
            console.log("FF " + filters.type)
            let docRef =  firestore.collection("PetInfo")
                .doc("PublicListings")
                .collection("AdoptionList")
                .doc("PetTypes").collection(filters.type);
            docRef.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        //console.log(doc.id, " => ", doc.data());
                        listingData.push(doc.data());
                    })
                }).then(() => {setFFListings(listingData); console.log(listingData)});
        }
    }

    function generateCards(){
        let cardList = petListings.filter(pet => (pet.pet_data || pet.id)).map(pet => <PetCard petInfo={pet} />);
        return(
            <div>{cardList}</div>
        )
    }

    function loadNextPage(){
        let newPageNum = pageNumber + 1;
        setPageNumber(newPageNum);
    }

    function loadPrevPage(){
        let newPageNum = pageNumber - 1;
        setPageNumber(newPageNum);
    }

    // SURI: This is called when someone clicks apply filters
    // It is async so if you need to do something before getting listings
    // from database/petfinder, do that here.
    // if you need to do something AFTER listings retrieved, that can be called
    // at useEffect above (see comment)
    function applyFilters(){
        setApplyFilter(true);
        let prom = getListingData(pageNumber);
    }

    function updateFilters(props){
        const filterID = props.target.name;
        const value = props.target.value;
        const checked = props.target.checked;
        let typeArr = [];
        let index = -1;
        let newArr = [];
        switch (filterID){
            case "type":
                setFilters({
                    ...filters,
                    type: value
                });
                break;
            case "furlen":
                typeArr = filters.coat;
                index = typeArr.indexOf(value);
                if(checked && index < 0) {newArr = typeArr.push(value)}
                else if(index >= 0) {newArr = typeArr.splice(index, 1)}
                setFilters({
                    ...filters,
                    coat: typeArr
                });
                break;
            case "size":
                typeArr = filters.size;
                index = typeArr.indexOf(value);
                if(checked && index < 0) {newArr = typeArr.push(value)}
                else if(index >= 0) {newArr = typeArr.splice(index, 1)}
                setFilters({
                    ...filters,
                    size: typeArr
                });
                break;
            case "age":
                typeArr = filters.age;
                index = typeArr.indexOf(value);
                if(checked && index < 0) {newArr = typeArr.push(value)}
                else if(index >= 0) {newArr = typeArr.splice(index, 1)}
                setFilters({
                    ...filters,
                    age: typeArr
                });
                break;
            case "gender":
                typeArr = filters.gender;
                index = typeArr.indexOf(value);
                if(checked && index < 0) {newArr = typeArr.push(value)}
                else if(index >= 0) {newArr = typeArr.splice(index, 1)}
                setFilters({
                    ...filters,
                    gender: typeArr
                });
                break;
            case "color":
                typeArr = filters.color;
                index = typeArr.indexOf(value);
                if(checked && index < 0) {newArr = typeArr.push(value)}
                else if(index >= 0) {newArr = typeArr.splice(index, 1)}
                setFilters({
                    ...filters,
                    color: typeArr
                });
                break;
            case "breed":
                typeArr = filters.breed;
                index = typeArr.indexOf(value);
                if(checked && index < 0) {newArr = typeArr.push(value)}
                else if(index >= 0) {newArr = typeArr.splice(index, 1)}
                setFilters({
                    ...filters,
                    breed: typeArr
                });
                break;
            case "zipcode":
                setFilters({
                    ...filters,
                    location: {zipcode: value, distance: filters.location.distance}
                });
                break;
            case "distance":
                setFilters({
                    ...filters,
                    location: {zipcode: filters.location.zipcode, distance: value}
                });
                break;
            default:
                break;
        }
    }

    console.log("test: " + filters.location.zipcode);

    function generateFilters(filterID) {
        const filterUL = document.getElementById(filterID);
        if(filterUL){
            let typeVar = "";
            switch (filterID){
                case "filter-type":
                    let typeli = document.createElement("li");
                    typeli.classList.add("input-field");
                    let typeSelect = document.createElement("select");
                    typeSelect.setAttribute("id", "filter-type");
                    typeSelect.setAttribute("name", "type");
                    typeSelect.addEventListener("change", updateFilters, false);
                    let option = document.createElement("option");;
                    option.setAttribute("value", "all")
                    option.setAttribute("name", "type");
                    let span = document.createElement("span");
                    span.innerText = "All"
                    option.appendChild(span);
                    typeSelect.appendChild(option);
                    PFdata.TYPES.map(ptype => {
                        option = document.createElement("option");;
                        option.setAttribute("value", ptype)
                        option.setAttribute("name", "type");
                        span = document.createElement("span");
                        if(ptype === "small_furry") {span.innerText = "Small and Furry";}
                        else if(ptype === "scales_fins_other") {span.innerText = "Scales, Fins, and Other";}
                        else {span.innerText = ptype}
                        option.appendChild(span);
                        typeSelect.appendChild(option);
                    });
                    typeli.appendChild(typeSelect);
                    filterUL.appendChild(typeli);
                    break;
                case "filter-furlen":
                    while (filterUL.firstChild) {
                        filterUL.removeChild(filterUL.firstChild);
                    }
                    typeVar = filters.type.toUpperCase();
                    PFdata[typeVar].coats.map(ptype => {
                        let li = document.createElement("li");
                        let label = document.createElement("label");
                        let input = document.createElement("input");
                        input.classList.add("filled-in");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("value", ptype)
                        input.setAttribute("id", "furlen-" + ptype);
                        input.setAttribute("name", "furlen");
                        input.addEventListener("change", updateFilters, false);
                        let span = document.createElement("span");
                        span.innerText = ptype;
                        label.appendChild(input);
                        label.appendChild(span);
                        li.appendChild(label);
                        filterUL.appendChild(li);
                    });
                    break;
                case "filter-size":
                    typeVar = filters.type.toUpperCase();
                    while (filterUL.firstChild) {
                        filterUL.removeChild(filterUL.firstChild);
                    }
                    PFdata.SIZE.map(ptype => {
                        let li = document.createElement("li");
                        let label = document.createElement("label");
                        let input = document.createElement("input");
                        input.classList.add("filled-in");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("value", ptype)
                        input.setAttribute("name", "size");
                        input.setAttribute("id", "size-" + ptype);
                        input.addEventListener("change", updateFilters, false);
                        let span = document.createElement("span");
                        span.innerText = ptype;
                        label.appendChild(input);
                        label.appendChild(span);
                        li.appendChild(label);
                        filterUL.appendChild(li);
                    });
                    break;
                case "filter-age":
                    while (filterUL.firstChild) {
                        filterUL.removeChild(filterUL.firstChild);
                    }
                    PFdata.AGE.map(ptype => {
                        let li = document.createElement("li");
                        let label = document.createElement("label");
                        let input = document.createElement("input");
                        input.classList.add("filled-in");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("value", ptype)
                        input.setAttribute("name", "age");
                        input.setAttribute("id", "age-" + ptype);
                        input.addEventListener("change", updateFilters, false);
                        let span = document.createElement("span");
                        span.innerText = ptype;
                        label.appendChild(input);
                        label.appendChild(span);
                        li.appendChild(label);
                        filterUL.appendChild(li);
                    });
                    break;
                case "filter-gender":
                    while (filterUL.firstChild) {
                        filterUL.removeChild(filterUL.firstChild);
                    }
                    typeVar = filters.type.toUpperCase();
                    PFdata[typeVar].genders.map(ptype => {
                        let li = document.createElement("li");
                        let label = document.createElement("label");
                        let input = document.createElement("input");
                        input.classList.add("filled-in");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("value", ptype)
                        input.setAttribute("name", "gender");
                        input.setAttribute("id", "gender-" + ptype);
                        input.addEventListener("change", updateFilters, false);
                        let span = document.createElement("span");
                        span.innerText = ptype;
                        label.appendChild(input);
                        label.appendChild(span);
                        li.appendChild(label);
                        filterUL.appendChild(li);
                    });
                    break;
                case "filter-color":
                    while (filterUL.firstChild) {
                        filterUL.removeChild(filterUL.firstChild);
                    }
                    typeVar = filters.type.toUpperCase();
                    PFdata[typeVar].colors.map(ptype => {
                        let li = document.createElement("li");
                        let label = document.createElement("label");
                        let input = document.createElement("input");
                        input.classList.add("filled-in");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("value", ptype)
                        input.setAttribute("name", "color");
                        input.setAttribute("id", "color-" + ptype);
                        input.addEventListener("change", updateFilters, false);
                        let span = document.createElement("span");
                        span.innerText = ptype;
                        label.appendChild(input);
                        label.appendChild(span);
                        li.appendChild(label);
                        filterUL.appendChild(li);
                    });
                    break;
                case "filter-breed":
                    while (filterUL.firstChild) {
                        filterUL.removeChild(filterUL.firstChild);
                    }
                    typeVar = filters.type.toUpperCase();
                    PFdata[typeVar].breeds.map(ptype => {
                        let li = document.createElement("li");
                        let label = document.createElement("label");
                        let input = document.createElement("input");
                        input.classList.add("filled-in");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("value", ptype.name)
                        input.setAttribute("name", "breed");
                        input.setAttribute("id", "breed-" + ptype.name);
                        input.addEventListener("change", updateFilters, false);
                        let span = document.createElement("span");
                        span.innerText = ptype.name;
                        label.appendChild(input);
                        label.appendChild(span);
                        li.appendChild(label);
                        filterUL.appendChild(li);
                    });
                    break;
                case "filter-location":
                    // zip code
                    let li = document.createElement("li");
                    li.classList.add("input-field");
                    let input = document.createElement("input");
                    input.setAttribute("type", "number");
                    input.setAttribute("name", "zipcode");
                    input.setAttribute("id", "filter-zipcode");
                    input.setAttribute("placeholder", "12345");
                    input.addEventListener("change", updateFilters, false);
                    let label = document.createElement("label");
                    label.classList.add("active");
                    label.setAttribute("for", "filter-zipcode");
                    label.innerText = "Zip Code";
                    li.appendChild(input);
                    li.appendChild(label);
                    filterUL.appendChild(li);

                    // distance
                    li = document.createElement("li");
                    li.classList.add("input-field");
                    let select = document.createElement("select");
                    select.setAttribute("id", "filter-distance");
                    select.setAttribute("name", "distance");
                    select.addEventListener("change", updateFilters, false);
                    label = document.createElement("label");
                    label.innerText = "Distance";
                    PFdata.DISTANCE.map(ptype => {
                        let option = document.createElement("option");;
                        option.setAttribute("value", ptype)
                        option.setAttribute("name", "distance");
                        let span = document.createElement("span");
                        span.innerText = ptype + " miles";
                        option.appendChild(span);
                        select.appendChild(option);
                    });
                    li.appendChild(select);
                    li.appendChild(label);
                    filterUL.appendChild(li);
                    break;
                default:
                    console.log("Error: Undefined filter type.")
            }
            M.AutoInit();
        }

    }

    // displays a loading circle while listings are fetched asynchronously
    function showLoading(){
        return(
            <div className="col s12 center">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
    <div className="listings-page">
        <div className="banner-wrap">
            <div className="banner-img-wrap"></div>
            <div className="heading">
                <span>Listing your potential new friend</span>
            </div>
            <div className="subheading">
                <span>Filter below for better results!</span>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="input-field col s3 right">
                    <select>
                        <option value="" disabled selected>Sort By</option>
                        <option value="1">Newest</option>
                        <option value="2">Most Viewed</option>
                        <option value="3">Least Viewed</option>
                        <option value="3">Distance</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m4 l3">
                    <form>
                        <div className="col s12">
                        <button className="btn-small" type="button" onClick={applyFilters}>
                            Apply Filters
                            <i className="material-icons left">refresh</i>
                        </button>
                        </div>
                        <div className="col s12">
                            <h6>Type of Pet</h6>
                            <ul id="filter-type">
                            </ul>
                        </div>
                        <div className="col s12">
                            <h6>Location</h6>
                            <ul id="filter-location">
                            </ul>
                        </div>
                        <div className="col s12">
                            <h6>Characteristics</h6>
                            {(filters.type === "all") ?
                                <p>Select a pet type to choose characteristics.</p>
                                :
                                <div>
                                    <span className="title">Age</span>
                                    <ul id="filter-age">
                                    </ul>
                                    <span className="title">Gender</span>
                                    <ul id="filter-gender">
                                    </ul>
                                    <span className="title">Size</span>
                                    <ul id="filter-size">
                                    </ul>
                                    <span className="title">Fur Length</span>
                                    <ul id="filter-furlen">
                                    </ul>
                                    <span className="title">Colors</span>
                                    <ul id="filter-color">
                                    </ul>
                                    <span className="title">Breeds</span>
                                    <ul id="filter-breed">
                                    </ul>
                                </div>
                            }
                        </div>
                    </form>
                </div>
                <div className="col s12 m8 l9">
                    {(!petListings || prevPage !== pageNumber || applyFilter) ?
                        showLoading() :
                        generateCards()
                    }
                </div>
            </div>
            <div className="row pet-listing-nav">
                <div className="col s12 center">
                    {(pageNumber > 1) ?
                        <button className="btn" type="button" name="action" onClick={loadPrevPage}>
                            Prev
                            <i className="material-icons left">navigate_before</i>
                        </button>
                        :
                        <button className="btn" type="button" name="action" disabled>
                            Prev
                            <i className="material-icons left">navigate_before</i>
                        </button>
                    }
                    <button className="btn" type="button" name="next" onClick={loadNextPage}>
                        Next
                        <i className="material-icons right">navigate_next</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}