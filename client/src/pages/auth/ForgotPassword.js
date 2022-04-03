// Packages
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
} from "components-react-julseb"
import { getRandomString } from "js-utils-julseb"

// API
import authService from "../../api/auth.service"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const ForgotPassword = () => {
    const navigate = useNavigate()

    const title = "I forgot my password"

    // Form items
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleEmail = e => setEmail(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, resetToken: getRandomString(20) }

        authService
            .forgotPassword(requestBody)
            .then(() => {
                navigate("/dashboard/login/forgot-password/email-sent")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <AuthLayout title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Font.P>
                Please enter your email address, we will send you a link to
                reset your password.
            </Font.P>

            <Form
                btnPrimary="Send"
                btnCancel="/dashboard/login"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}
        </AuthLayout>
    )
}

export default ForgotPassword
