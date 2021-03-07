import firebase from './ffdb/app'
import 'firebase/firestore'
import * as ffdb from "@firebase/firestore/dist/exp";

describe("collection('PetInfo')", () => {
    it("should add data to a collection", () => {
        const output =
            ffdb.collection("PetInfo").add({
                PetName: " ",
                PetType: " ",

            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

        return output;
    });
})
//https://firebase.google.com/docs/firestore/quickstart