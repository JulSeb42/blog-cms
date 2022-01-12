// Packages
import React from "react"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"
import { Article } from "../components/layouts/Container"

function GlobalPage({ page }) {
    return (
        <Page
            title={page.title}
            description={page.metaDescription}
            keywords={page.keywords}
            noaside
            headerbackground
            header
            padding
        >
            <Font.H1>{page.title}</Font.H1>

            <Article dangerouslySetInnerHTML={{ __html: page.body }} />
        </Page>
    )
}

export default GlobalPage
