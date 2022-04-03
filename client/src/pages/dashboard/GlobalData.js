// Packages
import React, { useState, useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    InputImage,
    Alert,
    ButtonsContainer,
    Button,
} from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import { GlobalContext } from "../../context/globalData"
import globalService from "../../api/global.service"
import cloudinaryService from "../../api/cloudinary.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import InputCover from "../../components/dashboard/InputCover"
import Toast from "../../components/ui/Toast"

const GlobalData = () => {
    const { user } = useContext(AuthContext)
    const { globalData, isGlobalLoading } = useContext(GlobalContext)

    // Form items
    const [edited, setEdited] = useState(false)
    const [name, setName] = useState("")
    const [baseline, setBaseline] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [email, setEmail] = useState("")
    const [favicon, setFavicon] = useState("")
    const [faviconLoading, setFaviconLoading] = useState(false)
    const [cover, setCover] = useState("")
    const [coverLoading, setCoverLoading] = useState(false)
    const [keywords, setKeywords] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [toastOpen, setToastOpen] = useState(false)

    useEffect(() => {
        if (!isGlobalLoading) {
            setName(globalData.name)
            setBaseline(globalData.baseline)
            setMetaDescription(globalData.metaDescription)
            setEmail(globalData.email)
            setFavicon(globalData.favicon)
            setCover(globalData.cover)
            setKeywords(globalData.keywords)
        }
        // eslint-disable-next-line
    }, [isGlobalLoading])

    if (toastOpen) {
        setTimeout(() => {
            setToastOpen(false)
        }, 3000)
    }

    // Form handles
    const handleName = e => {
        setName(e.target.value)
        setEdited(true)
    }
    const handleBaseline = e => {
        setBaseline(e.target.value)
        setEdited(true)
    }
    const handleMetaDescription = e => {
        setMetaDescription(e.target.value)
        setEdited(true)
    }
    const handleEmail = e => {
        setEmail(e.target.value)
        setEdited(true)
    }

    const handleFavicon = e => {
        e.preventDefault()

        setEdited(true)

        const uploadData = new FormData()
        setFaviconLoading(true)

        uploadData.append("favicon", e.target.files[0])

        cloudinaryService
            .uploadFavicon(uploadData)
            .then(res => {
                setFavicon(res.secure_url)
                setFaviconLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            setFavicon(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setFavicon(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleCover = e => {
        e.preventDefault()

        setEdited(true)

        const uploadData = new FormData()
        setCoverLoading(true)

        uploadData.append("cover", e.target.files[0])

        cloudinaryService
            .uploadCover(uploadData)
            .then(res => {
                setCover(res.secure_url)
                setCoverLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            setCover(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setCover(reader.result)
            })
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleKeywords = e => {
        setKeywords(e.target.value)
        setEdited(true)
    }

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            name,
            baseline,
            metaDescription,
            email,
            favicon,
            cover,
            keywords,
        }

        globalService
            .editData(globalData._id, requestBody)
            .then(() => {
                setToastOpen(true)
                setEdited(false)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <DashboardLayout title="Global data" template="form">
            <Font.H1>Edit global data</Font.H1>

            <Form onSubmit={handleSubmit}>
                <Input
                    label="Site name"
                    id="name"
                    onChange={handleName}
                    value={name}
                />

                <Input
                    label="Baseline"
                    id="baseline"
                    onChange={handleBaseline}
                    value={baseline}
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
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

                <InputImage
                    label="Favicon"
                    id="favicon"
                    onChange={e => handleFavicon(e)}
                    src={favicon}
                    alt="Favicon"
                    iconEmpty="image-add"
                />

                <InputCover
                    label="Homepage cover"
                    id="cover"
                    onChange={e => handleCover(e)}
                    src={cover}
                    alt="Cover"
                />

                <Input
                    label="Keywords"
                    id="keywords"
                    helperBottom="Separate all the keywords with a comma"
                    onChange={handleKeywords}
                    value={keywords}
                />

                <ButtonsContainer>
                    <Button
                        loading={faviconLoading || coverLoading}
                        disabled={faviconLoading || coverLoading || !edited}
                        type="submit"
                    >
                        Save changes
                    </Button>
                </ButtonsContainer>
            </Form>

            {errorMessage && (
                <Alert color="danger" as={Font.P}>
                    {errorMessage}
                </Alert>
            )}

            <Toast
                open={toastOpen}
                color="success"
                text="Your changes were saved!"
            />
        </DashboardLayout>
    )
}

export default GlobalData
