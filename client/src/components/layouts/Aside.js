// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import Link from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Form from "../forms/Form"
import Input from "../forms/Input"
import Select from "../forms/Select"

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
    const location = useLocation().pathname

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

    const featuredAuthors = allAuthors.filter(
        author => author.featured === true
    )

    let sortedPosts = allPosts
        .sort((a, b) => {
            if (a.date === b.date) {
                return b.time.localeCompare(a.time)
            }
            return new Date(b.date) - new Date(a.date)
        })
        .slice(0, 5)

    let allCategories = allPosts.map(post => post.category)
    let uniqCategories = [...new Set(allCategories)].sort()

    return (
        <Container>
            {/* Search => search by title / tags, filter by categories, */}
            {location === "/posts" && (
                <Form as="div">
                    <Input
                        label="Search"
                        placeholder="By title, author or tags."
                        onChange={props.onChangeSearch}
                        value={props.valueSearch}
                    />

                    {uniqCategories.length > 0 && (
                        <Select
                            label="Filter by category"
                            onChange={props.onChangeCategory}
                        >
                            <option value="all">All</option>
                            {uniqCategories.map((category, i) => (
                                <option
                                    key={i}
                                    value={category
                                        .toLowerCase()
                                        .replace(" ", "")}
                                >
                                    {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                </option>
                            ))}
                        </Select>
                    )}
                </Form>
            )}

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

                        <li>
                            <Link to="/posts">All posts</Link>
                        </li>
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
        </Container>
    )
}

export default Aside
