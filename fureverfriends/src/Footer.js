import React from "react";
import M from "materialize-css";
import {Link, useHistory} from "react-router-dom";
import { Modal, Collapsible } from 'react-materialize';
import {useAuth} from "./AuthContext";

export default function Footer() {
    M.AutoInit();
    const { currentUser, USER, handleLogOut} = useAuth();

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
                    <Link to="/listings" onClick={() => window.scrollTo(0, 0)}><a>Find a Pet</a></Link>
                    <Link to="/findahome" onClick={() => window.scrollTo(0, 0)}><a>Find a Home</a></Link>
                    <Link to="/quiz" onClick={() => window.scrollTo(0, 0)}>Find Your Match</Link>
                </div>
                <div className="info-menu col m4 l4 x4">
                    <h3>Information</h3>
                    <a href="#" target="_blank">About Us</a>
                    <a href="#" target="_blank">Contact Us</a>
                    <a href="#" target="_blank">FAQ/Help</a>
                </div>
                <div className="user-xp-menu col m4 l4 x4">
                    <h3>Your Account</h3>
                    {currentUser && <Link to="/account-info" onClick={() => window.scrollTo(0, 0)}>My Account</Link>}
                    {currentUser && <Link to="/my-listings" onClick={() => window.scrollTo(0, 0)}>My Pet Listings</Link>}
                    {currentUser && <Link to="/my-favorites" onClick={() => window.scrollTo(0, 0)}>My Favorites</Link>}
                    {currentUser ?
                        <Link to="/" onClick={handleLogOut}>Log Out</Link>
                        : <Link to="/login">Log In</Link> }
                    {!currentUser && <Link to="/create-account" onClick={() => window.scrollTo(0, 0)}>Create an Account</Link>}
                </div>
            </div>
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
                            <li><Link to="/listings" onClick={() => window.scrollTo(0, 0)}>Find a Pet</Link></li>
                            <li><Link to="/findahome" onClick={() => window.scrollTo(0, 0)}>Find a Home</Link></li>
                            <li><Link to="/quiz" onClick={() => window.scrollTo(0, 0)}>Find Your Match</Link></li>
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
                    <div className="collapsible-header"><i className="material-icons">account_circle</i>Your Account</div>
                    <div className="collapsible-body">
                        <span>
                            <ul>
                                {currentUser && <li><Link to="/account-info" onClick={() => window.scrollTo(0, 0)}>My Account</Link></li>}
                                {currentUser && <li><Link to="/my-listings" onClick={() => window.scrollTo(0, 0)}>My Pet Listings</Link></li>}
                                {currentUser && <li><Link to="/my-favorites" onClick={() => window.scrollTo(0, 0)}>My Favorites</Link></li>}
                                <li>{currentUser ?
                                    <Link to="/" onClick={handleLogOut}>Log Out</Link>
                                    : <Link to="/login">Log In</Link> }
                                </li>
                                {!currentUser && <li><Link to="/create-account" onClick={() => window.scrollTo(0, 0)}>Create an Account</Link></li>}
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
