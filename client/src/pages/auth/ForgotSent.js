// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const ForgotSent = () => {
    // Texts
    const title = "Email sent successfully!"
    
    return (
        <AuthLayout title={title}>
            <Font.H1>{title}</Font.H1>

            <Font.P>
                We just sent you an email with a link to reset your password.
            </Font.P>
        </AuthLayout>
    )
}

export default ForgotSent
