// Packages
import React, { useState, useContext, useEffect } from "react"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Button,
    InputCheck,
    Alert,
} from "components-react-julseb"
import { slugify } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import pageService from "../../api/page.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import DangerZone from "../../components/DangerZone"

// Data
import siteData from "../../data/siteData"

const EditPage = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [keywords, setKeywords] = useState("")
    const [body, setBody] = useState("")
    const [draft, setDraft] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Get page content
    const [page, setPage] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        pageService
            .pageId(id)
            .then(res => {
                setPage(res.data)
                setTitle(res.data.title)
                setSlug(res.data.slug)
                setMetaDescription(res.data.metaDescription)
                setKeywords(res.data.keywords)
                setBody(res.data.body)
                setDraft(res.data.draft)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Form handles
    const handleTitle = e => {
        setTitle(e.target.value)
        setSlug(slugify(e.target.value))
    }

    const handleSlug = e => setSlug(e.target.value)
    const handleMetaDescription = e => setMetaDescription(e.target.value)
    const handleKeywords = e => setKeywords(e.target.value)

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
            slug: slugify(slug),
            metaDescription,
            keywords: keywords.includes(",") ? keywords.split(",") : keywords,
            body,
            draft,
        }

        pageService
            .editPage(id, requestBody)
            .then(() => {
                navigate("/dashboard/pages")
                window.location.reload(false)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    // Delete page
    const handleDelete = e => {
        e.preventDefault()

        pageService
            .deletePage(id)
            .then(() => {
                navigate("/dashboard/pages")
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <DashboardLayout
            title={isLoading ? "Edit page" : `Edit ${page.title}`}
            isLoading={isLoading}
        >
            {!isLoading && (
                <>
                    <Button
                        btnStyle="text"
                        iconLeft="chevron-left"
                        to="/dashboard/pages"
                        justify="start"
                        noPadding
                    >
                        Back to dashboard
                    </Button>

                    <Font.H1>Add a new page</Font.H1>

                    <Form
                        btnPrimary="Save changes"
                        btnCancel="/dashboard/pages"
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
                            type="textarea"
                            counter
                            maxLength={160}
                            onChange={handleMetaDescription}
                            value={metaDescription}
                        />

                        <Input
                            label="Keywords"
                            id="keywords"
                            helperBottom="Separate all the keywords with a comma"
                            onChange={handleKeywords}
                            value={keywords}
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

                    {page._id === siteData.contactId ||
                    page._id === siteData.thankYouId ? (
                        <Font.P>
                            You can not delete the{" "}
                            {page._id === siteData.contactId
                                ? "contact"
                                : "thank you"}{" "}
                            page!
                        </Font.P>
                    ) : (
                        <DangerZone
                            textBtnOpen="Delete this page"
                            text={`Are you sure you want to delete ${page.title}?`}
                            textBtnPrimary="Yes, delete this page"
                            onClickPrimary={handleDelete}
                        />
                    )}
                </>
            )}
        </DashboardLayout>
    )
}

export default EditPage
