/*
* Controls access to PetFinder via api calls.
* Important Information:
*   PetFinder limits to 1000 requests per day.
*   To handle this, this API will grab and store timed updates from
*   PetFinder which can then be accessed via the JSON structures defined
*   below.
*   Uses axios for http requests https://www.npmjs.com/package/axios
*/

import axios from "axios";
import { saveAs } from 'file-saver';

const CLIENT_ID = "ygcuWhnebW0MHgMwxny1ThmJ3OeJzIzMUaF9b3IeviUmOJVsYy";
const KEY = "RsPfXnm5hAVCghknjJjCOyxFp4jwh0cHHgAZ8eUD";
let token = {
    access_token: "",
    valid_to: null,
    h: {}
}

// used for all api queries
const BASE_URL = "https://api.petfinder.com";
export const TYPE_URLS = {
    dog: "/v2/types/dog/",
    cat: "/v2/types/cat/",
    rabbit: "/v2/types/rabbit/",
    small_furry: "/v2/types/small-furry/",
    horse: "/v2/types/horse/",
    bird: "/v2/types/bird/",
    scales_fins_other: "/v2/types/scales-fins-other/",
    barnyard: "/v2/types/barnyard/"
}
const BREED_URLS = {
    dog: "/v2/types/dog/breeds",
    cat: "/v2/types/cat/breeds",
    rabbit: "/v2/types/rabbit/breeds",
    small_furry: "/v2/types/small-furry/breeds",
    horse: "/v2/types/horse/breeds",
    bird: "/v2/types/bird/breeds",
    scales_fins_other: "/v2/types/scales-fins-other/breeds",
    barnyard: "/v2/types/barnyard/breeds"
}

// For full breakdown of PetFinder params, refer to consts declared toward end of file

