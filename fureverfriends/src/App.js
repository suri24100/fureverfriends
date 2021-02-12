import React from "react";
// React router components
import {Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";
// our components
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import FindHome from "./FindHome";
import Listings from "./Listings";
import Login from "./Login";
import PetCare from "./PetCare";


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
  return (
    <div>
        <Header />
        <Switch>
            <Route path="/listings">
                <Listings />
            </Route>
            <Route path="/findahome">
                <Topics />
            </Route>
            <Route path="/petcare">
                <PetCare />
            </Route>
            <Route path="/findahome">
                <FindHome />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
        <Footer />
    </div>
  );
}

// example nested routing
function Topics() {
  let match = useRouteMatch();

  return (
      <div>
        <h2>Topics</h2>

        <ul>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>

        {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
        <Switch>
          // Specific
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          // Default render
          <Route path={match.path}>
            <h3>Please select a topic.</h3>
          </Route>
        </Switch>
      </div>
  );
}

function Topic() {
  let {topicId} = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}