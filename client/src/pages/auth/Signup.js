// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

// Utils
import getRandomString from "../../components/utils/getRandomString"

function Signup() {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            verified: false,
            verifyToken: getRandomString(20),
            role: "writer",
            approved: false,
        }

        axios
            .put("/auth/signup", requestBody)
            .then(res => {
                loginUser(res.data)
                navigate("/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Signup">
            <Font.H1>Signup</Font.H1>

            <Form onSubmit={handleSubmit} btnprimary="Create your account">
                <Input
                    label="Full name"
                    type="text"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    inputtype="password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                />
            </Form>

            <Font.P>
                You already have an account? <Link to="/login">Login</Link>
            </Font.P>

            {errorMessage && <Font.P>{errorMessage}</Font.P>}
        </Page>
    )
}

export default Signup
