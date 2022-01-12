// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "../../components/utils/LinkScroll"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"

// Breadcrumbs
const BreadcrumbsLinks = [
    {
        title: "Posts",
    },
]

function PostsList() {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Page
            title="All posts"
            headerbackground
            padding
            header
            breadcrumbs={BreadcrumbsLinks}
        >
            <Font.H1>All posts</Font.H1>

            <ul>
                {allPosts.map(post => (
                    <li key={post._id}>
                        <Link to={`/posts/${post.category}/${post.slug}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Page>
    )
}

export default PostsList
