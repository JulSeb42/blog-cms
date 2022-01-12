// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import ListPosts from "../../components/post/ListPosts"
import Card from "../../components/post/Card"

function CategoryDetail({ category }) {
    // Breadcrumbs
    const BreadcrumbsLinks = [
        {
            title: "Posts",
            url: "/posts",
        },
        {
            title: category.charAt(0).toUpperCase() + category.slice(1),
        },
    ]

    // Get posts
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    const filteredPosts = allPosts
        .sort((a, b) => {
            if (a.date === b.date) {
                return b.time.localeCompare(a.time)
            }
            return new Date(b.date) - new Date(a.date)
        })
        .filter(post => post.category === category)

    return (
        <Page
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            headerbackground
            padding
            header
            breadcrumbs={BreadcrumbsLinks}
        >
            <Font.H1>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </Font.H1>

            <ListPosts>
                {filteredPosts.map(post => (
                    <Card post={post} key={post._id} />
                ))}
            </ListPosts>
        </Page>
    )
}

export default CategoryDetail
