import React from "react";
import {callTrainingData} from "./api-modules/PetfinderAPI";
import {compileProfileData} from "./api-modules/AIDataFunctions"


export default function AIDataButton(){
    return (
        <div className="container"><button onClick={compileProfileData}>Get Data</button></div>
    )
}
