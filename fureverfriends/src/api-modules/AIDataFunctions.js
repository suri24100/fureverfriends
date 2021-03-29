import {test_profile_info} from './test_profiles'
import {getProfileInfo} from './PetfinderAPI'
import {sampleListings} from "./sample-listings";
import { saveAs } from 'file-saver';
import placeholder_image from "../images/petProfiles/default-placeholder-image.png";
import {storage, firestore} from "../ffdb";

// pick from randomly to assign an account for each profile created
const TEST_ACCOUNTS = [
    {email: "sakettell@gmail.com", username: "Skettles"},
    {email: "dvp5392@gmail.com", username: "dpatel"},
    {email: "catnaps@fureverfriends.com", username: "CatNaps"},
    {email: "dogbiscuits@fureverfriends.com", username: "DogBiscuits"},
    {email: "dogs4ever@fureverfriends.com", username: "Dogs4Ever"},
    {email: "dvp5392@psu.edu", username: "avocoder123"},
    {email: "fuzzypetrescue@fureverfriends.com", username: "FuzzyPetRescue"},
    {email: "jpa5180@psu.edu", username: "jpa5180"},
    {email: "jpastudillo123@gmail.com", username: "jpa123"},
    {email: "kittenpaws@fureverfriends.com", username: "KittenPaws"},
    {email: "lazysundayfurball@fureverfriends.com", username: "LazySundayFurball"},
    {email: "micercutetoo@fureverfriends.com", username: "MiceRCuteToo"},
    {email: "petlover123@fureverfriends.com", username: "PetLover123"},
    {email: "rabbitears34@fureverfriends.com", username: "RabbitEars34"},
    {email: "riseandmeow@fureverfriends.com", username: "RiseAndMeow"},
    {email: "surabhi.sahay24@gmail.com", username: "suri24"},
    {email: "sxk1552@psu.edu", username: "SarahKettell"}
]

const TEST_INFO = test_profile_info;

