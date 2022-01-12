// Packages
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import ContainerForm from "../../components/layouts/ContainerForm"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

function ResetPassword() {
    const [password, setPassword] = useState("")
    const handlePassword = e => setPassword(e.target.value)

    const navigate = useNavigate()

    const data = window.location.href.split("/")
    const token = data[5]
    const id = data[6]

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id, password }

        axios
            .put(`/auth/reset-password/${token}/${id}`, requestBody)
            .then(() => {
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <ContainerForm title="Reset your password">
            <Form btnprimary="Send" onSubmit={handleSubmit}>
                <Input
                    label="New password"
                    inputtype="password"
                    id="password"
                    onChange={handlePassword}
                    value={password}
                />
            </Form>
        </ContainerForm>
    )
}

export default ResetPassword
