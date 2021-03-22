import React from "react";
import {callTrainingData} from "./api-modules/PetfinderAPI";

export default function AIDataButton(){
    return (
        <div><button onClick={callTrainingData}>Get Data</button></div>
    )
}