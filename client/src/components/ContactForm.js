// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Input, Alert, Font } from "components-react-julseb"

// API
import { GlobalContext } from "../context/globalData"
import globalService from "../api/global.service"

const ContactForm = () => {
    const { globalData } = useContext(GlobalContext)
    const navigate = useNavigate()

    // Form items
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleName = e => setName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleSubject = e => setSubject(e.target.value)
    const handleBody = e => setBody(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            receiver: globalData.email,
            name,
            email,
            subject,
            body,
        }

        globalService
            .contact(requestBody)
            .then(() => navigate("/thank-you"))
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <>
            <Form btnPrimary="Send message" onSubmit={handleSubmit}>
                <Input
                    label="Your name"
                    id="name"
                    onChange={handleName}
                    value={name}
                />

                <Input
                    label="Your email"
                    type="email"
                    id="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Subject of the message"
                    id="subject"
                    onChange={handleSubject}
                    value={subject}
                />

                <Input
                    label="Your message"
                    type="textarea"
                    id="body"
                    onChange={handleBody}
                    value={body}
                    style={{ minHeight: 150 }}
                />
            </Form>

            {errorMessage && (
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}
        </>
    )
}

export default ContactForm
