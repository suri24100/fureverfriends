import {useEffect, useState} from "react";
import './css/style.css';
import './css/quiz.css';
import {useAuth} from './AuthContext';
import {firestore} from "./ffdb";

export default function PurrsonalityQuiz() {

    const {USER} = useAuth();

    const question_data = {
        q0: ["dog",
            "cat",
            "rabbit",
            "small_furry",
            "horse",
            "bird",
            "scales_fins_other",
            "barnyard"
        ],
        q1: ["Outside, enjoying a run, walk, or hike.",
            "Snuggled up in bed to sleep in.",
            "On the couch, time for some TV!",
            "Enjoying some hobby time.",
            "Shopping and exploring downtown.",
            "Hanging out with my friends and family.",
            "Cleaning and prepping for the week ahead.",
            "Working. What is a day off?"
        ],
        q2: ["playful",
            "talkative",
            "adventurous",
            "affectionate",
            "independent",
            "energetic",
            "calm",
            "protective",
            "quiet",
            "social"
        ],
        q3: ["Sparkly and shiny! Dust is no match for me.",
            "Relatively tidy, enough to be comfortable and lived-in.",
            "Clean? I have better things to do with my time."
        ],
        q4: ["indoors",
            "outdoors",
            "indoors or outdoors"
        ],
        q5: ["Less than 10 hours at home", "10-20 hours at home", "20-30 hours at home", "30-40 hours at home", "40+ hours at home"],
        q6: ["Pretty quiet, Living with a partner, friend, or family member.",
            "Solitude! Living alone.",
            "It varies, I enjoy having people over",
            "Lively! Living with multiple friends, family members, or other roommates."
        ],
        q7: ["0 kids", "1 kid", "2 kids", "3 kids", "4+ kids"],
        q8: ["has pets", "has no pets"],
        q9: ["0 pets", "1 pets", "2 pets", "3 pets", "4+ pets"],
        q10: ["cat", "dog", "rabbit", "bird", "fish", "other pet"],
        q11: ["small", "medium", "large"],
        q12: ["yard", "no yard"],
        q13: ["allergic to cats",
            "allergic to dogs",
            "allergic to fur except hypoallergenic",
            "allergic to fur",
            "other allergy"],
    }

    const [submitError, setSubmitError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [previousQuiz, setPreviousQuiz] = useState(false);
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [quizData, setQuizData] = useState({
        user_email: "",
        username: "",
        interested_pet_types: [],
        hobbies: [],
        ideal_pet: [],
        cleanliness: "",
        environment: "",
        time_at_home: "",
        social_environment: "",
        num_kids: "",
        young_kids: "",
        num_pets: "",
        types_of_pets: [],
        other_pets: "",
        home_size: "",
        yard: "",
        allergies: [],
        other_allergies: "",
        ai_data: [],
    });
    useEffect(() => {
        if((quizData.user_email === "") && USER.email !== ""){
            setQuizData({
                ...quizData,
                user_email: USER.email,
                username: USER.username
            })
            // check if quiz entry exists
            firestore.collection("QuizData")
                .doc(USER.email)
                .get().then((doc) => {
                if (doc.exists) {
                    console.log("Found previous quiz");
                    setPreviousQuiz(true);
                    setInfoLoaded(true);
                } else {
                    console.log("Did not find previous quiz");
                    setInfoLoaded(true);
                    // user hasn't taken the quiz before, proceed as usual
                }
            }).catch((error) => {
                setInfoLoaded(true);
                // unable to get data, proceed as usual
            });
        }
    })

    function saveQuiz(){
        document.getElementById("save-quiz").disabled = true;

        // make ai_data and check if form has fields filled out
        let notEmpty = false;
        let newAIData = [];
        if(quizData.hobbies.length > 0){
            quizData.hobbies.map(item => newAIData.push(item));
            notEmpty = true;
        }
        if(quizData.ideal_pet.length > 0){
            quizData.ideal_pet.map(item => newAIData.push(item));
            notEmpty = true;
        }
        if(quizData.environment !== "" ){
            newAIData.push(quizData.environment);
            notEmpty = true;
        }
        if(quizData.time_at_home !== "" ){
            newAIData.push(quizData.time_at_home);
            notEmpty = true;
        }
        if(quizData.social_environment !== "" ){
            newAIData.push(quizData.social_environment);
            notEmpty = true;
        }
        if(quizData.num_kids !== "" ){
            newAIData.push(quizData.num_kids);
            notEmpty = true;
        }
        if(quizData.young_kids !== "" ){
            newAIData.push(quizData.young_kids);
            notEmpty = true;
        }
        if(quizData.num_pets !== "" ){
            newAIData.push(quizData.num_pets);
            notEmpty = true;
        }
        if(quizData.types_of_pets.length > 0){
            quizData.types_of_pets.map(item => newAIData.push(item));
            notEmpty = true;
        }
        if(quizData.other_pets !== "" ){
            newAIData.push(quizData.other_pets);
            notEmpty = true;
        }
        if(quizData.home_size !== "" ){
            newAIData.push(quizData.home_size);
            notEmpty = true;
        }
        if(quizData.yard !== "" ){
            newAIData.push(quizData.yard);
            notEmpty = true;
        }
        if(quizData.allergies.length > 0){
            quizData.allergies.map(item => newAIData.push(item));
            notEmpty = true;
        }
        if(quizData.other_allergies.length > 0){
            newAIData.push("allergic to " + quizData.other_allergies);
            notEmpty = true;
        }

        if(notEmpty && quizData.user_email !== ""){
            setSubmitError(false);
            let newQuizObject = {
                user_email: quizData.user_email,
                username: quizData.username,
                interested_pet_types: quizData.interested_pet_types,
                hobbies: quizData.hobbies,
                ideal_pet: quizData.ideal_pet,
                cleanliness: quizData.cleanliness,
                environment: quizData.environment,
                time_at_home: quizData.time_at_home,
                social_environment: quizData.social_environment,
                num_kids: quizData.num_kids,
                young_kids: quizData.young_kids,
                num_pets: quizData.num_pets,
                types_of_pets: quizData.types_of_pets,
                other_pets: quizData.other_pets,
                home_size: quizData.home_size,
                yard: quizData.yard,
                allergies: quizData.allergies,
                other_allergies: quizData.other_allergies,
                ai_data: newAIData
            }

            // save to ffdb
            firestore.collection("QuizData")
                .doc(quizData.user_email).set(newQuizObject)
                .then(() => {
                    console.log("Document saved");
                    setSubmitSuccess(true);
                });
        }
        else if(quizData.user_email === ""){
            console.log("Error: user not logged in.");
        }
        else{
            console.log("Must answer at least one question to save the quiz.");
            document.getElementById("save-quiz").disabled = false;
            setSubmitError(true);

        }

    }

    function handleChange(data){
        const id = data.target.id;
        const q_id = id.split("-")[0];
        const q_index = data.target.value;
        const field_name = data.target.name;
        let value = question_data[q_id][q_index];
        if (data.target.type === "checkbox"){
            const curr_array = quizData[field_name];
            if(!curr_array.includes(value) && data.target.checked){
                curr_array.push(value);
            } else if(curr_array.includes(value) && !data.target.checked) {
                curr_array.pop(value);
            }
            setQuizData({
                ...quizData,
                [field_name]: curr_array
            })
        } else if (data.target.type === "text"){
            value = data.target.value;
            setQuizData({
                ...quizData,
                [field_name]: value
            })
        } else {
            setQuizData({
                ...quizData,
                [field_name]: value
            })
        }
    }

    function retakeQuiz(){
        document.getElementById("retake-quiz").disabled = true;
        setPreviousQuiz(false);
    }

    return (
      <div className="quiz-page">
          <div className="quiz-banner-wrap">
              <div class="quiz-banner-img-wrap"></div>
              <div class="heading">
                    <span>Purrsonality Quiz</span>
              </div>
              <div class="subheading">
                    <span>Take the Quiz to Find Your Match</span>
              </div>
          </div>
          {infoLoaded ?
              <>{previousQuiz ?
                      <div className="container success-page">
                          <h4>Want to Take the Quiz Again?</h4>
                          <p>It looks like you've already taken the Purrsonality Quiz.</p>
                          <p>You're free to take it as many times as you like, especially if you think your preferences have changed.
                              Just keep in mind that your previous matches may disappear if you select different answers.</p>
                          <button id="retake-quiz" className="btn-large" type="button" onClick={retakeQuiz}>
                              Retake the Quiz
                          </button>
                      </div>
                      :
                      <>{submitSuccess ?
                          <div className="container success-page">
                              <h4>Thank you for completing the Purrsonality Quiz!</h4>
                              <p>Check your MyMatches page to find some pets that may be your next Furever Friend.</p>
                          </div>
                          :
                          <div className="container">
                              <div className="row">
                                  <div className="col s12">
                                      <p>All questions below are option. The more you answer, the better your match
                                          suggestions will
                                          be!</p>
                                  </div>
                              </div>
                              <form className="row">
                                  <div id="q0" className="col s12 question">
                                      <p className="text">What kind of pet are you interested in adopting? (Select all that
                                          apply)</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input id="q0-1" name="interested_pet_types" type="checkbox" value="0"
                                                         onChange={handleChange}/>
                                                  <span>Dogs</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-2" name="interested_pet_types" type="checkbox" value="1"
                                                         onChange={handleChange}/>
                                                  <span>Cats</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-3" name="interested_pet_types" type="checkbox" value="2"
                                                         onChange={handleChange}/>
                                                  <span>Rabbits</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-4" name="interested_pet_types" type="checkbox" value="3"
                                                         onChange={handleChange}/>
                                                  <span>Small furry animals</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-5" name="interested_pet_types" type="checkbox" value="4"
                                                         onChange={handleChange}/>
                                                  <span>Hores</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-6" name="interested_pet_types" type="checkbox" value="5"
                                                         onChange={handleChange}/>
                                                  <span>Birds</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-7" name="interested_pet_types" type="checkbox" value="6"
                                                         onChange={handleChange}/>
                                                  <span>Scales, Fins, and others</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q0-8" name="interested_pet_types" type="checkbox" value="7"
                                                         onChange={handleChange}/>
                                                  <span>Barnyard animals</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q1" className="col s12 question" name="hobbies">
                                      <p className="text">It’s your day off, what will you be doing? (Pick your top 3)</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input id="q1-1" name="hobbies" type="checkbox" value="0"
                                                         onChange={handleChange}/>
                                                  <span>Outside, enjoying a run, walk, or hike.</span>
                                              </label>
                                          </li>
                                          <label>
                                              <input id="q1-2" name="hobbies" type="checkbox" value="1"
                                                     onChange={handleChange}/>
                                              <span>Snuggled up in bed to sleep in.</span>
                                          </label>
                                          <li>
                                              <label>
                                                  <input id="q1-3" name="hobbies" type="checkbox" value="2"
                                                         onChange={handleChange}/>
                                                  <span>On the couch, time for some TV!</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q1-4" name="hobbies" type="checkbox" value="3"
                                                         onChange={handleChange}/>
                                                  <span>Enjoying some hobby time.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q1-5" name="hobbies" type="checkbox" value="4"
                                                         onChange={handleChange}/>
                                                  <span>Shopping and exploring downtown.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q1-6" name="hobbies" type="checkbox" value="5"
                                                         onChange={handleChange}/>
                                                  <span>Hanging out with my friends and family.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q1-7" name="hobbies" type="checkbox" value="6"
                                                         onChange={handleChange}/>
                                                  <span>Cleaning and prepping for the week ahead.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q1-8" name="hobbies" type="checkbox" value="7"
                                                         onChange={handleChange}/>
                                                  <span>Working. What is a “day off?”</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q2" className="col s12 question">
                                      <p className="text">What would your ideal pet be like? (Select all that apply)</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input id="q2-1" name="ideal_pet" type="checkbox" value="0"
                                                         onChange={handleChange}/>
                                                  <span>Playful</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-2" name="ideal_pet" type="checkbox" value="1"
                                                         onChange={handleChange}/>
                                                  <span>Talkative</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-3" name="ideal_pet" type="checkbox" value="2"
                                                         onChange={handleChange}/>
                                                  <span>Adventurous</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-4" name="ideal_pet" type="checkbox" value="3"
                                                         onChange={handleChange}/>
                                                  <span>Affectionate</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-5" name="ideal_pet" type="checkbox" value="4"
                                                         onChange={handleChange}/>
                                                  <span>Independent</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-6" name="ideal_pet" v type="checkbox" value="5"
                                                         onChange={handleChange}/>
                                                  <span>Energetic</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-7" name="ideal_pet" type="checkbox" value="6"
                                                         onChange={handleChange}/>
                                                  <span>Calm</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-8" name="ideal_pet" type="checkbox" value="7"
                                                         onChange={handleChange}/>
                                                  <span>Quiet</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-9" name="ideal_pet" type="checkbox" value="8"
                                                         onChange={handleChange}/>
                                                  <span>Protective</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q2-10" name="ideal_pet" type="checkbox" value="9"
                                                         onChange={handleChange}/>
                                                  <span>Social</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q3" className="col s12 question">
                                      <p className="text">How clean do you like things?</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q3-1" name="cleanliness" type="radio"
                                                         value="0"
                                                         onChange={handleChange}/>
                                                  <span>Sparkly and shiny! Dust is no match for me.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q3-2" name="cleanliness" type="radio"
                                                         value="1"
                                                         onChange={handleChange}/>
                                                  <span>Relatively tidy, enough to be comfortable and lived-in.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q3-3" name="cleanliness" type="radio"
                                                         value="2"
                                                         onChange={handleChange}/>
                                                  <span>Clean? I have better things to do with my time.</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q4" className="col s12 question">
                                      <p className="text">In general, you prefer to be:</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q4-1" name="environment" type="radio"
                                                         value="0"
                                                         onChange={handleChange}/>
                                                  <span>Indoors</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q4-2" name="environment" type="radio"
                                                         value="1"
                                                         onChange={handleChange}/>
                                                  <span>Outside</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q4-3" name="environment" type="radio"
                                                         value="2"
                                                         onChange={handleChange}/>
                                                  <span>No preference</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q5" className="col s12 question">
                                      <span className="text">You are typically home </span>
                                      <div className="input-field inline">
                                          <select id="q5-1" name="time_at_home" onChange={handleChange}>
                                              <option value="" disabled selected></option>
                                              <option value="0">Less than 10</option>
                                              <option value="1">10-20</option>
                                              <option value="2">20-30</option>
                                              <option value="3">30-40</option>
                                              <option value="4">40+</option>
                                          </select>
                                      </div>
                                      <span className="text"> hours a week.</span>
                                  </div>
                                  <div id="q6" className="col s12 question">
                                      <p className="text">How social is your environment?</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q6-1" name="social_environment"
                                                         type="radio"
                                                         value="0" onChange={handleChange}/>
                                                  <span>Pretty quiet, Living with a partner, friend, or family member.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q6-3" name="social_environment"
                                                         type="radio"
                                                         value="1" onChange={handleChange}/>
                                                  <span>Solitude! Living alone.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q6-3" name="social_environment"
                                                         type="radio"
                                                         value="2" onChange={handleChange}/>
                                                  <span>It varies, I enjoy having people over.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q6-3" name="social_environment"
                                                         type="radio"
                                                         value="3" onChange={handleChange}/>
                                                  <span>Lively! Living with multiple friends, family members, or other roommates.</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q7" className="col s12 question">
                                      <span className="text">You have </span>
                                      <div className="input-field inline">
                                          <select id="q7-1" name="num_kids" onChange={handleChange}>
                                              <option value="" disabled selected></option>
                                              <option value="0">0</option>
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4+</option>
                                          </select>
                                      </div>
                                      <span className="text"> kids in your household.</span>
                                  </div>
                                  <div id="q8" className="col s12 question">
                                      <span className="text">Are any of the kids 5 years or younger? </span>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q8-1" name="young_kids" type="radio"
                                                         value="0"
                                                         onChange={handleChange}/>
                                                  <span>Yes</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q8-2" name="young_kids" type="radio"
                                                         value="1"
                                                         onChange={handleChange}/>
                                                  <span>No</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q9" className="col s12 question">
                                      <span className="text">How many other pets do you have? </span>
                                      <div className="input-field inline">
                                          <select id="q9-1" name="num_pets" onChange={handleChange}>
                                              <option value="" disabled selected></option>
                                              <option value="0">0</option>
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4+</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div id="q10" className="col s12 question">
                                      <p className="text">What type of pets do you have? (Select all that apply).</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input id="q10-1" name="types_of_pets" type="checkbox" value="0"
                                                         onChange={handleChange}/>
                                                  <span>Cat</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q10-2" name="types_of_pets" type="checkbox" value="1"
                                                         onChange={handleChange}/>
                                                  <span>Dog</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q10-3" name="types_of_pets" type="checkbox" value="2"
                                                         onChange={handleChange}/>
                                                  <span>Rabbit</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q10-3" name="types_of_pets" type="checkbox" value="3"
                                                         onChange={handleChange}/>
                                                  <span>Bird</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q10-3" name="types_of_pets" type="checkbox" value="4"
                                                         onChange={handleChange}/>
                                                  <span>Fish</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q10-3" type="checkbox" name="types_of_pets" value="5"
                                                         onChange={handleChange}/>
                                                  <span>Other</span>
                                                  <div className="input-field inline">
                                                      <input id="q10-3-1" name="other_pets" type="text" className="validate"
                                                             onBlur={handleChange}/>
                                                  </div>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q11" className="col s12 question">
                                      <p className="text">How big is your home?</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q11-1" name="home_size" type="radio"
                                                         value="0"
                                                         onChange={handleChange}/>
                                                  <span>Small, 1000 sqft or less.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q11-2" name="home_size" type="radio"
                                                         value="1"
                                                         onChange={handleChange}/>
                                                  <span>Medium, 1000-2000 sqft.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q11-3" name="home_size" type="radio"
                                                         value="2"
                                                         onChange={handleChange}/>
                                                  <span>Large, more than 2000 sqft.</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q12" className="col s12 question">
                                      <span className="text">Do you have a yard? </span>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q12-1" name="yard" type="radio" value="0"
                                                         onChange={handleChange}/>
                                                  <span>Yes</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input className="with-gap" id="q12-2" name="yard" type="radio" value="1"
                                                         onChange={handleChange}/>
                                                  <span>No</span>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div id="q13" className="col s12 question">
                                      <p className="text">Do you have any pet-related allergies? (Select all that
                                          apply).</p>
                                      <ul>
                                          <li>
                                              <label>
                                                  <input id="q13-1" name="allergies" type="checkbox" value="0"
                                                         onChange={handleChange}/>
                                                  <span>Cats</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q13-2" name="allergies" type="checkbox" value="1"
                                                         onChange={handleChange}/>
                                                  <span>Dogs</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q13-3" name="allergies" type="checkbox" value="2"
                                                         onChange={handleChange}/>
                                                  <span>Anything with fur, unless it’s hypoallergenic.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q13-3" name="allergies" type="checkbox" value="3"
                                                         onChange={handleChange}/>
                                                  <span>Anything with fur, including hypoallergenic animals.</span>
                                              </label>
                                          </li>
                                          <li>
                                              <label>
                                                  <input id="q13-3" name="allergies" type="checkbox" value="4"
                                                         onChange={handleChange}/>
                                                  <span>Other</span>
                                                  <div className="input-field inline">
                                                      <input id="q13-3-1" name="other_allergies" type="text"
                                                             className="validate"
                                                             onBlur={handleChange}/>
                                                  </div>
                                              </label>
                                          </li>
                                      </ul>
                                  </div>
                                  <div className="col s12 center">
                                      <button id="save-quiz" className="btn-large" type="button" onClick={saveQuiz}>Submit
                                          Your
                                          Answers
                                      </button>
                                      {submitError &&
                                      <p className="submitError">Required: Please answer at least one question to submit the
                                          quiz.</p>}
                                  </div>
                              </form>
                          </div>
                      }</>
              }</>
              :
              <div className="container"></div>
          }

      </div>
    );
}