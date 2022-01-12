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

const List = styled(Font.List)`
    li {
        transition: ${Variables.Transitions.Short};

        &:hover {
            transform: translateX(${Variables.Margins.XS});

            a {
                color: ${Variables.Colors.Primary70};
            }
        }

        a {
            color: ${Variables.Colors.Primary};
            text-decoration: none;
            font-weight: ${Variables.FontWeights.Bold};
            transition: ${Variables.Transitions.Short};
        }
    }
`

function Aside() {
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

    const featuredAuthors = allAuthors.filter(
        author => author.featured === true
    )

    let categories = allPosts.map(post => post.category)
    let uniqCategories = [...new Set(categories)].slice(0, 5)

    return (
        <Container>
            <Item>
                <Font.H4>Authors</Font.H4>

                <List>
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
                </List>
            </Item>

            <Item>
                <Font.H4>Categories</Font.H4>

                <List>
                    {uniqCategories.map((category, i) => (
                        <li key={i}>
                            <Link to={`/posts/${category}`}>
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                            </Link>
                        </li>
                    ))}

                    <li>
                        <Link to="/posts/all-categories">All categories</Link>
                    </li>
                </List>
            </Item>
        </Container>
    )
}

export default Aside
