// Packages
import React from "react"
import { Font } from "components-react-julseb"

// Components
import AuthLayout from "../../components/dashboard/AuthLayout"

const ThankYou = () => {
    return (
        <AuthLayout title="Thank you!">
            <Font.H1>Thank you for creating your account!</Font.H1>

            <Font.P>
                You are now logged in. We just sent you an email to verify your
                account, please click on the link to access all the
                functionalities.
            </Font.P>
        </AuthLayout>
    )
}

export default ThankYou
