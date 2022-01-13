// Packages
import React from "react"
import Link from "../../components/utils/LinkScroll"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"

function ThankYou(props) {
    return (
        <Page title="Thank you!" noaside headerbackground header padding>
            <Font.H1>Thank you for your email!</Font.H1>

            <Font.P>
                We received your email, we will come back to you as soon as
                possible. <Link to="/">Back to homepage.</Link>
            </Font.P>
        </Page>
    )
}

export default ThankYou
