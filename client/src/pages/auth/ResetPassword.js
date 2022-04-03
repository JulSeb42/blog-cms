// Packages
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"
import { passwordRegex } from "js-utils-julseb"

// API
import authService from "../../api/auth.service"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const ResetPassword = () => {
    const navigate = useNavigate()

    const title = "Reset your password"

    // Form items
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState("not-passed")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => {
        setPassword(e.target.value)

        if (passwordRegex.test(e.target.value)) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    // Get token and ID from url
    const { token, id } = useParams()

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { password, resetToken: token, id }

        authService
            .resetPassword(requestBody)
            .then(() => navigate("/dashboard/login"))
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <AuthLayout title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form btnPrimary="Reset your password" onSubmit={handleSubmit}>
                <Input
                    label="New password"
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
        </AuthLayout>
    )
}

export default ResetPassword
