import React from "react";
import Header from "./Header";
import './css/style.css';
import './css/home.css';



export default function Home() {

    return (
    <div>
        <div className="banner-wrap">
            <Header/>
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
    <div className="search-or-quiz-wrap">
        <div className="quiz-wrap">
            <div className="quiz-img-wrap">
                <img className="quiz-img" src="/images/Group 78.png"/>
            </div>
            <div className="quiz-button default">
                <button className="q-btn">Take the quiz</button>
            </div>
        </div>
        <div className="search-wrap">
            <div className="form-wrap">
                <form action="#" method="post" className="search-form" id="search-form">
                    <label for="type-of-pet">Type of Pet</label>
                    <select id="type-of-pet" name="type-of-pet" onchange="populate(this.id,'breed')">
                        <option value=""></option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="HamsterGuinea">Small Furbabies</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Fish">Fish</option>
                        <option value="ReptileAmphibians">Reptile & Amphibian</option>
                        <option value="Bird">Bird</option>
                        <option value="Other">Other</option>
                      </select>

                      <label for="age">Age</label>
                      <select id="age" name="age">
                        <option value="No Preference">No Preference</option>
                        <option value="Young">Young</option>
                        <option value="Teen">Teen</option>
                        <option value="Adult">Adult</option>
                      </select>

                      <label for="breed">Breed</label>
                      <select id="breed" name="breed">
                        {/*populated using JavaScript*/}
                      </select>

                      <label for="zip-code">Zip Code</label>
                      <input type="number" id="zip-code" name="zip-code"/>
                </form>
            </div>
            <div className="search-button">
                <button className="s-btn"><a href="listings.html">Search</a></button>
            </div>
        </div>
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
                <span className="dot" onClick="currentSlide(1)"></span>
                <span className="dot" onClick="currentSlide(2)"></span>
                <span className="dot" onClick="currentSlide(3)"></span>
                <span className="dot" onClick="currentSlide(4)"></span>
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