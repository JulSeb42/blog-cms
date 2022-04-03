// Packages
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
import postService from "../../api/post.service"
import cloudinaryService from "../../api/cloudinary.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import InputCover from "../../components/dashboard/InputCover"
import DangerZone from "../../components/DangerZone"

const EditPost = ({ edited, setEdited }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    // Get post
    const [post, setPost] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // Form items
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [formLoading, setFormLoading] = useState(false)
    const [body, setBody] = useState("")
    const [featured, setFeatured] = useState(false)
    const [draft, setDraft] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    useEffect(() => {
        postService
            .post(id)
            .then(res => {
                const post = res.data
                setPost(post)
                setTitle(post.title)
                setSlug(post.slug)
                setCategory(post.category)
                setTags(post.tags)
                setMetaDescription(post.metaDescription)
                setImageUrl(post.imageUrl)
                setBody(post.body)
                setFeatured(post.featured)
                setDraft(post.draft)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Form handles
    const handleTitle = e => setTitle(e.target.value)
    const handleCategory = e => setCategory(e.target.value)
    const handleTags = e => setTags(e.target.value)
    const handleMetaDescription = e => setMetaDescription(e.target.value)

    const handleFileUpload = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setFormLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        cloudinaryService
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setFormLoading(false)
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
            dateEdited: getToday(),
            timeEdited: getTimeNow(),
            category: slugify(category),
            tags: tags.includes(",") ? tags.split(",") : tags,
            body,
            imageUrl,
            draft,
            metaDescription,
            featured,
        }

        postService
            .editPost(post._id, requestBody)
            .then(() => {
                navigate("/dashboard")
                setEdited(!edited)
                window.location.reload(false)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    // Delete post
    const handleDelete = () => {
        postService
            .deletePost(post._id)
            .then(() => {
                navigate("/dashboard")
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <DashboardLayout
            title={`Edit ${isLoading ? "post" : post.title}`}
            isLoading={isLoading}
        >
            {!isLoading && (
                <>
                    <Button
                        btnStyle="text"
                        iconLeft="chevron-left"
                        to="/dashboard"
                        justify="start"
                        noPadding
                    >
                        Back to dashboard
                    </Button>

                    <Font.H1>Edit {post.title}</Font.H1>

                    <Form
                        btnPrimary="Save changes"
                        btnCancel="/dashboard"
                        loading={formLoading}
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
                            value={slug}
                            disabled
                            helperBottom="You can not edit the slug"
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
                            defaultChecked={featured}
                        />

                        <InputCheck
                            label="Add to drafts"
                            id="toggleDraft"
                            type="checkbox"
                            name="toggleDraft"
                            toggle
                            onChange={handleDraft}
                            value={draft}
                            defaultChecked={draft}
                        />
                    </Form>

                    {errorMessage && (
                        <Alert color="danger" as={Font.P}>
                            {errorMessage}
                        </Alert>
                    )}

                    <DangerZone
                        textBtnOpen="Delete post"
                        text={`Are you sure you want to delete ${post.title}?`}
                        onClickPrimary={handleDelete}
                        textBtnPrimary="Yes, delete post"
                    />
                </>
            )}
        </DashboardLayout>
    )
}

export default EditPost
