import React, {useContext, useEffect, useState, Component} from 'react';
import './css/style.css';
import './css/signing.css';
import db, {auth, firestore} from "./ffdb"
import firebase from "firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [USER, setUSER] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        account_type: "Adopter",
        user_zip: "",
        user_bio: "",
        pet_listings: [],
        favorites: [],
        longitude: "",
        latitude : "",
        matches: [],
        new_notifications: []
    })

    function handleSetUSER(id, value){
        setUSER({...USER,
            [id]:value});
    }

    function handleSetUSERMatches(matchArray){
        setUSER({
            ...USER,
            matches: matchArray,
            new_notifications: matchArray
        });
    }

    function handleClearUSER(){
        setUSER({
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            account_type: "Adopter",
            user_zip: "",
            user_bio: "",
            pet_listings: [],
            favorites: [],
            longitude: "",
            latitude : "",
            matches: [],
            new_notifications: []
        });
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    // function CRUD{
    //     delete(id){
    //         return db.doc(id).delete();
    //     }
    // }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        USER,
        handleSetUSER,
        handleClearUSER,
        setUSER,
        handleSetUSERMatches
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
