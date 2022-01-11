// Packages
import React from "react"

// Components
import Page from "../../components/layouts/Page"

function PostDetail(props) {
    return (
        <Page title={props.post.title}>
            <h1>{props.post.title}</h1>

            <article dangerouslySetInnerHTML={{ __html: props.post.body }} />
        </Page>
    )
}

export default PostDetail
