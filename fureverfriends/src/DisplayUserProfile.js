import React, {useEffect, useState} from "react";
import './css/style.css';
import {Link} from "react-router-dom";
import {firestore} from "./ffdb";
import {useAuth} from "./AuthContext";
import M from "materialize-css";



export default function DisplayUserProfile() {
    const {USER, setUSER, currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        M.AutoInit();
        if(username === ''){
            setUsername(USER.username);
        }
        console.log("Reloaded");
    })

    async function DisplayProfile (e){
        e.preventDefault();

        const snapshot = await firestore.collection("UserInfo").where("username", "==", USER.username).get();
        if(!snapshot.empty && USER.username !== username)
        {
            setLoading(false);
        }

        try {
            setLoading(true);
        }catch(err) {
            setLoading(true);
        }

        setLoading(false);
    }



    return (
        <div className="actionsnav">
            {/*in order for this to work, would need to remove <Header/> in app.js, need to fix the camel cases when user info is displayed*/}

            <div className="listings-banner-wrap">

            </div>


            <div className = "container">
                <div className="row">
                    <div className="sub-nav col s12 m3" id="side-nav full">
                        <ul className="sub-nav-options collection">
                            <li class="card-content collection-item active card-panel hoverable" >
                                {/*<i className="small material-icons prefix"> notifications </i>*/}
                                <Link to="/" >NOTIFICATIONS </Link>
                                </li>
                            <li class="card-content collection-item active card-panel hoverable" >
                                {/*<i className="small material-icons prefix">list </i>*/}
                                <Link to="/Displaylisting"> YOUR LISTINGS </Link>
                               </li>
                            <li class="card-content collection-item card active card-panel hoverable" >
                                {/*<i className="small material-icons prefix">account_circle </i>*/}
                                <Link to="/DisplayUserProfile" > ACCOUNT </Link>
                                </li>
                            <li class="card-content collection-item active card-panel hoverable" >
                                {/*<i className="small material-icons prefix">favorite  </i>*/}
                                <Link to="/DisplayFavorites" > FAVORITES </Link> </li>
                        </ul>
                    </div>




                    <div className="field col s12 m9" href="information">
                        <div className="collection">
                            <div className=" field col s12">
                                <i className="small material-icons prefix">assignment_ind </i>
                                <span className="title " style={{color: " #379683"}}>   User Name : </span> {USER.username}
                            </div>
                            <br/>
                            <br/>
                            <div>
                                <div className="col s6">
                                        <i className="small material-icons prefix">account_circle </i>
                                        <span className="title" style={{color: " #379683"}} >   First Name :  </span> {USER.first_name}
                                        <span className="title" style={{color: " #379683"}} >   Last Name : </span> {USER.last_name}
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <div className="col s12">
                                <i className="small material-icons prefix">email </i>
                                <span className="title" style={{color: " #379683"}} >   Email: </span> {USER.email}
                            </div>
                            <br/>
                            <br/>
                            <div className="col s12">
                                <i className="small material-icons prefix">local_phone </i>
                                <span className="title" style={{color: " #379683"}} >  Phone Number: </span> {USER.phone_number}
                            </div>
                            <br/>
                            <br/>
                            <div className="col s12">
                                <i className="small material-icons prefix"> pets </i>
                                <span className="title" style={{color: " #379683"}} >  Account Type: </span> {USER.account_type}
                            </div>
                            <br/>
                            <br/>
                            <div className="col s12">
                                <i className="small material-icons prefix">add_location </i>
                                <span className="title" style={{color: " #379683"}} >  Location: </span> {USER.user_zip}
                            </div>

                            <br/>
                            <br/>
                            <div className="col s12">
                                <i className="small material-icons prefix"> border_color </i>
                                <span className="title" style={{color: " #379683"}} >  Bio: </span> {USER.user_bio}
                            </div>
                        </div>
                        <Link to ="/userprofile"  className="waves-effect btn"> Edit Profile </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

