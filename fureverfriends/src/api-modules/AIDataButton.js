import React, {useState} from "react";
import '../css/style.css';
import '../css/pet-profile.css';
import {firestore} from "../ffdb";


export default function AIDataButton(){
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [attributes, setAttributes] = useState();

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
        setLoading(true);
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
                let ai_results = finalData.map(pet => {
                    return getAttr(pet['type'], pet['id'], pet['description']);
                });

                Promise.all(ai_results)
                    .then(finalResults => {
                        finalResults.forEach((finalPet) => {
                            setType(finalPet['petType']);
                            setId(finalPet['petId']);
                            setDescription(finalPet['petDescription']);
                            setAttributes(finalPet['petAttr'].slice(0,3));
                            addArrayToFireStore(finalPet['petType'], finalPet['petId'], finalPet['petDescription'], finalPet['petAttr'])
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });

        setLoading(false);
    }

    async function getAttr(type, id, description){
        return await fetch("/ai/attribute_predictor",{
            method: "POST",
            header: {
                "Content-Type": "app/text"
            },
            body: description
        }).then(response => response.json().then(data =>{
            let tempResults = data["attributes"];
            tempResults = tempResults.concat([0,0,0,0,0,0,0]);
            return {petType: type, petId: id, petDescription: description, petAttr: tempResults}
        }));
    }

    /* This function will save the arrays of attributes to firestore */
    /* call for EACH record to be added, since it will be async*/
    function addArrayToFireStore(petType, petID, petDescription, attrArray){
        const newEntry = {
            id: petID,
            type: petType,
            description: petDescription,
            attributes: attrArray
        }
        const collectionRef = firestore.collection("MatchesData");
        const promise = collectionRef.doc(petID).set(newEntry);
    }

    return (
        <div className="ai-button">
            <div className="listings-banner-wrap"></div>
            <div className="container">

                <h1 id='title'>AI Predictions</h1>
                <table id='pets'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TYPE</th>
                            <th>DESCRIPTION</th>
                            <th>ATTRIBUTES</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{type}</td>
                        <td>{description}</td>
                        <td>{attributes}</td>
                    </tr>
                    </tbody>
                </table>

                <div className="row">
                    <div className="col s12">
                        <button type="button" disabled={loading} onClick={getAllPetDescriptions}>Get Data from All Furever Friends Profiles</button>
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
