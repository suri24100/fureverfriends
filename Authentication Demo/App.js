import React, {useState, useEffect} from "react";
import fire from "./fire";
import "./App.css";
import Login from "./Login";
import Stuff from "./Stuff";



const App =() => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () =>{
        setEmail('');
        setPassword('');
    }
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }
    const handleLogin = () => {
        clearErrors();

        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                if (err.code === "auth/invalid-email" || err.code === "auth/user-disabled" || err.code === "auth/user-not-found") {
                    setEmailError(err.message);
                } else if (err.code === "auth/wrong-password") {
                    setPasswordError(err.message);
                }
            });
    };
    const handleSignUp = () => {
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                if (err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email") {
                    setEmailError(err.message);
                } else if (err.code === "auth/weak-password") {
                    setPasswordError(err.message);
                }
            });
    };

    const handleLogOut = () => {
        return fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged(user =>{
            if(user) {
                clearInputs();
                console.log("The user is logged in")
            }
            else{
                console.log("The user is not logged in")
            }
        })
    }

    useEffect(() =>{
        authListener();
    }, []);

    return (
        <div className="App">
            {user ? (
                <Stuff handleLogOut = {handleLogOut}/>
            ):(
                <Login
                    email = {email}
                    setEmail = {setEmail}
                    password = {password}
                    setPassword ={setPassword}
                    handleLogin = {handleLogin}
                    handleSignup = {handleSignUp}
                    hasAccount = {hasAccount}
                    setHasAccount = {setHasAccount}
                    emailError = {emailError}
                    passwordError = {passwordError} />
            )}


        </div>
    );
};



export default App