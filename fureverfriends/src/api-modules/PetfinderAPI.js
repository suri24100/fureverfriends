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

// get new token for access
export function getToken(){
    const token_string = "grant_type=client_credentials&client_id=" +
                            CLIENT_ID + "&client_secret=" + KEY;
    const token_url = "https://api.petfinder.com/v2/oauth2/token";

    axios.post(
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
                valid_to: d
            }
            getData();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// test connection

export function getData() {
    const query_url = "https://api.petfinder.com/v2/types";
    const headers = {
        'Authorization': 'Bearer ' + token.access_token
    };

    axios.get(
        query_url,
        {headers: headers}
        ).then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
}