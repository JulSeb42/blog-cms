// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"

function Contact() {
    const navigate = useNavigate()

    // Get data
    const [page, setPage] = useState({})

    useEffect(() => {
        axios
            .get(`/pages/page-slug/contact`)
            .then(res => {
                setPage(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    // Contact form
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    const handleName = e => setName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleSubject = e => setSubject(e.target.value)
    const handleBody = e => setBody(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { name, email, subject, body }

        axios
            .put("/global/contact", requestBody)
            .then(() => {
                navigate("/thank-you")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title="Contact" noaside headerbackground header padding>
            <Font.H1>{page.title}</Font.H1>

            <div dangerouslySetInnerHTML={{ __html: page.body }} />

            <Form btnprimary="Send message" onSubmit={handleSubmit}>
                <Input
                    label="Your name"
                    id="name"
                    onChange={handleName}
                    value={name}
                />

                <Input
                    type="email"
                    label="Your email"
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
                    inputtype="textarea"
                    label="Your message"
                    id="body"
                    onChange={handleBody}
                    value={body}
                />
            </Form>
        </Page>
    )
}

export default Contact
