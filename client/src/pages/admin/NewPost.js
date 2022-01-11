// Packages
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Wrapper from "../../components/dashboard/Wrapper"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Toggle from "../../components/forms/Toggle"
import TextPost from "../../components/forms/TextPost"
import service from "../../components/services/cloudinary"
import Back from "../../components/ui/Back"

// Utils
import getToday from "../../components/utils/getToday"
import getTimeNow from "../../components/utils/getTimeNow"
import slugify from "../../components/utils/slugify"

// title: String,
// date: String,
// time: String,
// category: Array,
// slug: String,
// draft: Boolean,
// author
// body: String,
// imageUrl: String,

function NewPost({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [body, setBody] = useState("")
    const [draft, setDraft] = useState(false)
    const [featured, setFeatured] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTitle = e => {
        setTitle(e.target.value)
        setSlug(slugify(e.target.value))
    }

    const handleSlug = e => {
        setSlug(slugify(e.target.value))
    }

    const handleCategory = e => setCategory(e.target.value)
    const handleTags = e => setTags(e.target.value)
    const handleMetaDescription = e => setMetaDescription(e.target.value)

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleDraft = e => {
        if (e.target.checked) {
            setDraft(true)
        } else {
            setDraft(false)
        }
    }

    const handleFeatured = e => {
        if (e.target.checked) {
            setFeatured(true)
        } else {
            setFeatured(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            title,
            date: getToday(),
            time: getTimeNow(),
            category: category.toLowerCase(),
            tags: tags.split(","),
            slug,
            draft,
            author: user._id,
            body,
            imageUrl,
            metaDescription,
            featured,
        }

        axios
            .put("/posts/new-post", requestBody)
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
        <Wrapper title="New post">
            <Font.H1>New post</Font.H1>

            <Back to="/dashboard" justify="start">
                Back to dashboard
            </Back>

            <Form
                btnprimary="Publish"
                btncancel="/dashboard"
                isLoading={isLoading}
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
                    label="Category"
                    id="category"
                    onChange={handleCategory}
                    value={category}
                />

                <Input
                    label="Tags"
                    id="tags"
                    helper="Separate all category with a comma."
                    onChange={handleTags}
                    value={tags}
                />

                <Input
                    label="Meta description"
                    inputtype="textarea"
                    id="metaDescription"
                    onChange={handleMetaDescription}
                    value={metaDescription}
                    counter={160}
                />

                <Input
                    label="Cover"
                    id="imageUrl"
                    type="file"
                    onChange={e => handleFileUpload(e)}
                />

                <TextPost label="Body" value={body} onChange={setBody} />

                <Toggle
                    label="Feature this article"
                    id="featured"
                    onChange={handleFeatured}
                    defaultChecked={featured}
                />

                <Toggle
                    label="Add to drafts"
                    id="draft"
                    onChange={handleDraft}
                    defaultChecked={draft}
                />
            </Form>

            {errorMessage && <Font.P>{errorMessage}</Font.P>}
        </Wrapper>
    )
}

export default NewPost