const IMG_URLS = [
    "/test-profile-photos/50882068.jpg",
    "/test-profile-photos/50882420.jpg",
    "/test-profile-photos/50883585.jpg",
    "/test-profile-photos/50883753.jpg",
    "/test-profile-photos/50911581.jpg",
    "/test-profile-photos/50928271.jpg",
    "/test-profile-photos/50928386.jpg",
    "/test-profile-photos/50928435.jpg",
    "/test-profile-photos/50928517.jpg",
    "/test-profile-photos/50928526.jpg",
    "/test-profile-photos/50928560.jpg",
    "/test-profile-photos/50928566.jpg",
    "/test-profile-photos/50928751.jpg",
    "/test-profile-photos/50928775.jpg",
    "/test-profile-photos/50928834.jpg",
    "/test-profile-photos/50929383.jpg",
    "/test-profile-photos/50929466.jpg",
    "/test-profile-photos/50929543.jpg",
    "/test-profile-photos/50929725.jpg",
    "/test-profile-photos/50930158.jpg",
    "/test-profile-photos/50930159.jpg",
    "/test-profile-photos/50930177.jpg",
    "/test-profile-photos/50930227.jpg",
    "/test-profile-photos/50930489.jpg",
    "/test-profile-photos/50930490.jpg",
    "/test-profile-photos/50930583.jpg",
    "/test-profile-photos/50930679.jpg",
    "/test-profile-photos/50930993.jpg",
    "/test-profile-photos/50931522.jpg",
    "/test-profile-photos/50931523.jpg",
    "/test-profile-photos/50931636.jpg",
    "/test-profile-photos/50931899.jpg",
    "/test-profile-photos/50932023.jpg",
    "/test-profile-photos/50932246.jpg",
    "/test-profile-photos/50932382.jpg",
    "/test-profile-photos/50932395.jpg",
    "/test-profile-photos/50932695.jpg",
    "/test-profile-photos/50932770.jpg",
    "/test-profile-photos/50932882.jpg",
    "/test-profile-photos/50932910.jpg",
    "/test-profile-photos/50932961.jpg",
    "/test-profile-photos/50932979.jpg",
    "/test-profile-photos/50932980.jpg",
    "/test-profile-photos/50932981.jpg",
    "/test-profile-photos/50932983.jpg",
    "/test-profile-photos/50932984.jpg",
    "/test-profile-photos/50932985.jpg",
    "/test-profile-photos/50932986.jpg",
    "/test-profile-photos/50933639.jpg",
    "/test-profile-photos/50933643.jpg",
    "/test-profile-photos/50934255.jpg",
    "/test-profile-photos/50934346.jpg",
    "/test-profile-photos/50934361.jpg",
    "/test-profile-photos/50934392.jpg",
    "/test-profile-photos/50934427.jpg",
    "/test-profile-photos/50934435.jpg",
    "/test-profile-photos/50934465.jpg",
    "/test-profile-photos/50934483.jpg",
    "/test-profile-photos/50934513.jpg",
    "/test-profile-photos/50934716.jpg",
    "/test-profile-photos/50934798.jpg",
    "/test-profile-photos/50934799.jpg",
    "/test-profile-photos/50934845.jpg",
    "/test-profile-photos/50934846.jpg",
    "/test-profile-photos/50934961.jpg",
    "/test-profile-photos/50935119.jpg",
    "/test-profile-photos/50935167.jpg",
    "/test-profile-photos/50935350.jpg",
    "/test-profile-photos/50935378.jpg",
    "/test-profile-photos/50935382.jpg",
    "/test-profile-photos/50935392.jpg",
    "/test-profile-photos/50935397.jpg",
    "/test-profile-photos/50935409.jpg",
    "/test-profile-photos/50935434.jpg",
    "/test-profile-photos/50935535.jpg",
    "/test-profile-photos/50935538.jpg",
    "/test-profile-photos/50935539.jpg",
    "/test-profile-photos/50935546.jpg",
    "/test-profile-photos/50935554.jpg",
    "/test-profile-photos/50935580.jpg",
    "/test-profile-photos/50935589.jpg",
    "/test-profile-photos/50935591.jpg",
    "/test-profile-photos/50935594.jpg",
    "/test-profile-photos/50935611.jpg",
    "/test-profile-photos/50935612.jpg",
    "/test-profile-photos/50935641.jpg",
    "/test-profile-photos/50935643.jpg",
    "/test-profile-photos/50935644.jpg",
    "/test-profile-photos/50935650.jpg",
    "/test-profile-photos/50935651.jpg",
    "/test-profile-photos/50935652.jpg",
    "/test-profile-photos/50935702.jpg",
    "/test-profile-photos/50935703.jpg",
    "/test-profile-photos/50935709.jpg",
    "/test-profile-photos/50935710.jpg",
    "/test-profile-photos/50935732.jpg",
    "/test-profile-photos/50935744.jpg",
    "/test-profile-photos/50935745.jpg",
    "/test-profile-photos/50935746.jpg",
    "/test-profile-photos/50935747.jpg",
    "/test-profile-photos/50935748.jpg",
    "/test-profile-photos/50935749.jpg",
    "/test-profile-photos/50935750.jpg",
    "/test-profile-photos/50935752.jpg",
    "/test-profile-photos/50935753.jpg",
    "/test-profile-photos/50935755.jpg",
    "/test-profile-photos/50935775.jpg",
    "/test-profile-photos/50935776.jpg",
    "/test-profile-photos/50935780.jpg",
    "/test-profile-photos/50935783.jpg",
    "/test-profile-photos/50935790.jpg",
    "/test-profile-photos/50935800.jpg",
    "/test-profile-photos/50935809.jpg",
    "/test-profile-photos/50935811.jpg",
    "/test-profile-photos/50935812.jpg",
    "/test-profile-photos/50935980.jpg",
    "/test-profile-photos/50935983.jpg",
    "/test-profile-photos/50935992.jpg",
    "/test-profile-photos/50936027.jpg",
    "/test-profile-photos/50936030.jpg",
    "/test-profile-photos/50936034.jpg",
    "/test-profile-photos/50936039.jpg",
    "/test-profile-photos/50936045.jpg",
    "/test-profile-photos/50936051.jpg",
    "/test-profile-photos/50936075.jpg",
    "/test-profile-photos/50936131.jpg",
    "/test-profile-photos/50936135.jpg",
    "/test-profile-photos/50936168.jpg",
    "/test-profile-photos/50936178.jpg",
    "/test-profile-photos/50936180.jpg",
    "/test-profile-photos/50936181.jpg",
    "/test-profile-photos/50936187.jpg",
    "/test-profile-photos/50936198.jpg",
    "/test-profile-photos/50936205.jpg",
    "/test-profile-photos/50936210.jpg",
    "/test-profile-photos/50936211.jpg",
    "/test-profile-photos/50936217.jpg",
    "/test-profile-photos/50936219.jpg",
    "/test-profile-photos/50936220.jpg",
    "/test-profile-photos/50936221.jpg",
    "/test-profile-photos/50936240.jpg",
    "/test-profile-photos/50936241.jpg",
    "/test-profile-photos/50936242.jpg",
    "/test-profile-photos/50936244.jpg",
    "/test-profile-photos/50936246.jpg",
    "/test-profile-photos/50936248.jpg",
    "/test-profile-photos/50936256.jpg",
    "/test-profile-photos/50936258.jpg",
    "/test-profile-photos/50936259.jpg",
    "/test-profile-photos/50936261.jpg",
    "/test-profile-photos/50936262.jpg",
    "/test-profile-photos/50936263.jpg",
    "/test-profile-photos/50936264.jpg",
    "/test-profile-photos/50936265.jpg",
    "/test-profile-photos/50936268.jpg",
    "/test-profile-photos/50936269.jpg",
    "/test-profile-photos/50936270.jpg",
    "/test-profile-photos/50936271.jpg",
    "/test-profile-photos/50936273.jpg",
    "/test-profile-photos/50936274.jpg",
    "/test-profile-photos/50936276.jpg",
    "/test-profile-photos/50936278.jpg",
    "/test-profile-photos/50936279.jpg",
    "/test-profile-photos/50936280.jpg",
    "/test-profile-photos/50936282.jpg",
    "/test-profile-photos/50936292.jpg",
    "/test-profile-photos/50936293.jpg",
    "/test-profile-photos/50936295.jpg",
    "/test-profile-photos/50936296.jpg",
    "/test-profile-photos/50936297.jpg",
    "/test-profile-photos/50936299.jpg",
    "/test-profile-photos/50936300.jpg",
    "/test-profile-photos/50936301.jpg",
    "/test-profile-photos/50936302.jpg",
    "/test-profile-photos/50936303.jpg",
    "/test-profile-photos/50936304.jpg",
    "/test-profile-photos/50936305.jpg",
    "/test-profile-photos/50936306.jpg",
    "/test-profile-photos/50936307.jpg",
    "/test-profile-photos/50936308.jpg",
    "/test-profile-photos/50936310.jpg",
    "/test-profile-photos/50936312.jpg",
    "/test-profile-photos/50936313.jpg",
    "/test-profile-photos/50936314.jpg",
    "/test-profile-photos/50936317.jpg",
    "/test-profile-photos/50936468.jpg",
    "/test-profile-photos/50936470.jpg",
    "/test-profile-photos/50936471.jpg",
    "/test-profile-photos/50936472.jpg",
    "/test-profile-photos/50936473.jpg",
    "/test-profile-photos/50936475.jpg",
    "/test-profile-photos/50936477.jpg",
    "/test-profile-photos/50936481.jpg",
    "/test-profile-photos/50936482.jpg",
    "/test-profile-photos/50936483.jpg",
    "/test-profile-photos/50936484.jpg",
    "/test-profile-photos/50936485.jpg",
    "/test-profile-photos/50936486.jpg",
    "/test-profile-photos/50936488.jpg",
    "/test-profile-photos/50936489.jpg",
    "/test-profile-photos/50936491.jpg",
    "/test-profile-photos/50936493.jpg",
    "/test-profile-photos/50936494.jpg",
    "/test-profile-photos/50936496.jpg",
    "/test-profile-photos/50936497.jpg",
    "/test-profile-photos/50936498.jpg",
    "/test-profile-photos/50936501.jpg",
    "/test-profile-photos/50936502.jpg",
    "/test-profile-photos/50936505.jpg",
    "/test-profile-photos/50936507.jpg",
    "/test-profile-photos/50936510.jpg",
    "/test-profile-photos/50936511.jpg",
    "/test-profile-photos/50936513.jpg",
    "/test-profile-photos/50936514.jpg",
    "/test-profile-photos/50936515.jpg",
    "/test-profile-photos/50936516.jpg",
    "/test-profile-photos/50936518.jpg",
    "/test-profile-photos/50936519.jpg",
    "/test-profile-photos/50936521.jpg",
    "/test-profile-photos/50936525.jpg",
    "/test-profile-photos/50936535.jpg",
    "/test-profile-photos/50936546.jpg",
    "/test-profile-photos/50936552.jpg",
]

