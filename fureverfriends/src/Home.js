import React, { useState, useEffect } from 'react';
import Header from "./Header";
import './css/style.css';
import './css/home.css';
import $ from 'jquery';
import M from "materialize-css";


export default function Home() {
    useEffect(() => {
        M.AutoInit();
        $(document).ready(function(){
            $('select').select();
          });
      });
    return (
    <div>
        <Header/>
        <div className="banner-wrap">
        <div className="banner-img-wrap">
            {/*<img className="banner-img" src="home-banner.png">*/}
        </div>
        <div className="heading">
            <span>Let us help you find your best friend</span>
        </div>
        <div className="subheading">
            <span>Simply search below or take our quiz</span>
        </div>
    </div>
    <div className="search-or-quiz-wrap container hide-on-small-only">
        <form className="row">
            <div className="center-align quiz-wrap col s12 m6 l6 x6">
            <a class="waves-effect waves-light btn q-btn">Take The Quiz!</a>
                {/*<div className="quiz-img-wrap">
                    <img className="quiz-img m6 l6 x6" src="/images/Group 78.png"/>
                </div>*/}
            </div>
            <div className="search-wrap container col s12 m6 l6 x6">
                <div className="search">
                    <div className="listings-form-row">
                        <label for="type-of-pet">Type of Pet</label>
                        <select id="type-of-pet" name="type-of-pet">
                        </select>
                    </div>

                    <div className="listings-form-row">
                        <label for="age">Age</label>
                        <select id="age" name="age">
                            <option disabled selected></option>
                            <option value="Young">Young</option>
                            <option value="Teen">Teen</option>
                            <option value="Adult">Adult</option>
                            <option value="NoPreference">No Preference</option>
                        </select>
                    </div>

                    <div className="listings-form-row">
                        <label for="breed">Breed</label>
                        <select id="breed" name="breed">
                            {/*populated using JavaScript*/}
                        </select>
                    </div>

                    <div className="listings-form-row">
                        <label for="location">Location</label>
                        <input type="text" id="location" name="location"/>
                    </div>

                    <div className="search-btn-wrap container">
                        <button className="search-btn">Find my furever friend!</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div className="testimonial-wrap">
        <div className="testimonial-background">
            <img className="test-img" src="./images/Group 77.png"/>
        </div>
        <div className="testimonial">
            <div className="quotes">
                <q>I was very lucky to find Finn, he is a part of our little family now.
                    Taking the quiz lead me to a variety of choices tailored just for me 
                    and made the adoption process so much easier.
                </q>
            </div>
            
            <div className="quotes">
                <q>Everyday I wake up to my new beloved cat snuggling up to me.
                    I am so glad I found my furever friend. I will cherish her forever.
                    Thank you Furever Friends!
                </q>
            </div>
            
            <div className="quotes">
                <q>I was a bit skeptical about adopting through a website at first.
                    I am glad that the Safe Spawts feature exists. It helps me feel safe
                    about meeting strangers in public, pet friendly places.
                </q>
            </div>

            <div className="quotes">
                <q>I love the recommendations that Furever Friends gives me! They really
                    know what kind of pets I like! I get both email and account notifications.
                </q>
            </div>

            <div className="dot-container">
                <span className="dot" onClick="currentSlide(1)"/>
                <span className="dot" onClick="currentSlide(2)"/>
                <span className="dot" onClick="currentSlide(3)"/>
                <span className="dot" onClick="currentSlide(4)"/>
            </div>

        </div>
        <div className="share-your-xp-btn default">
            <button className="xp-button"><span>Share your experience</span></button>
        </div>
    </div>
    <div className="newsletters-wrap">
        <div className="news-img-wrap">
            {/*<img className="news-img" src="./pexels-jayden-burdick-3397935.png" />*/}
        </div>
        <div className="heading">
            <p>Sign up for newsletters</p>
        </div>
        <div className="subheading">
            <p>Get information regarding training tips and more!</p>
        </div>
        <div className="newsletter-form">
            <input type="email" className="newsletter-email" placeholder="example@email.com"/>
        </div>
    </div>
    <div className="lost-and-found-wrap">
        <div className="lost-and-found-img">
            <img className="ls-img" src="./images/lost-and-found.png"/>
        </div>
        <div className="heading">
            <p>Lost your furever friend?</p>
        </div>
        <div className="subheading">
            <p>Let us help you reunite! Fill out information regarding your pet to file a missing pet or
                help others by being on a lookout for posted pets
            </p>
        </div>
        <div className="lost-and-found-button default">
            <button className="ls-btn"><span>Lost and found</span></button>
        </div>
    </div>
    </div>
    )
}