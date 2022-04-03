// Packages
import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    InputImage,
    ButtonsContainer,
    Button,
} from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"
import cloudinaryService from "../../api/cloudinary.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import DangerZone from "../../components/DangerZone"
import Toast from "../../components/ui/Toast"

const EditAccount = ({ edited, setEdited }) => {
    const { user, setUser, setToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [formEdited, setFormEdited] = useState(false)
    const [fullName, setFullName] = useState(user.fullName)
    const [bio, setBio] = useState(user.bio)
    const [imageUrl, setImageUrl] = useState(user.imageUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [toastOpen, setToastOpen] = useState(false)

    if (toastOpen) {
        setTimeout(() => {
            setToastOpen(false)
        }, 3000)
    }

    // Form handles
    const handleFullName = e => {
        setFullName(e.target.value)
        setFormEdited(true)
    }
    const handleBio = e => {
        setBio(e.target.value)
        setFormEdited(true)
    }

    const handleFileUpload = e => {
        e.preventDefault()
        setFormEdited(true)
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

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { fullName, bio, imageUrl }

        userService
            .editAccount(user._id, requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                setToastOpen(true)
                setFormEdited(false)
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    // Delete user
    const handleDelete = e => {
        e.preventDefault()

        userService
            .deleteAccount(user._id)
            .then(() => {
                logoutUser()
                navigate("/dashboard/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <DashboardLayout title="Edit your profile" template="form">
            <Font.H1>Edit your account</Font.H1>

            <Form onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    helperBottom="You can not edit your email"
                    value={user.email}
                    disabled
                />

                <Input
                    label="Bio"
                    id="bio"
                    onChange={handleBio}
                    value={bio}
                    type="textarea"
                    counter
                    maxLength={140}
                />

                <InputImage
                    label="Profile picture"
                    id="imageUrl"
                    src={imageUrl}
                    alt={user.fullName}
                    onChange={e => handleFileUpload(e)}
                />

                <ButtonsContainer>
                    <Button
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading || !formEdited}
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

            <Font.P>
                <Link to="/dashboard/edit-account/edit-password">
                    Edit your password
                </Link>
            </Font.P>

            <DangerZone
                textBtnOpen="Delete your account"
                text="Are you sure you want to delete your account?"
                onClickPrimary={handleDelete}
                textBtnPrimary="Yes, delete my account"
            />

            <Toast
                open={toastOpen}
                color="success"
                text="Your changes were saved!"
            />
        </DashboardLayout>
    )
}

export default EditAccount
