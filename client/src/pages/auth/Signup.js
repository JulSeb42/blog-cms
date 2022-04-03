// Packages
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
} from "components-react-julseb"
import { getRandomString, passwordRegex, getRandomAvatar } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const Signup = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState("not-passed")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => {
        setPassword(e.target.value)

        if (passwordRegex.test(e.target.value)) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            imageUrl: getRandomAvatar(),
            verifyToken: getRandomString(20),
        }

        authService
            .signup(requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/dashboard/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <AuthLayout title="Signup" template="form">
            <Font.H1>Create an account</Font.H1>

            <Form btnPrimary="Create your account" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    password
                    iconPassword
                    onChange={handlePassword}
                    value={password}
                    validationText="Password must be at least 6 characters long and must contain at least one number, one lowercase and one uppercase letter."
                    validation={validation}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}

            <Font.P>
                You already have an account? <Link to="/dashboard/login">Log in</Link>.
            </Font.P>
        </AuthLayout>
    )
}

export default Signup
