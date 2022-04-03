// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Button,
    InputCheck,
    Alert,
} from "components-react-julseb"
import { slugify, getToday, getTimeNow } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import postService from "../../api/post.service"
import cloudinaryService from "../../api/cloudinary.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import InputCover from "../../components/dashboard/InputCover"

const NewPost = ({ edited, setEdited }) => {
    const { user, setUser, setToken } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [body, setBody] = useState("")
    const [featured, setFeatured] = useState(false)
    const [draft, setDraft] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleTitle = e => {
        setTitle(e.target.value)
        setSlug(slugify(e.target.value))
    }

    const handleSlug = e => setSlug(e.target.value)
    const handleCategory = e => setCategory(e.target.value)
    const handleTags = e => setTags(e.target.value)
    const handleMetaDescription = e => setMetaDescription(e.target.value)

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        cloudinaryService
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            setImageUrl(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setImageUrl(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleFeatured = e => {
        if (e.target.checked) {
            setFeatured(true)
        } else {
            setFeatured(false)
        }
    }

    const handleDraft = e => {
        if (e.target.checked) {
            setDraft(true)
        } else {
            setDraft(false)
        }
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            title,
            date: getToday(),
            time: getTimeNow(),
            category: slugify(category),
            tags: [
                title,
                category,
                tags.includes(",") ? tags.split(",") : tags,
            ],
            slug: slugify(slug),
            author: user._id,
            body,
            imageUrl,
            draft,
            metaDescription,
            featured,
        }

        postService
            .newPost(requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate("/dashboard")
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <DashboardLayout title="New post">
            <Button
                btnStyle="text"
                iconLeft="chevron-left"
                to="/dashboard"
                justify="start"
                noPadding
            >
                Back to dashboard
            </Button>

            <Font.H1>Add a new post</Font.H1>

            <Form
                btnPrimary="Create a new post"
                btnCancel="/dashboard"
                loading={isLoading}
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
                    helperBottom="Separate all the tags with a comma"
                    onChange={handleTags}
                    value={tags}
                />

                <Input
                    label="Meta description"
                    id="metaDescription"
                    type="textarea"
                    counter
                    maxLength={160}
                    onChange={handleMetaDescription}
                    value={metaDescription}
                />

                <InputCover
                    label="Cover"
                    id="imageUrl"
                    onChange={e => handleFileUpload(e)}
                    src={imageUrl}
                    alt="Cover"
                />

                <Input
                    label="Body"
                    id="body"
                    type="markdown"
                    onChange={setBody}
                    value={body}
                    preview="live"
                />

                <InputCheck
                    label="Feature this post"
                    id="toggleFeature"
                    type="checkbox"
                    name="toggleFeature"
                    toggle
                    onChange={handleFeatured}
                    value={featured}
                />

                <InputCheck
                    label="Add to drafts"
                    id="toggleDraft"
                    type="checkbox"
                    name="toggleDraft"
                    toggle
                    onChange={handleDraft}
                    value={draft}
                />
            </Form>

            {errorMessage && (
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}
        </DashboardLayout>
    )
}

export default NewPost
