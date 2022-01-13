// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import ListPosts from "../../components/post/ListPosts"
import UserCardSmall from "../../components/user/UserCardSmall"

// Breadcrumbs
const BreadcrumbsLinks = [
    {
        title: "Authors",
    },
]

function AuthorList() {
    const [allAuthors, setAllAuthors] = useState([])

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => {
                setAllAuthors(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Page
            title="Authors list"
            padding
            headerbackground
            header
            noauthors
            breadcrumbs={BreadcrumbsLinks}
        >
            <Font.H1>All authors</Font.H1>

            <ListPosts cols={3} colsMobile={2}>
                {allAuthors.map(author => (
                    <UserCardSmall author={author} key={author._id} />
                ))}
            </ListPosts>
        </Page>
    )
}

export default AuthorList
