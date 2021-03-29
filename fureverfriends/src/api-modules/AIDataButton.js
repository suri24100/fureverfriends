import React from "react";
import {callTrainingData} from "./PetfinderAPI";
import {compileProfileData, saveProfileImages} from "./AIDataFunctions"
import photo from "../test-profile-photos/50882068.jpg"


export default function AIDataButton(){

    return (
        <div className="container">
            <button onClick={saveProfileImages}>Get Data</button>
            <img src={photo} />
        </div>
    )
}
