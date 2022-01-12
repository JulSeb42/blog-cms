// Packages
import React, { useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Wrapper from "../../components/dashboard/Wrapper"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import * as Font from "../../components/styles/Font"
import ErrorContainer from "../../components/forms/ErrorContainer"
import Back from "../../components/ui/Back"

function EditPassword({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handlePassword = e => setPassword(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id: user._id, password }

        axios
            .put("/users/edit-password", requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                navigate("/dashboard")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Wrapper title="Edit your password">
            <Font.H1>Edit your password</Font.H1>

            <Back to="/dashboard/edit-account">Back to edit</Back>

            <Form
                btnprimary="Save changes"
                btncancel="/dashboard/edit-account"
                onSubmit={handleSubmit}
            >
                <Input
                    label="New password"
                    inputtype="password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                />
            </Form>

            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
        </Wrapper>
    )
}

export default EditPassword
