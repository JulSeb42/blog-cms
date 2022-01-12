// Packages
import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Wrapper from "../../components/dashboard/Wrapper"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import Back from "../../components/ui/Back"
import InputCover from "../../components/forms/InputCover"
import service from "../../components/services/cloudinary"
import TextPost from "../../components/forms/TextPost"
import Toggle from "../../components/forms/Toggle"
import ErrorContainer from "../../components/forms/ErrorContainer"
import DangerZone from "../../components/forms/DangerZone"

// Utils
import getToday from "../../components/utils/getToday"
import getTimeNow from "../../components/utils/getTimeNow"

function EditPost({ post, edited, setEdited, ...props }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState(post.title)
    const [category, setCategory] = useState(post.category)
    const [tags, setTags] = useState(post.tags.join(","))
    const [metaDescription, setMetaDescription] = useState(post.metaDescription)
    const [body, setBody] = useState(post.body)
    const [draft, setDraft] = useState(
        post.author._id !== user._id && user.role === "writer"
            ? true
            : post.draft
    )
    const [featured, setFeatured] = useState(post.featured)
    const [imageUrl, setImageUrl] = useState(post.imageUrl)
    const [picture, setPicture] = useState(post.imageUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleTitle = e => {
        setTitle(e.target.value)
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

        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setPicture(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
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
            category: category.toLowerCase(),
            tags: tags.split(","),
            draft,
            body,
            imageUrl,
            dateEdited: getToday(),
            timeEdited: getTimeNow(),
            metaDescription,
            featured,
        }

        axios
            .put(`/posts/edit-post/${post._id}`, requestBody)
            .then(() => {
                setEdited(!edited)
                navigate("/dashboard")
                window.location.reload(false)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete post
    const handleDelete = () => {
        axios
            .delete(`/posts/post/${post._id}/delete`)
            .then(() => {
                navigate("/dashboard")
            })
            .catch(err => console.log(err))
    }

    return (
        <Wrapper title={`Edit ${post.title}`}>
            <Font.H1>Edit {post.title}</Font.H1>

            <Back to="/dashboard">Back to dashboard</Back>

            <Form
                btnprimary="Save changes"
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
                    value={post.slug}
                    disabled={true}
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

                <InputCover
                    label="Cover"
                    src={picture}
                    alt={post.title}
                    onChange={e => handleFileUpload(e)}
                    id="imageUrl"
                />

                <TextPost label="Body" value={body} onChange={setBody} />

                <Toggle
                    label="Feature this post"
                    id="featured"
                    onChange={handleFeatured}
                    defaultChecked={featured}
                />

                <Toggle
                    label="Add to drafts"
                    id="draft"
                    onChange={handleDraft}
                    defaultChecked={draft}
                    disabled={
                        post.author._id !== user._id &&
                        user.role === "writer" &&
                        true
                    }
                />
            </Form>

            {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}

            <DangerZone
                btnopen="Delete this post"
                text="Are you sure you want to delete this post?"
                btnyes="Yes, delete the post"
                onClickPrimary={handleDelete}
            />
        </Wrapper>
    )
}

export default EditPost
