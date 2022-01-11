// Packages
import React from "react"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"

// Title
const title = "Thank you for creating your account!"

function ThankYou() {
    return (
        <Page title={title}>
            <Font.H1>{title}</Font.H1>

            <Font.P>
                You are now logged in. We just sent you an email to verify your
                account, please click on the link to access all the
                functionalities.
            </Font.P>
        </Page>
    )
}

export default ThankYou
