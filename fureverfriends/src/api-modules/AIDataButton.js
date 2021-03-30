import React from "react";
import {callTrainingData} from "./PetfinderAPI";
import {compileProfileData, getAllUsers, saveProfileImages, saveSampleListings} from "./AIDataFunctions"
import {testFunc} from "../ffdb";


export default function AIDataButton(){

    return (
        <div className="container">
            <button onClick={testFunc}>Get Data</button>
        </div>
    )
}
