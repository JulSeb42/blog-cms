// Packages
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import * as Font from "../../components/styles/Font"
import Wrapper from "../../components/dashboard/Wrapper"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Toggle from "../../components/forms/Toggle"
import TextPost from "../../components/forms/TextPost"
import Back from "../../components/ui/Back"
import ErrorContainer from "../../components/forms/ErrorContainer"

// Utils
import slugify from "../../components/utils/slugify"

// title: String,
// body: String,
// slug: String,
// metaDescription: String,
// keywords: Array,
// draft: Boolean,

function AddPage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [keywords, setKeywords] = useState("")
    const [body, setBody] = useState("")
    const [draft, setDraft] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTitle = e => {
        setTitle(e.target.value)
        setSlug(slugify(e.target.value))
    }

    const handleSlug = e => setSlug(slugify(e.target.value))
    const handleMetaDescription = e => setMetaDescription(e.target.value)
    const handleKeywords = e => setKeywords(e.target.value)

    const handleDraft = e => {
        if (e.target.checked) {
            setDraft(true)
        } else {
            setDraft(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            title,
            slug,
            metaDescription,
            keywords: keywords.split(","),
            body,
            draft,
        }

        axios
            .put("/pages/new-page", requestBody)
            .then(() => {
                navigate("/dashboard/pages")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Wrapper title="Create a new page">
            <Font.H1>Create a new page</Font.H1>

            <Back to="/dashboard/pages">Back to dashboard</Back>

            <Form
                btnprimary="Create page"
                btncancel="/dashboard/pages"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Title"
                    id="title"
                    onChange={handleTitle}
                    value={title}
                />

                <Input
                    label="Slug"
                    id="slug"
                    onChange={handleSlug}
                    value={slug}
                />

                <Input
                    label="Meta description"
                    id="metaDescription"
                    inputtype="textarea"
                    onChange={handleMetaDescription}
                    value={metaDescription}
                    counter={160}
                />

                <Input
                    label="Keywords"
                    id="keywords"
                    helper="Separate all keywords with a comma."
                    onChange={handleKeywords}
                    value={keywords}
                />

                <TextPost
                    label="Body"
                    id="body"
                    onChange={setBody}
                    value={body}
                />

                <Toggle
                    label="Add to draft"
                    id="draft"
                    onChange={handleDraft}
                    value={draft}
                />
            </Form>

            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
        </Wrapper>
    )
}

export default AddPage
