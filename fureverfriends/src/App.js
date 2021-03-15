import React, {useEffect} from "react";
// React router components
import {Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";

//Materialize
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

// our components
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import FindHome from "./FindHome";
import Listings from "./Listings";
import Login from "./Login";
import PetCare from "./PetCare";
import NewListing from "./NewListing";
import PetProfile from "./PetProfile";
import CreateAccountConfirmation from "./CreateAccountConfirmation";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "./AuthContext"
import UserProfile from "./UserProfile";
import PrivateRoute from "./PrivateRoute";
import PurrsonalityQuiz from "./PurrsonalityQuiz";
import {UserProvider} from "./api-modules/USER"


/* This should load the header and footer on each page
* - Links to these routes can be created on any component using the format in Header.js
* - Then those links have a corresponding route below. All routes should be defined together
* - Note that routes ARE implemented top down, so if /profile:id is needed, you'd want that
*   above /profile.
*
* Types of Links:
* <Link to="/path">Link Text</Link> : Changes the url and triggers Switch to find a matching path
* <NavLink to="/path" activeClassName="class">Link Text</Navlink> : Can add styles to the active link
* <Redirect to="/path" /> : Can be used to change path when needed. For example, maybe when a user clicks logout
*/


export default function App() {
    let match = useRouteMatch();

    return (
    <div>
        <AuthProvider>
            <Header />
            <Switch>
                <Route path ="/ForgotPassword">
                    <ForgotPassword/>
                </Route>
                <Route path ="/CreatePetProfile">
                    <NewListing/>
                </Route>
                <PrivateRoute path="/CreateAccountConfirmation" component={CreateAccountConfirmation} />
                <Route path ="/CreateAccount">
                    <CreateAccount />
                </Route>
                <Route path="/listings/:type/profile/:prefix-:id">
                    <PetProfile />
                </Route>
                <Route path="/listings">
                    <Listings />
                </Route>
                <Route path="/petcare">
                    <PetCare />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/findahome">
                    <NewListing />
                </Route>
                <Route path="/quiz">
                    <PurrsonalityQuiz />
                </Route>
                <PrivateRoute path="/userprofile" component={UserProfile} />
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </AuthProvider>
    </div>

  );
}