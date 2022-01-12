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
import DangerZone from "../../components/forms/DangerZone"

// Utils
import slugify from "../../components/utils/slugify"

function EditPage({ page }) {
    const navigate = useNavigate()

    const [title, setTitle] = useState(page.title)
    const [slug, setSlug] = useState(page.slug)
    const [metaDescription, setMetaDescription] = useState(page.metaDescription)
    const [keywords, setKeywords] = useState(page.keywords.join(","))
    const [body, setBody] = useState(page.body)
    const [draft, setDraft] = useState(page.draft)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTitle = e => setTitle(e.target.value)
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
            .put(`/pages/edit-page/${page._id}`, requestBody)
            .then(() => {
                navigate("/dashboard/pages")
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete page
    const handleDelete = () => {
        axios
            .delete(`/pages/page/${page._id}/delete`)
            .then(() => {
                navigate("/dashboard/pages")
            })
            .catch(err => console.log(err))
    }

    return (
        <Wrapper title={`Edit ${page.title}`}>
            <Font.H1>{`Edit ${page.title}`}</Font.H1>

            <Back to="/dashboard/pages">Back to dashboard</Back>

            <Form
                btnprimary={`Edit ${page.title}`}
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

            <DangerZone
                btnopen="Delete this page"
                text={`Are you sure you want to delete this ${page.title}?`}
                btnyes="Yes, delete this page"
                onClickPrimary={handleDelete}
            />
        </Wrapper>
    )
}

export default EditPage