const SAMPLE_PROFILES = sampleListings;

export async function compileProfileData() {
    let final_data = [];
    let picture_data = "";
    let account_index = 0;
    for (let i = 0; i < TEST_INFO.length; i++) {
        let petInfo = await getProfileInfo(TEST_INFO[i].pet_id);
        if (petInfo) {
            account_index = Math.floor(Math.random() * TEST_ACCOUNTS.length);
            let curr_pet = TEST_INFO.find(pet => pet.pet_id === petInfo.id);
            let curr_description = curr_pet.description;
            let pet_type = curr_pet.type.toLowerCase();
            let newProfile = {
                petfinder_listing: false,
                pet_id: petInfo.id,
                account_info: {
                    username: TEST_ACCOUNTS[account_index].username,
                    email: TEST_ACCOUNTS[account_index].email
                },
                listing_type: "AdoptionList",
                name: petInfo.name,
                type: pet_type,
                age: petInfo.age,
                breed: petInfo.breeds.primary,
                gender: petInfo.gender,
                color: petInfo.colors.primary,
                fur_length: petInfo.coat,
                profile_url: "/listings/" + pet_type + "/profile/FF-" + petInfo.id,
                location: {
                    zipcode: petInfo.contact.address.postcode,
                    city: petInfo.contact.address.city,
                    state: petInfo.contact.address.state
                },
                cared_by: "",
                contact: {
                    name: "",
                    email: petInfo.contact.email,
                    phone: petInfo.contact.phone,
                    website: petInfo.url
                },
                personality: petInfo.tags,
                good_with_cats: petInfo.environment.cats,
                good_with_dogs: petInfo.environment.dogs,
                kid_friendly: petInfo.environment.children,
                vaccinated: petInfo.attributes.shots_current,
                spayed_neutered: petInfo.attributes.spayed_neutered,
                bonded_pair: false,
                allergy_friendly: false,
                special_needs: petInfo.attributes.special_needs,
                adoption_fee: false,
                tags: [],
                description: curr_description,
                listing_created: petInfo.published_at,
                profileFiles: {
                    profilePhoto: (petInfo.primary_photo_cropped) ? petInfo.primary_photo_cropped.full : "",
                    additionalPhotos: petInfo.photos,
                    applicationForm: ""
                }
            }
            final_data.push(newProfile);
            if(petInfo.primary_photo_cropped){
                let newPicture = petInfo.id + " " + petInfo.primary_photo_cropped.full;
                picture_data += newPicture + "\n";
            }
        }
    }
    await console.log(final_data);
    await console.log(picture_data)
    const dataBlob = await new Blob([picture_data], {type: 'text/plain'});
    await saveAs(dataBlob, "test_photos.txt");
    const photoBlob = await new Blob([JSON.stringify(final_data)], {type: 'text/plain;charset=utf-8'});
    await saveAs(photoBlob, "full_test_listings.json");
}

