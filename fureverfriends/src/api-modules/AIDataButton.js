import React from "react";
import '../css/style.css';
import '../css/pet-profile.css';
import {firestore} from "../ffdb";


export default function AIDataButton(){

    async function getFFListings(petType) {
        let listingData = [];
        let tempData = [];

        const docRef = firestore.collection("PetInfo")
            .doc("PublicListings")
            .collection("AdoptionList")
            .doc("PetTypes").collection(petType);

        listingData = await docRef.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const profileInfo = doc.data();
                    let concatDescription = profileInfo.pet_data.description;
                    profileInfo.pet_data.personality.map(tag => {concatDescription += " " + tag})
                    const newPetData = {
                        id: profileInfo.pet_data.pet_id,
                        type: profileInfo.pet_data.type,
                        description: concatDescription
                    }
                    tempData.push(newPetData);
                });
        }).then(() => {return tempData});
        return listingData;
    }

    /* This function gets all profile data in an array of objects:
        {id: "", type: "", description: ""}*/
    function getAllPetDescriptions(){
        const petTypes = ["bird", "cat", "dog", "rabbit", "scales_fins_other", "small_furry"]
        let promises = petTypes.map(type => {
            return getFFListings(type);
        })
        Promise.all(promises)
            .then(results => {
                let finalData = [];
                results.map(arr => {finalData = finalData.concat(arr)})
                console.log(finalData);
                // JP: This is where you can do something with the array of data.
                // It is async, but at this point will be returned as a full array
                // of objects. See console log for format.
            })
            .catch(e => {
                console.log(e);
            });
    }

    /* This function will save the arrays of attributes to firestore */
    /* call for EACH record to be added, since it will be async*/
    function addArrayToFireStore(petType, petID, attrArray){
        const newEntry = {
            id: petID,
            type: petType,
            attributes: attrArray
        }
        const collectionRef = firestore.collection("MatchesData");
        const promise = collectionRef.doc(petID).set(newEntry);
    }

    return (
        <div className="ai-button">
            <div className="listings-banner-wrap"></div>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <button type="button" onClick={getAllPetDescriptions}>Get Data from All Furever Friends Profiles</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        {/*// add next button here if needed*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
