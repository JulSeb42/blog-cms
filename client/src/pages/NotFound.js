// Packages
import React from "react"
import Link from "../components/utils/LinkScroll"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"

function NotFound() {
    return (
        <Page title="Not found!" noaside headerbackground header padding>
            <Font.H1>Page not found!</Font.H1>

            <Font.P>
                <Link to="/">Back to homepage.</Link>
            </Font.P>
        </Page>
    )
}

export default NotFound
