// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const Goodbye = () => {
    return (
        <AuthLayout title="Goodbye!">
            <Font.H1>We're sorry to see you go!</Font.H1>

            <Font.P>Your account was deleted successfully.</Font.P>
        </AuthLayout>
    )
}

export default Goodbye
