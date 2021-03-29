import React from "react";
import {callTrainingData} from "./PetfinderAPI";
import {compileProfileData, saveProfileImages, saveSampleListings} from "./AIDataFunctions"


export default function AIDataButton(){

    return (
        <div className="container">
            <button onClick={saveSampleListings}>Get Data</button>
        </div>
    )
}
