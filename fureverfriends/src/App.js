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
import SignUp from "./SignUp";
import db from "./ffdb";
import NewListing from "./NewListing";
import PetProfile from "./PetProfile";
import CreateAccount from "./CreateAccount";



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

// db.collection('petinformation').get().then((snapshot) => {
//     console.log(snapshot.docs)
// } )
    return (
    <div>
        <Switch>
            <Route path ="/Signup">
                <SignUp/>
            </Route>
            <Route path ="/NewListing">
                <NewListing/>
            </Route>
            <Route path ="/CreateAccount">
                <CreateAccount />
            </Route>
            <Route path="/listings/profile/:prefix-:id">
                <PetProfile />
            </Route>
            <Route path="/listings">
                <Listings />
            </Route>
            <Route path="/findahome">
                <FindHome />
            </Route>
            <Route path="/petcare">
                <PetCare />
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

// const App =() => {
//     const [user, setUser] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [hasAccount, setHasAccount] = useState(false);
//
//     const clearInputs = () =>{
//         setEmail('');
//         setPassword('');
//     }
//     const clearErrors = () => {
//         setEmailError('');
//         setPasswordError('');
//     }
//     const handleLogin = () => {
//         clearErrors();
//
//         fire
//             .auth()
//             .signInWithEmailAndPassword(email, password)
//             .catch((err) => {
//                 if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
//                     setEmailError(err.message);
//                 } else if (err.code === "auth/wrong-password") {
//                     setPasswordError(err.message);
//                 }
//             });
//     };
//     const handleSignUp = () => {
//         fire
//             .auth()
//             .createUserWithEmailAndPassword(email, password)
//             .catch((err) => {
//                 if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
//                     setEmailError(err.message);
//                 } else if (err.code === "auth/weak-password") {
//                     setPasswordError(err.message);
//                 }
//             });
//     };
//
//     const handleLogOut = () => {
//         return fire.auth().signOut();
//     };
//
//     const authListener = () => {
//         fire.auth().onAuthStateChanged(user =>{
//             if(user) {
//                 clearInputs();
//                 console.log("The user is logged in")
//             }
//             else{
//                 console.log("The user is not logged in")
//             }
//         })
//     }
//
//     useEffect(() =>{
//         authListener();
//     }, []);
//
//     return (
//         <div className="App">
//             {user ? (
//                 <Stuff handleLogOut = {handleLogOut}/>
//             ):(
//                 <Login
//                     email = {email}
//                     setEmail = {setEmail}
//                     password = {password}
//                     setPassword ={setPassword}
//                     handleLogin = {handleLogin}
//                     handleSignup = {handleSignUp}
//                     hasAccount = {hasAccount}
//                     setHasAccount = {setHasAccount}
//                     emailError = {emailError}
//                     passwordError = {passwordError} />
//             )}
//
//
//         </div>
//     );
// };
//
//
//
// export default App