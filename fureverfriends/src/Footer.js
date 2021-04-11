import React from "react";
import M from "materialize-css";
import {Link, useHistory} from "react-router-dom";
import { Modal, Collapsible } from 'react-materialize';

export default function Footer() {
    M.AutoInit();
    return (
        <div>
        <div className="ftr-wrap hide-on-med-and-down">
        <div className="logo container">
            <h2><Link to="/">Furever Friends</Link></h2>
        </div>
        <div className="container">
            <div className="footer-menu row">
                <div className="pets-menu col m4 l4 x4">
                    <h3>Pets</h3>
                    <Link to="/listings"><a>Find a Pet</a></Link>
                    <Link to="/findahome"><a>Find a Home</a></Link>
                    <a href="https://www.petfinder.com/pet-care/">Pet Care</a>
                </div>
                <div className="info-menu col m4 l4 x4">
                    <h3>Information</h3>
                    <a href="#" target="_blank">About Us</a>
                    <a href="#" target="_blank">Contact Us</a>
                    <a href="#" target="_blank">FAQ/Help</a>
                </div>
                <div className="user-xp-menu col m4 l4 x4">
                    <h3>User Experience</h3>
                    <a>Sign Up</a>
                    <a>Log In</a>
                    <a>Take the Quiz</a>
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
            <h2><Link to="/">Furever Friends</Link></h2>
        </div>
        <div className="all-accordion hide-on-large-only">
            <ul className="collapsible">
                <li>
                  <div className="collapsible-header"><i className="material-icons">pets</i>Pets</div>
                  <div className="collapsible-body">
                      <span>
                        <ul>
                            <Link to="/listings"><li>Find a Pet</li></Link>
                            <Link to="/findahome"><li>Find a Home</li></Link>
                            <li><a href="https://www.petfinder.com/pet-care/" target="_blank">Pet Care</a></li>
                        </ul>
                      </span>
                    </div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">info</i>Information</div>
                  <div className="collapsible-body">
                      <span>
                          <ul>
                              <li><a href="#" target="_blank">About Us</a></li>
                              <li><a href="#" target="_blank">Contact Us</a></li>
                              <li><a href="#" target="_blank">FAQ/Help</a></li>
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
                                <li>Take the Quiz</li>
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