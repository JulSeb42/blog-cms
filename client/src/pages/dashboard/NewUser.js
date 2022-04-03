// Packages
import React, { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import {
    Font,
    Button,
    Form,
    Input,
    InputImage,
    Alert,
} from "components-react-julseb"
import { getRandomString, getRandomAvatar } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import adminService from "../../api/admin.service"
import cloudinaryService from "../../api/cloudinary.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"

const NewUser = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [imageUrl, setImageUrl] = useState(getRandomAvatar("other"))
    const [role, setRole] = useState("writer")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleBio = e => setBio(e.target.value)

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

    const handleRole = e => setRole(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        // fullName, email, password, bio, imageUrl, verifyToken, role,
        const requestBody = {
            fullName,
            email,
            password: getRandomString(10),
            bio,
            imageUrl,
            verifyToken: getRandomString(20),
            role,
        }

        adminService
            .newUser(requestBody)
            .then(() => {
                navigate("/dashboard/users")
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <DashboardLayout title="New user">
            <Button
                btnStyle="text"
                iconLeft="chevron-left"
                to="/dashboard/pages"
                justify="start"
                noPadding
            >
                Back to dashboard
            </Button>

            <Font.H1>New user</Font.H1>

            <Font.P>
                The created user will receive an email with a link to login and
                a generated password.
            </Font.P>

            <Form
                btnPrimary="Create a new user"
                btnCancel="/dashboard/users"
                onSubmit={handleSubmit}
                loading={isLoading}
            >
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Role"
                    id="role"
                    type="select"
                    onChange={handleRole}
                    value={role}
                >
                    <option value="writer">Writer</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </Input>

                <Input
                    label="Bio"
                    id="bio"
                    type="textarea"
                    maxLength={160}
                    counter
                    onChange={handleBio}
                    value={bio}
                />

                <InputImage
                    label="Profile picture"
                    id="imageUrl"
                    src={imageUrl}
                    alt={user.fullName}
                    onChange={e => handleFileUpload(e)}
                />
            </Form>

            {errorMessage && (
                <Alert as={Font.P} color="danger">
                    {errorMessage}
                </Alert>
            )}
        </DashboardLayout>
    )
}

export default NewUser