export function saveProfileImages() {
    IMG_URLS.map(url => {
        let fileName = url.split('-photos/')[1];
        let petID = fileName.split('.')[0];
        srcToFile(
            url,
            fileName,
            'image/jpg'
        ).then(function(file) {
            console.log(file);
            let metadata = {
                contentType: 'image/jpg'
            };
            let filepath = "listings/profiles/" + petID + "/img1.jpg";
            let p = uploadFile(file, metadata, filepath);
            console.log(p)
        });
    })
}

export function saveSampleListings() {
    let count = 1;
    SAMPLE_PROFILES.map(profile => {
        let petID = profile.pet_id.toString();
        // get the profile photo url
        storage.ref().child('listings/profiles/' + petID + '/img1.jpg').getDownloadURL()
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                let newProfilePhoto = "";
                if(url) newProfilePhoto = url;
                let newListing = {
                    pet_data: profile,
                    profileFiles: {
                        profilePhoto: {profilePhotoURL: newProfilePhoto},
                        application_form: {applicationFileURL: ""},
                        additionalPhotos: []
                    }
                };
                newListing.pet_data.pet_id = petID;
                console.log(newListing)
                createSamplePetListing(newListing, petID, newListing.pet_data.account_info.email);
            })
            .catch((error) => {
                // Handle any errors
            });
    })
}

function createSamplePetListing(listingData, petID, email){
    console.log(petID, email, listingData.pet_data.type);
    firestore.collection("PetInfo")
        .doc("PublicListings")
        .collection("AdoptionList")
        .doc("PetTypes")
        .collection(listingData.pet_data.type)
        .doc(petID)
        .set(listingData)
        .then((docRef) => {
            console.log("Document written");
            // profile is uploaded, now update user profile with listings
            firestore.collection("UserInfo").doc(email).get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    let newPetListings = doc.data().pet_listings.map(item => item);
                    newPetListings.push(petID);
                    const userRef = firestore.collection("UserInfo")
                        .doc(email);
                    let setWithMerge = userRef.set({
                        pet_listings: newPetListings
                    }, {merge: true});
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

function getImageURL(){
    storage.ref().child('listings/test/50882068/img1.jpg').getDownloadURL()
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);
        })
        .catch((error) => {
            // Handle any errors
        });
}

function srcToFile(src, fileName, mimeType){
    return (fetch(src)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], fileName, {type:mimeType});})
    );
}

async function uploadFile(file, metadata, filepath){
    // Create a root reference
    let storageRef = storage.ref();
    let uploadTask = storageRef.child(filepath).put(file, metadata);
    let download_url = "";
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed', // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused': // or 'paused'
                    console.log('Upload is paused');
                    break;
                case 'running': // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
}




