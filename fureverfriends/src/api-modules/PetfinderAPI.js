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

const CLIENT_ID = "ygcuWhnebW0MHgMwxny1ThmJ3OeJzIzMUaF9b3IeviUmOJVsYy";
const KEY = "RsPfXnm5hAVCghknjJjCOyxFp4jwh0cHHgAZ8eUD";
let token = {};

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
async function getToken(){
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
        })
        .catch(function (error) {
            console.log(error);
        });
}

// handles a request to the API given the specified url
async function getData(dataURL){
    await getToken();
    await axios.get(
        dataURL,
        token.h
    ).then(function (response) {
         console.log(response.data)
    })
     .catch(function (error) {
         console.log(error);
     });
}

// get breeds of a specific animal type
export async function getBreeds(animalType){
    let breedURL = BASE_URL + BREED_URLS[animalType];
    await getData(breedURL);
}

// get first 20 listings of a specific animal type
export async function getTypeListing(animalType, numListings){
    let typeURL = BASE_URL + "/v2/animals?type=" + animalType + "&limit=" + numListings;
    await getData(typeURL);
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
const BIRD = {
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
