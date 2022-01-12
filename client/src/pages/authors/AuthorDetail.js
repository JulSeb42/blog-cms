// Packages
import React from "react"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"

function AuthorDetail({ author }) {
    return (
        <Page title={author.fullName}>
            <Font.H1>{author.fullName}</Font.H1>
        </Page>
    )
}

export default AuthorDetail
