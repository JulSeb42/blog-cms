// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

// Components
import Page from "../../components/layouts/Page"

function PostsList(props) {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    console.log(allPosts)

    return (
        <Page title="All articles">
            <h1>All articles</h1>

            <ul>
                {allPosts.map(post => (
                    <li>
                        <Link
                            to={`/posts/${post.category}/${post.slug}`}
                            key={post._id}
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Page>
    )
}

export default PostsList
