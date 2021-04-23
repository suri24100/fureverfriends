import React, {useState} from "react";
import '../css/style.css';
import '../css/pet-profile.css';
import '../css/ai-demo.css';
import {firestore} from "../ffdb";


export default function AIDataButton(){
    const [loading, setLoading] = useState(false);
    const [resultInfo, setResultInfo] = useState([]);
    const [numCalculated, setNumCalculated] = useState(0);
    const [numPlayful, setNumPlayful] = useState(0);
    const [numAffectionate, setNumAffectionate] = useState(0);
    const [numSocial, setNumSocial] = useState(0);


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
                        description: concatDescription,
                        name: profileInfo.pet_data.name
                    }
                    tempData.push(newPetData);
                });
        }).then(() => {return tempData});
        return listingData;
    }

    /* This function gets all profile data in an array of objects:
        {id: "", type: "", description: ""}*/
    function getAllPetDescriptions(){
        setLoading(prev => true);
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
                    return getAttr(pet['type'], pet['id'], pet['description'], pet['name']);
                });

                Promise.all(ai_results)
                    .then(finalResults => {
                        const tempArray = [];
                        finalResults.forEach((finalPet) => {
                            const newResult = {
                                id: finalPet.petId,
                                type: finalPet.petType,
                                name: finalPet.petName,
                                description: finalPet.petDescription,
                                attributes: finalPet.petAttr.slice(0,3)
                            }
                            tempArray.push(newResult);
                            setNumCalculated(prev => prev + 1);
                            if(finalPet.petAttr[0] === 1) {setNumPlayful(prev => prev + 1);}
                            if(finalPet.petAttr[1] === 1) {setNumAffectionate(prev => prev + 1);}
                            if(finalPet.petAttr[2] === 1) {setNumSocial(prev => prev + 1);}
                            //addArrayToFireStore(finalPet['petType'], finalPet['petId'], finalPet['petDescription'], finalPet['petAttr'])
                        });
                        setResultInfo(prev => tempArray);
                        console.log(tempArray)
                        setLoading(prev => false);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });

    }

    async function getAttr(type, id, description, name){
        return await fetch("http://brian-desktop.lan.tekempire.net:5000/ai/attribute_predictor",{
            method: "POST",
            header: {
                "Content-Type": "app/text"
            },
            body: description
        }).then(response => response.json().then(data =>{
            let tempResults = data["attributes"];
            tempResults = tempResults.concat([0,0,0,0,0,0,0]);
            return {petType: type, petId: id, petDescription: description, petName: name, petAttr: tempResults}
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
                <h2 id='title'>Predicting Pet Attributes with AI</h2>
                <div className="row introText">
                    <div className="col s8 introInfo">
                        <p>Furever Friends uses artificial intelligence models to predict a set of common attributes that define a pet based on
                        the information that was entered into their profiles.
                        </p>
                        <p>
                            Let's give it a try and see how it works!
                        </p>
                        <button type="button" className="btn" disabled={loading} onClick={getAllPetDescriptions}>
                            Assign Attributes
                        </button>
                    </div>
                    <div className="col s4 calculations">
                        <div className="row">
                            <ul>
                                <li><span className={"title"}>Profiles Calculated: </span> {numCalculated}</li>
                                <li><span className={"title"}>Playful Pets: </span> {numPlayful}</li>
                                <li><span className={"title"}>Affectionate Pets: </span> {numAffectionate}</li>
                                <li><span className={"title"}>Social Pets: </span> {numSocial}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <table id='pets'>
                        <thead>
                            <tr>
                                <th className="pet-info">Pet Info</th>
                                <th className="description">Description</th>
                                <th className="attribute">Playful</th>
                                <th className="attribute">Affectionate</th>
                                <th className="attribute">Social</th>
                            </tr>
                        </thead>
                        <tbody>
                        {resultInfo.map(record =>
                            <tr key={record.id}>
                                <td className="pet-info">
                                    <span className="petName">{record.name}</span><br/>
                                    <span className={"title"}>ID:</span> {record.id}<br/>
                                    <span className={"title"}>Type:</span> {record.type}
                                </td>
                                <td className="description">{record.description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '')}</td>
                                <td className={"attribute " + ((record.attributes[0] === 0) ? "red-text" : "green-text darken-4")}>{record.attributes[0]}</td>
                                <td className={"attribute " + ((record.attributes[1] === 0) ? "red-text" : "green-text darken-4")}>{record.attributes[1]}</td>
                                <td className={"attribute " + ((record.attributes[2] === 0) ? "red-text" : "green-text darken-4")}>{record.attributes[2]}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {loading &&
                        <div>
                            <p className="center">Loading Predictions...</p>
                            <div className="col s6 offset-s3 progress">
                                <div className="indeterminate"></div>
                            </div>
                        </div>
                    }
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
