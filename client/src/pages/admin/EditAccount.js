// Packages
import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Form from "../../components/forms/Form"
import Input from "../../components/forms/Input"
import DangerZone from "../../components/forms/DangerZone"
import Wrapper from "../../components/dashboard/Wrapper"
import InputProfilePicture from "../../components/forms/InputProfilePicture"
import service from "../../components/services/cloudinary"
import ErrorContainer from "../../components/forms/ErrorContainer"
import Alert from "../../components/ui/Alert"

function EditAccount({ edited, setEdited }) {
    const { user, updateUser, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [fullName, setFullName] = useState(user.fullName)
    const [bio, setBio] = useState(user.bio)
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [picture, setPicture] = useState(user.imageUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handleFullName = e => setFullName(e.target.value)
    const handleBio = e => setBio(e.target.value)

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

    // Edit account
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { id: user._id, fullName, bio, imageUrl }

        axios
            .put("/users/edit", requestBody)
            .then(res => {
                const { user } = res.data
                updateUser(user)
                setEdited(!edited)
                setIsVisible(true)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    // Show / hide alert
    const [isVisible, setIsVisible] = useState(false)

    if (isVisible) {
        setTimeout(() => {
            setIsVisible(false)
        }, 3000)
    }

    return (
        <>
            <Wrapper title="Edit your account">
                <Font.H1>Edit your account</Font.H1>

                <Form
                    btnprimary="Save changes"
                    btncancel="/dashboard"
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                >
                    <Input
                        label="Full name"
                        id="fullName"
                        onChange={handleFullName}
                        value={fullName}
                    />

                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={user.email}
                        disabled
                        helper="You can not edit your email."
                    />

                    <Input
                        label="Bio"
                        inputtype="textarea"
                        id="bio"
                        counter={140}
                        onChange={handleBio}
                        value={bio}
                    />

                    <InputProfilePicture
                        label="Profile picture"
                        src={picture}
                        alt={user.fullName}
                        onChange={e => handleFileUpload(e)}
                        id="imageUrl"
                    />
                </Form>

                {errorMessage && (
                    <ErrorContainer>{errorMessage}</ErrorContainer>
                )}

                <Font.P>
                    <Link to="/dashboard/edit-password">
                        Edit your password.
                    </Link>
                </Font.P>

                <DangerZone onClickPrimary={handleDelete} />
            </Wrapper>

            <Alert
                alertstyle="success"
                message="Success, your changes were saved!"
                isVisible={isVisible}
            />
        </>
    )
}

export default EditAccount
