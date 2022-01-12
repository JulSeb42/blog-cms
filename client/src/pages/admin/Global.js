// Packages
import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Wrapper from "../../components/dashboard/Wrapper"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import service from "../../components/services/cloudinary"
import ErrorContainer from "../../components/forms/ErrorContainer"
import Alert from "../../components/ui/Alert"

function Global() {
    const { user } = useContext(AuthContext)

    // Get meta from backend
    const [name, setName] = useState("")
    const [baseline, setBaseline] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [email, setEmail] = useState("")
    const [favicon, setFavicon] = useState("")
    const [cover, setCover] = useState("")
    const [keywords, setKeywords] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    useEffect(() => {
        axios
            .get("/global/global/61ddbd1b06de66e386e32a88")
            .then(res => {
                setName(res.data.name)
                setBaseline(res.data.baseline)
                setMetaDescription(res.data.metaDescription)
                setEmail(res.data.email)
                setFavicon(res.data.favicon)
                setCover(res.data.cover)
                setKeywords(res.data.keywords)
            })
            .catch(err => console.log(err))
    }, [])

    const handleName = e => setName(e.target.value)
    const handleBaseline = e => setBaseline(e.target.value)
    const handleMetaDescription = e => setMetaDescription(e.target.value)
    const handleEmail = e => setEmail(e.target.value)

    const handleFavicon = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setFavicon(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleCover = e => {
        e.preventDefault()
        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        service
            .uploadImage(uploadData)
            .then(res => {
                setCover(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleKeywords = e => setKeywords(e.target.value)

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

        axios
            .put("/global/edit", requestBody)
            .then(() => {
                setIsVisible(true)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Show / hide alert
    const [isVisible, setIsVisible] = useState(false)

    if (isVisible) {
        setTimeout(() => {
            setIsVisible(false)
        }, 3000)
    }

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <>
            <Wrapper title="Edit global information">
                <Font.H1>Edit global information</Font.H1>

                <Form
                    btnprimary="Save"
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                >
                    <Input
                        label="Site name"
                        id="name"
                        onChange={handleName}
                        value={name}
                    />

                    <Input
                        label="Site baseline"
                        id="baseline"
                        onChange={handleBaseline}
                        value={baseline}
                    />

                    <Input
                        label="Meta description"
                        id="description"
                        inputtype="textarea"
                        counter={160}
                        onChange={handleMetaDescription}
                        value={metaDescription}
                    />

                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        onChange={handleEmail}
                        value={email}
                    />

                    <Input
                        label="Favicon"
                        id="favicon"
                        type="file"
                        onChange={e => handleFavicon(e)}
                    />

                    <Input
                        label="Cover"
                        id="cover"
                        type="file"
                        onChange={e => handleCover(e)}
                    />

                    <Input
                        label="Keywords"
                        id="keywords"
                        helper="Separate all keywords with a comma."
                        onChange={handleKeywords}
                        value={keywords}
                    />
                </Form>

                {errorMessage && (
                    <ErrorContainer>{errorMessage}</ErrorContainer>
                )}
            </Wrapper>

            <Alert
                alertstyle="success"
                message="Success, your changes were saved!"
                isVisible={isVisible}
            />
        </>
    )
}

export default Global
