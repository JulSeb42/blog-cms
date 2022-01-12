// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled.aside`
    grid-column: 3;
`

function Aside(props) {
    const [allPosts, setAllPosts] = useState([])
    const [allAuthors, setAllAuthors] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))

        axios
            .get("/users/user")
            .then(res => setAllAuthors(res.data))
            .catch(err => console.log(err))
    }, [])

    const featuredAuthors = allAuthors.filter(author => author.featured === true)

    let categories = allPosts.map(post => post.category)
    let uniqCategories = [...new Set(categories)].slice(0, 5)

    return (
        <Container>
            <Font.H4>Authors</Font.H4>

            <Font.List>
                {featuredAuthors.map(author => (
                    <li key={author._id}>{author.fullName}</li>
                ))}
                <li>All authors</li>
            </Font.List>

            <Font.H4>Categories</Font.H4>

            <Font.List>
                {uniqCategories.map((category, i) => (
                    <li key={i}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </li>
                ))}
                <li>All categories</li>
            </Font.List>
        </Container>
    )
}

export default Aside
