// Packages
import React from "react"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"

function CategoryDetail({ category }) {
    return (
        <Page title={category.charAt(0).toUpperCase() + category.slice(1)}>
            <Font.H1>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </Font.H1>
        </Page>
    )
}

export default CategoryDetail
