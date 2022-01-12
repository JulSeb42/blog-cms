// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import ListPosts from "../../components/post/ListPosts"
import Card from "../../components/post/Card"

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

    let sortedPosts = allPosts.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }
        return new Date(b.date) - new Date(a.date)
    })

    // Search and filter
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("all")

    const handleSearch = e => setQuery(e.target.value)
    const handleCategory = e => setCategory(e.target.value)

    let results = sortedPosts.filter(post => {
        return (
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.author.fullName.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.join(",").toLowerCase().includes(query.toLowerCase())
        )
    })

    if (category !== "all") {
        results = results.filter(post => post.category.toLowerCase() === category)
    }

    return (
        <Page
            title="All posts"
            headerbackground
            padding
            header
            breadcrumbs={BreadcrumbsLinks}
            noposts
            onChangeSearch={handleSearch}
            valueSearch={query}
            onChangeCategory={handleCategory}
        >
            <Font.H1>All posts</Font.H1>

            <ListPosts>
                {allPosts.length === 0 ? (
                    <Font.P>No post yet.</Font.P>
                ) : results.length === 0 ? (
                    <Font.P>Your search did not return anything.</Font.P>
                ) : (
                    results.map(post => <Card post={post} key={post._id} />)
                )}
            </ListPosts>
        </Page>
    )
}

export default PostsList
