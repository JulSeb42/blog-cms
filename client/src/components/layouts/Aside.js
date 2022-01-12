// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled.aside`
    grid-column: 3;
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.L};
    align-content: start;
`

const Item = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
`

function Aside(props) {
    const [allPosts, setAllPosts] = useState([])
    const [allAuthors, setAllAuthors] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data).slice(0, 5))
            .catch(err => console.log(err))

        axios
            .get("/users/user")
            .then(res => setAllAuthors(res.data))
            .catch(err => console.log(err))
    }, [])

    const featuredAuthors = allAuthors.filter(author => author.featured === true)

    let sortedPosts = allPosts.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }
        return new Date(b.date) - new Date(a.date)
    }).slice(0, 5)

    return (
        <Container>
            {!props.noposts && allPosts.length > 0 && (
                <Item>
                    <Font.H4>Latest posts</Font.H4>

                    <Font.ListLinks>
                        {sortedPosts.map(post => (
                            <li key={post._id}>
                                <Link
                                    to={`/posts/${post.category
                                        .toLowerCase()
                                        .replaceAll(" ", "-")}/${post.slug}`}
                                >
                                    {post.title}
                                </Link>
                            </li>
                        ))}

                        <li><Link to="/posts">All posts</Link></li>
                    </Font.ListLinks>
                </Item>
            )}

            {!props.noauthors && (
                <Item>
                    <Font.H4>Authors</Font.H4>

                    <Font.ListLinks>
                        {featuredAuthors.map(author => (
                            <li key={author._id}>
                                <Link
                                    to={`/authors/${author.fullName
                                        .toLowerCase()
                                        .replaceAll(" ", "-")}`}
                                >
                                    {author.fullName}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link to="/authors">All authors</Link>
                        </li>
                    </Font.ListLinks>
                </Item>
            )}

            {/* {!props.nocategories && (
                <Item>
                    <Font.H4>Categories</Font.H4>

                    <Font.ListLinks>
                        {uniqCategories.map((category, i) => (
                            <li key={i}>
                                <Link to={`/posts/${category}`}>
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </Link>
                            </li>
                        ))}

                        <li>
                            <Link to="/posts/all-categories">
                                All categories
                            </Link>
                        </li>
                    </Font.ListLinks>
                </Item>
            )} */}
        </Container>
    )
}

export default Aside
