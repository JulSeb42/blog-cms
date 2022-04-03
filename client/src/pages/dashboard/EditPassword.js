// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"
import { passwordRegex } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"

const EditPassword = ({ edited, setEdited }) => {
    const { user, setUser, setToken } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form item
    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState("not-passed")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handle
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

        const requestBody = { password }

        userService
            .editPassword(user._id, requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate("/dashboard/edit-account")
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <DashboardLayout title="Edit your password" template="form">
            <Font.H1>Edit your password</Font.H1>

            <Form
                btnPrimary="Save changes"
                btnCancel="/dashboard/edit-account"
                onSubmit={handleSubmit}
            >
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
        </DashboardLayout>
    )
}

export default EditPassword
