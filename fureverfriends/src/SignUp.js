import React, {useRef, useState} from 'react'
import {Form, Button, Card} from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom"


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    function useAuth() {

    }

    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function Submit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }
    return(
        <>
            <Card>
                <Card.Body>
                    <h2> SING UP</h2>
                    <Form>
                        <Form.group id="email">
                            <Form.label>Email</Form.label>
                            <Form.control type={"email"} ref={emailRef} required/>
                        </Form.group>
                        <Form.group id="password">
                            <Form.label>Password</Form.label>
                            <Form.control type={"password"} ref={passwordRef} required/>
                        </Form.group>
                        <Form.group id="password-confirm">
                            <Form.label>Confirm Password</Form.label>
                            <Form.control type={"email"} ref={passwordConfirmRef} required/>
                        </Form.group>
                    </Form>
                    <Button type = "submit"> SIGN UP</Button>
                </Card.Body>
            </Card>
            </>
    )
}