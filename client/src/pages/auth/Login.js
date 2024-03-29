// Packages
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    // Form handles
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        authService
            .login(requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/dashboard")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <AuthLayout title="Login">
            <Font.H1>Log in</Font.H1>

            <Form btnPrimary="Login" onSubmit={handleSubmit}>
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
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}

            <Font.P>
                <Link to="/dashboard/login/forgot-password">
                    I forgot my password.
                </Link>
            </Font.P>

            <Font.P>
                You don't have an account?{" "}
                <Link to="/dashboard/signup">Sign up</Link>.
            </Font.P>
        </AuthLayout>
    )
}

export default Login