// get new token for access
export async function getToken(){
    const token_string = "grant_type=client_credentials&client_id=" +
                            CLIENT_ID + "&client_secret=" + KEY;
    const token_url = "https://api.petfinder.com/v2/oauth2/token";

    await axios.post(
        token_url,
        token_string)
        .then(function (response) {
            // calculate expiry time/date of token
            let d = new Date();
            d = new Date(d.getTime() +
                    (response.data.expires_in * 1000));

            // store current token with expiry date for verification
            token = {
                access_token: response.data.access_token,
                valid_to: d,
                h: {headers: {'Authorization': 'Bearer ' + response.data.access_token}}
            }
            console.log(token);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// handles a request to the API given the specified url
async function getData(dataURL){
    if(token.access_token === "" || token.valid_to < new Date()){
        await getToken();
    }
    let listingData = [];
    await axios.get(
        dataURL,
        token.h
    ).then(function (response) {
        listingData = response.data;
    })
     .catch(function (error) {
         console.log(error);
     });
    return listingData;
}

// get breeds of a specific animal type
export async function getBreeds(animalType){
    let breedURL = BASE_URL + BREED_URLS[animalType];
    await getData(breedURL);
}

// get profile info for a specific pet by id
export async function getProfileInfo(petID){
    let typeURL = BASE_URL + "/v2/animals/" + petID;
    console.log(typeURL);
    let listingResults = await getData(typeURL);
    return listingResults.animal;
}

// get first __ listings of a specific animal type
export async function getTypeListing(animalType, numListings, pageNum){
    let typeURL = BASE_URL + "/v2/animals?type=" + animalType + "&limit=" + numListings + "&page=" + pageNum;
    let listingResults = await getData(typeURL);
    return listingResults.animals;
}

// query for training data
export async function callTrainingData(){
    let startFrom = 101;
    let numPages = 200;
    let animal = "dog";
    let formattedData = "pet_id|type|species|description|tags\n";
    for(let index = startFrom; index <= numPages; index++){
        let mainDataURL = BASE_URL + "/v2/animals?type=" + animal + "&limit=100&page=" + index;
        let mainData = await getTrainingData(mainDataURL);
        for(let pet = 0; pet < mainData.length; pet++){
            if(mainData[pet].tags.length > 0 && mainData[pet].description){
                formattedData += mainData[pet].id + "|"
                    + mainData[pet].type + "|"
                    + mainData[pet].species + "|"
                    + mainData[pet].description.replace(/\n/g, " ").replace(/\r/g, "") + "|"
                    + mainData[pet].tags.join("|") + "|"
                    + mainData[pet].gender + "|"
                    + mainData[pet].age + "|"
                    + mainData[pet].size + "|"
                    + mainData[pet].breeds.primary + "|"
                    + mainData[pet].coat + "\n";
            }
        }
    }
    const dataBlob = await new Blob([formattedData], {type: 'text/csv'});
    console.log(dataBlob);
    await saveAs(dataBlob, "petfinder-profiledata.csv");
}

// get training data
async function getTrainingData(dataURL){
    // check if need new token
    if(token.access_token === "" || token.valid_to < new Date()){
        await getToken();
    }
    let listingresults = [];
    await axios.get(
        dataURL,
        token.h
    ).then(function (response) {
        listingresults = response.data.animals;
    }
    ).catch(function (error) {
        console.log(error);
    });
    return listingresults;
}


// parameters for queries, can be combined
const TYPES = ["dog", "cat", "rabbit", "small_furry", "horse", "bird", "scales_fins_other", "barnyard"];
const GENDERS = ["male", "female", "unknown"];
const SIZE = ["small", "medium", "large", "xlarge"];
const AGE = ["baby", "young", "adult", "senior"];
const COAT = ["short", "medium", "long", "wire", "hairless", "curly"];
const STATUS = ["adoptable", "adopted", "found"];

// full option breakdown for each type
const DOG =  {
    "name":"Dog",
    "coats":[
        "Hairless",
        "Short",
        "Medium",
        "Long",
        "Wire",
        "Curly"
    ],
    "colors":[
        "Apricot / Beige",
        "Bicolor",
        "Black",
        "Brindle",
        "Brown / Chocolate",
        "Golden",
        "Gray / Blue / Silver",
        "Harlequin",
        "Merle (Blue)",
        "Merle (Red)",
        "Red / Chestnut / Orange",
        "Sable",
        "Tricolor (Brown, Black, & White)",
        "White / Cream",
        "Yellow / Tan / Blond / Fawn"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/dog"
        },
        "breeds":{
            "href":"/v2/types/dog/breeds"
        }
    }
}
const CAT = {
    "name":"Cat",
    "coats":[
        "Hairless",
        "Short",
        "Medium",
        "Long"
    ],
    "colors":[
        "Black",
        "Black & White / Tuxedo",
        "Blue Cream",
        "Blue Point",
        "Brown / Chocolate",
        "Buff & White",
        "Buff / Tan / Fawn",
        "Calico",
        "Chocolate Point",
        "Cream / Ivory",
        "Cream Point",
        "Dilute Calico",
        "Dilute Tortoiseshell",
        "Flame Point",
        "Gray & White",
        "Gray / Blue / Silver",
        "Lilac Point",
        "Orange & White",
        "Orange / Red",
        "Seal Point",
        "Smoke",
        "Tabby (Brown / Chocolate)",
        "Tabby (Buff / Tan / Fawn)",
        "Tabby (Gray / Blue / Silver)",
        "Tabby (Leopard / Spotted)",
        "Tabby (Orange / Red)",
        "Tabby (Tiger Striped)",
        "Torbie",
        "Tortoiseshell",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/cat"
        },
        "breeds":{
            "href":"/v2/types/cat/breeds"
        }
    }
}
const RABBIT = {
    "name":"Rabbit",
    "coats":[
        "Short",
        "Long"
    ],
    "colors":[
        "Agouti",
        "Black",
        "Blue / Gray",
        "Brown / Chocolate",
        "Cream",
        "Lilac",
        "Orange / Red",
        "Sable",
        "Silver Marten",
        "Tan",
        "Tortoiseshell",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/rabbit"
        },
        "breeds":{
            "href":"/v2/types/rabbit/breeds"
        }
    }
}
const SMALL_FURRY = {
    "name":"Small & Furry",
    "coats":[
        "Hairless",
        "Short",
        "Long"
    ],
    "colors":[
        "Agouti",
        "Albino",
        "Black",
        "Black Sable",
        "Blue / Gray",
        "Brown / Chocolate",
        "Calico",
        "Champagne",
        "Cinnamon",
        "Cream",
        "Orange / Red",
        "Sable",
        "Tan",
        "Tortoiseshell",
        "White",
        "White (Dark-Eyed)"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/small-furry"
        },
        "breeds":{
            "href":"/v2/types/small-furry/breeds"
        }
    }
}
const HORSE = {
    "name":"Horse",
    "coats":[

    ],
    "colors":[
        "Appaloosa",
        "Bay",
        "Bay Roan",
        "Black",
        "Blue Roan",
        "Brown",
        "Buckskin",
        "Champagne",
        "Chestnut / Sorrel",
        "Cremello",
        "Dapple Gray",
        "Dun",
        "Gray",
        "Grullo",
        "Liver",
        "Paint",
        "Palomino",
        "Perlino",
        "Piebald",
        "Pinto",
        "Red Roan",
        "Silver Bay",
        "Silver Buckskin",
        "Silver Dapple",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/horse"
        },
        "breeds":{
            "href":"/v2/types/horse/breeds"
        }
    }
}
export const BIRD = {
    "name":"Bird",
    "coats":[
    ],
    "colors":[
        "Black",
        "Blue",
        "Brown",
        "Buff",
        "Gray",
        "Green",
        "Olive",
        "Orange",
        "Pink",
        "Purple / Violet",
        "Red",
        "Rust / Rufous",
        "Tan",
        "White",
        "Yellow"
    ],
    "genders":[
        "Male",
        "Female",
        "Unknown"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/bird"
        },
        "breeds":{
            "href":"/v2/types/bird/breeds"
        }
    }
}
const SCALES_FINS_OTHER = {
    "name":"Scales, Fins & Other",
    "coats":[

    ],
    "colors":[
        "Black",
        "Blue",
        "Brown",
        "Gray",
        "Green",
        "Iridescent",
        "Orange",
        "Purple",
        "Red",
        "Tan",
        "White",
        "Yellow"
    ],
    "genders":[
        "Male",
        "Female",
        "Unknown"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/scales-fins-other"
        },
        "breeds":{
            "href":"/v2/types/scales-fins-other/breeds"
        }
    }
}
const BARNYARD = {
    "name":"Barnyard",
    "coats":[
        "Short",
        "Long"
    ],
    "colors":[
        "Agouti",
        "Black",
        "Black & White",
        "Brindle",
        "Brown",
        "Gray",
        "Pink",
        "Red",
        "Roan",
        "Spotted",
        "Tan",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/barnyard"
        },
        "breeds":{
            "href":"/v2/types/barnyard/breeds"
        }
    }
}
