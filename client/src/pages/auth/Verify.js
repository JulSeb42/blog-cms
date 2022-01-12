// Packages
import React, { useContext, useState } from "react"
import Link from "../../components/utils/LinkScroll"
import axios from "axios"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import { AuthContext } from "../../context/auth"

function Verify({ edited, setEdited }) {
    const { user, updateUser } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const requestBody = {
        id: user._id,
        verifyToken: user.verifyToken,
        verified: true,
    }

    axios
        .put("/auth/verify", requestBody)
        .then(res => {
            const { user } = res.data
            updateUser(user)
            setEdited(!edited)
        })
        .catch(err => {
            const errorDescription = err.response.data.message
            setErrorMessage(errorDescription)
        })

    return (
        <Page title="Your account is verified!">
            <Font.H1>Your account is verified!</Font.H1>

            <Font.P>
                You can now access all the functionalities on our website.{" "}
                <Link to="/dashboard">Go to your account</Link>.
            </Font.P>

            {errorMessage && <Font.P>{errorMessage}</Font.P>}
        </Page>
    )
}

export default Verify
