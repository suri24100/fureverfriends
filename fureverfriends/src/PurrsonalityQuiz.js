import {useState} from "react";
import './css/style.css';
import './css/quiz.css';

export default function PurrsonalityQuiz() {

    const [quizData, setQuizData] = useState({
        username: "",
        day_off: [],
        ideal_pet: [],
        cleanliness: "",
        environment: "",
        hours_at_home: "",
        relationship_status: "",
        num_kids: "",
        young_kids: "",
        num_pets: "",
        types_of_pets: [],
        home_size: "",
        yard: "",
        allergies: []
    });

    return (
      <div className="quiz-page">
          <div className="quiz-banner-wrap">
              <div class="quiz-banner-img-wrap"></div>
              <div class="heading">
                    <span>Purrsonality Quiz</span>
              </div>
              <div class="subheading">
                    <span>Take the quiz to get matched with your potential friend</span>
              </div>
          </div>
          <div className="container">
              <form className="row">
                  <div id="q1" className="col s12">
                      <p>It’s your day off, what will you be doing? (Pick your top 3)</p>
                      <label>
                          <input id="q1-1" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                      <label>
                          <input id="q1-2" type="checkbox" value="sleeping"/>
                          <span>Snuggled up in bed to sleep in.</span>
                      </label>
                      <label>
                          <input id="q1-3" type="checkbox" value="active"/>
                          <span>On the couch, time for some TV!</span>
                      </label>
                      <label>
                          <input id="q1-4" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                      <label>
                          <input id="q1-5" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                      <label>
                          <input id="q1-6" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                      <label>
                          <input id="q1-7" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                      <label>
                          <input id="q1-8" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                      <label>
                          <input id="q1-9" type="checkbox" value="active"/>
                          <span>Outside, enjoying a run, walk, or hike.</span>
                      </label>
                  </div>
              </form>
          </div>
      </div>
    );
}