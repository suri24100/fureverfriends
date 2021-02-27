import React from "react";

export default function Footer() {
    return (
        <div className="ftr-wrap">
        <div className="logo">
            <h2>Furever Friends</h2>
        </div>
        <div className="footer-menu">
            <div className="pets-menu">
                <h3>Pets</h3>
                <a>Find a Pet</a>
                <a>Find a Home</a>
                <a>Pet Care</a>
                <a>Take the Quiz</a>
                <a>Lost and Found</a>
            </div>
            <div className="info-menu">
                <h3>Information</h3>
                <a>About Us</a>
                <a>Contact Us</a>
                <a>Terms and Conditions</a>
                <a>Privacy Policy</a>
            </div>
            <div className="user-xp-menu">
                <h3>User Experience</h3>
                <a>Sign Up</a>
                <a>Log In</a>
                <a>Share Your Experience</a>
                <a>Newsletters</a>
            </div>
        </div>
        <div className="social-wrap">
            <img src="./images/svg/facebook.svg"></img>
            <img src="./images/svg/instagram_test.svg"></img>
            <img src="./images/svg/twitter.svg"></img>
        </div>
    </div>
    )
}