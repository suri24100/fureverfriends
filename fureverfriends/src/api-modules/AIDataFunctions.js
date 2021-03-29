import {test_profile_info} from './test_profiles'
import {getProfileInfo} from './PetfinderAPI'
import { saveAs } from 'file-saver';
import placeholder_image from "../images/petProfiles/default-placeholder-image.png";

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





