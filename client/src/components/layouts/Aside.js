// Packages
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import {
    Aside as Container,
    Variables,
    Font,
    Grid,
} from "components-react-julseb"
import { slugify, unslugify } from "js-utils-julseb"

// API
import postService from "../../api/post.service"
import userService from "../../api/user.service"

// Styles
const ListLi = styled.li`
    transition: ${Variables.Transitions.Short};

    &:hover {
        transform: translateX(${Variables.Spacers.XS});
    }
`

const Aside = props => {
    const [allAuthors, setAllAuthors] = useState([])
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        userService
            .allUsers()
            .then(res =>
                setAllAuthors(
                    res.data
                        .filter(user => user.featured)
                        .sort((a, b) => {
                            return a.fullName > b.fullName ? 1 : -1
                        })
                )
            )
            .catch(err => console.log(err))

        postService
            .publishedPosts()
            .then(res =>
                setAllPosts(
                    res.data
                        .filter(post => !post.draft)
                        .sort((a, b) => {
                            if (a.date === b.date) {
                                return b.time.localeCompare(a.time)
                            }
                            return new Date(b.date) - new Date(a.date)
                        })
                )
            )
            .catch(err => console.log(err))
    }, [])

    const allCategories = [
        ...new Set(allPosts.map(post => post.category)),
    ].slice(0, 5)

    return (
        <Container template={props.template}>
            {!props.noPosts && allPosts.length > 0 && (
                <Grid gap={Variables.Spacers.XS}>
                    <Font.H4>Latest posts</Font.H4>

                    <Font.List>
                        {allPosts.slice(0, 5).map(post => (
                            <ListLi key={post._id}>
                                <Link
                                    to={`/posts/${post.category}/${post.slug}`}
                                >
                                    {post.title}
                                </Link>
                            </ListLi>
                        ))}

                        <ListLi>
                            <Link to="/posts">All posts</Link>
                        </ListLi>
                    </Font.List>
                </Grid>
            )}

            {!props.noCategories && allCategories.length > 0 && (
                <Grid gap={Variables.Spacers.XS}>
                    <Font.H4>Categories</Font.H4>

                    <Font.List>
                        {allCategories.map((category, i) => (
                            <ListLi key={i}>
                                <Link
                                    to={`/categories/${slugify(category)}`}
                                >
                                    {unslugify(category)}
                                </Link>
                            </ListLi>
                        ))}

                        <ListLi>
                            <Link to="/categories">All categories</Link>
                        </ListLi>
                    </Font.List>
                </Grid>
            )}

            {!props.noAuthors && allAuthors.length > 0 && (
                <Grid gap={Variables.Spacers.XS}>
                    <Font.H4>Authors</Font.H4>

                    <Font.List>
                        {allAuthors.slice(0, 5).map(author => (
                            <ListLi key={author._id}>
                                <Link
                                    to={`/authors/${slugify(author.fullName)}-${
                                        author._id
                                    }`}
                                >
                                    {author.fullName}
                                </Link>
                            </ListLi>
                        ))}

                        <ListLi>
                            <Link to="/authors">All authors</Link>
                        </ListLi>
                    </Font.List>
                </Grid>
            )}
        </Container>
    )
}

export default Aside
