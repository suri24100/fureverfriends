import React from "react";
import M from "materialize-css";
import { Modal, Collapsible } from 'react-materialize';

export default function Footer() {
    M.AutoInit();
    return (
        <div>
        <div className="ftr-wrap hide-on-med-and-down">
        <div className="logo container">
            <h2>Furever Friends</h2>
        </div>
        <div className="container">
            <div className="footer-menu row">
                <div className="pets-menu col m4 l4 x4">
                    <h3>Pets</h3>
                    <a>Find a Pet</a>
                    <a>Find a Home</a>
                    <a>Pet Care</a>
                    <a>Take the Quiz</a>
                    <a>Lost and Found</a>
                </div>
                <div className="info-menu col m4 l4 x4">
                    <h3>Information</h3>
                    <a>About Us</a>
                    <a>Contact Us</a>
                    <a>Terms and Conditions</a>
                    <a>Privacy Policy</a>
                </div>
                <div className="user-xp-menu col m4 l4 x4">
                    <h3>User Experience</h3>
                    <a>Sign Up</a>
                    <a>Log In</a>
                    <a>Share Your Experience</a>
                    <a>Newsletters</a>
                </div>
            </div>
        </div>
        <div className="social-wrap">
            <img src="./images/svg/facebook.svg"></img>
            <img src="./images/svg/instagram_test.svg"></img>
            <img src="/images/svg/twitter.svg"></img>
        </div>
    </div>
    <div className="mobile-ftr-wrap hide-on-large-only">
        <div className="logo container">
            <h2>Furever Friends</h2>
        </div>
        <div className="all-accordion hide-on-large-only">
            <ul className="collapsible">
                <li>
                  <div className="collapsible-header"><i className="material-icons">pets</i>Pets</div>
                  <div className="collapsible-body">
                      <span>
                        <ul>
                            <li>Find a Pet</li>
                            <li>Find a Home</li>
                            <li>Pet Care</li>
                            <li>Take the Quiz</li>
                            <li>Lost and Found</li>
                        </ul>
                      </span>
                    </div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">info</i>Information</div>
                  <div className="collapsible-body">
                      <span>
                          <ul>
                              <li>About Us</li>
                              <li>Contact Us</li>
                              <li>Privacy Policy</li>
                              <li>Terms and Conditions</li>
                          </ul>
                      </span>
                  </div>
                </li>
                <li>
                    <div className="collapsible-header"><i className="material-icons">account_circle</i>User Expereince</div>
                    <div className="collapsible-body">
                        <span>
                            <ul>
                                <li>Sign Up</li>
                                <li>Log In</li>
                                <li>Share Your Experience</li>
                                <li>Newsletters</li>
                            </ul>
                        </span>
                    </div>
                  </li>
              </ul>
        </div>
    </div>
    </div>
    )
}