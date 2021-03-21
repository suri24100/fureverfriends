import {useEffect, useState} from "react";
import './css/style.css';
import './css/quiz.css';

export default function PurrsonalityQuiz() {

    const question_data = {
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
            "cuddly",
            "protective",
            "quiet",
            "social"
        ],
        q3: ["Sparkly and shiny! Dust is no match for me.",
            "Relatively tidy, enough to be comfortable and lived-in.",
            "Clean? I have better things to do with my time."
        ],
        q4: ["Indoors",
            "Outdoors",
            "No preference"
        ],
        q5: ["Less than 10", "10-20", "20-30", "30-40", "40+"],
        q6: ["Pretty quiet, Living with a partner, friend, or family member.",
            "Solitude! Living alone.",
            "It varies, I enjoy having people over",
            "Lively! Living with multiple friends, family members, or other roommates."
        ],
        q7: ["0", "1", "2", "3", "4+"],
        q8: [true, false],
        q9: ["0", "1", "2", "3", "4+"],
        q10: ["cat", "dog", "rabbit", "bird", "fish", "other"],
        q11: ["small", "medium", "large"],
        q12: [true, false],
        q13: ["allergic to cats",
            "allergic to dogs",
            "allergic to fur except hypoallergenic",
            "allergic to fur",
            "other"],
    }

    const [quizData, setQuizData] = useState({
        user_email: "",
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

    function saveQuiz(){
        console.log(quizData);
    }

    function handleChange(data){
        const id = data.target.id;
        const q_id = id.split("-")[0];
        const q_index = data.target.value;
        const field_name = data.target.name;
        let value = question_data[q_id][q_index];
        console.log(field_name + " " + value + " " + data.target.type);
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
          <div className="container">
              <div className="row">
                  <div className="col s12">
                      <p>All questions below are option. The more you answer, the better your match suggestions will be!</p>
                  </div>
              </div>
              <form className="row">
                  <div id="q1" className="col s12 question" name="hobbies">
                      <p className="text">It’s your day off, what will you be doing? (Pick your top 3)</p>
                      <ul>
                          <li>
                              <label>
                                  <input id="q1-1" name="hobbies" type="checkbox" value="0" onChange={handleChange}/>
                                  <span>Outside, enjoying a run, walk, or hike.</span>
                              </label>
                          </li>
                              <label>
                                  <input id="q1-2" name="hobbies" type="checkbox" value="1" onChange={handleChange}/>
                                  <span>Snuggled up in bed to sleep in.</span>
                              </label>
                          <li>
                              <label>
                                  <input id="q1-3" name="hobbies" type="checkbox" value="2" onChange={handleChange}/>
                                  <span>On the couch, time for some TV!</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q1-4" name="hobbies" type="checkbox" value="3" onChange={handleChange}/>
                                  <span>Enjoying some hobby time.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q1-5" name="hobbies" type="checkbox" value="4" onChange={handleChange}/>
                                  <span>Shopping and exploring downtown.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q1-6" name="hobbies" type="checkbox" value="5" onChange={handleChange}/>
                                  <span>Hanging out with my friends and family.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q1-7" name="hobbies" type="checkbox" value="6" onChange={handleChange}/>
                                  <span>Cleaning and prepping for the week ahead.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q1-8" name="hobbies" type="checkbox" value="7" onChange={handleChange}/>
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
                                  <input id="q2-1" name="ideal_pet" type="checkbox" value="0" onChange={handleChange}/>
                                  <span>Playful</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-2" name="ideal_pet" type="checkbox" value="1" onChange={handleChange}/>
                                  <span>Talkative</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-3" name="ideal_pet" type="checkbox" value="2" onChange={handleChange}/>
                                  <span>Adventurous</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-4" name="ideal_pet" type="checkbox" value="3" onChange={handleChange}/>
                                  <span>Affectionate</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-5" name="ideal_pet" type="checkbox" value="4" onChange={handleChange}/>
                                  <span>Independent</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-6" name="ideal_pet"v type="checkbox" value="5" onChange={handleChange}/>
                                  <span>Energetic</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-7" name="ideal_pet" type="checkbox" value="6" onChange={handleChange}/>
                                  <span>Calm</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-8" name="ideal_pet" type="checkbox" value="7" onChange={handleChange}/>
                                  <span>Quiet</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-8" name="ideal_pet" type="checkbox" value="8" onChange={handleChange}/>
                                  <span>Protective</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q2-8" name="ideal_pet" type="checkbox" value="9" onChange={handleChange}/>
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
                                  <input class="with-gap" id="q3-1" name="cleanliness" type="radio" value="0" onChange={handleChange}/>
                                  <span>Sparkly and shiny! Dust is no match for me.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input class="with-gap" id="q3-2" name="cleanliness" type="radio" value="1" onChange={handleChange}/>
                                  <span>Relatively tidy, enough to be comfortable and lived-in.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input class="with-gap" id="q3-3" name="cleanliness" type="radio" value="2" onChange={handleChange}/>
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
                                  <input className="with-gap" id="q4-1" name="environment" type="radio" value="0" onChange={handleChange}/>
                                  <span>Indoors</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q4-2" name="environment" type="radio" value="1" onChange={handleChange}/>
                                  <span>Outside</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q4-3" name="environment" type="radio" value="2" onChange={handleChange}/>
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
                                  <input className="with-gap" id="q6-1" name="social_environment" type="radio" value="0" onChange={handleChange}/>
                                  <span>Pretty quiet, Living with a partner, friend, or family member.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q6-3" name="social_environment" type="radio" value="1" onChange={handleChange}/>
                                  <span>Solitude! Living alone.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q6-3" name="social_environment" type="radio" value="2" onChange={handleChange}/>
                                  <span>It varies, I enjoy having people over.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q6-3" name="social_environment" type="radio" value="3" onChange={handleChange}/>
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
                                  <input className="with-gap" id="q8-1" name="young_kids" type="radio" value="0" onChange={handleChange}/>
                                  <span>Yes</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q8-2" name="young_kids" type="radio" value="1" onChange={handleChange}/>
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
                                  <input id="q10-1" name="types_of_pets" type="checkbox" value="0" onChange={handleChange}/>
                                  <span>Cat</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q10-2" name="types_of_pets" type="checkbox" value="1" onChange={handleChange}/>
                                  <span>Dog</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q10-3" name="types_of_pets" type="checkbox" value="2" onChange={handleChange}/>
                                  <span>Rabbit</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q10-3" name="types_of_pets" type="checkbox" value="3" onChange={handleChange}/>
                                  <span>Bird</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q10-3" name="types_of_pets" type="checkbox" value="4" onChange={handleChange}/>
                                  <span>Fish</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q10-3" type="checkbox" name="types_of_pets" value="5" onChange={handleChange}/>
                                  <span>Other</span>
                                  <div className="input-field inline">
                                      <input id="q10-3-1" name="other_pets" type="text" className="validate" onBlur={handleChange}/>
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
                                  <input className="with-gap" id="q11-1" name="home_size" type="radio" value="0" onChange={handleChange}/>
                                  <span>Small, 1000 sqft or less.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q11-2" name="home_size" type="radio" value="1" onChange={handleChange}/>
                                  <span>Medium, 1000-2000 sqft.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q11-3" name="home_size" type="radio" value="2" onChange={handleChange}/>
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
                                  <input className="with-gap" id="q12-1" name="yard" type="radio" value="0" onChange={handleChange}/>
                                  <span>Yes</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input className="with-gap" id="q12-2" name="yard" type="radio" value="1" onChange={handleChange}/>
                                  <span>No</span>
                              </label>
                          </li>
                      </ul>
                  </div>
                  <div id="q13" className="col s12 question">
                      <p className="text">Do you have any pet-related allergies? (Select all that apply).</p>
                      <ul>
                          <li>
                              <label>
                                  <input id="q13-1" name="allergies" type="checkbox" value="0" onChange={handleChange}/>
                                  <span>Cats</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q13-2" name="allergies" type="checkbox" value="1" onChange={handleChange}/>
                                  <span>Dogs</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q13-3" name="allergies" type="checkbox" value="2" onChange={handleChange}/>
                                  <span>Anything with fur, unless it’s hypoallergenic.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q13-3" name="allergies" type="checkbox" value="3" onChange={handleChange}/>
                                  <span>Anything with fur, including hypoallergenic animals.</span>
                              </label>
                          </li>
                          <li>
                              <label>
                                  <input id="q13-3" name="allergies" type="checkbox" value="4" onChange={handleChange}/>
                                  <span>Other</span>
                                  <div className="input-field inline">
                                      <input id="q13-3-1" name="other_allergies" type="text" className="validate" onBlur={handleChange}/>
                                  </div>
                              </label>
                          </li>
                      </ul>
                  </div>
                  <div className="col s12 center">
                      <button className="btn-large" type="button">Submit Your Answers</button>
                  </div>
              </form>
          </div>
      </div>
    );
}