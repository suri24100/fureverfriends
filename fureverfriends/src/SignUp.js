import React from 'react'
import {Form, Button, Card} from 'react-bootstrap';


export default function SignUp(){
    return(
        <>
            <Card>
                <Card.Body>
                    <h2> SING UP</h2>
                    <FORM>
                        <form.group id="email">
                            <form.label>Email</form.label>
                            <form.control type={"email"} ref={emailRef} required/>
                        </form.group>
                        <form.group id="password">
                            <form.label>Password</form.label>
                            <form.control type={"password"} ref={passwordRef} required/>
                        </form.group>
                        <form.group id="password-confirm">
                            <form.label>Confirm Password</form.label>
                            <form.control type={"email"} ref={passwordCpnfirmRef} required/>
                        </form.group>
                    </FORM>
                    <Button type = "submit"> SIGN UP</Button>
                </Card.Body>
            </Card>
            </>
    )
}