// Packages
import React, { useState, useEffect } from "react"
import { Main, Font, Grid } from "components-react-julseb"

// API
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"
import WrapperBackground from "../../components/layouts/WrapperBackground"
import Aside from "../../components/layouts/Aside"
import AuthorCard from "../../components/authors/AuthorCard"
import Breadcrumbs from "../../components/ui/Breadcrumbs"

const AuthorsList = () => {
    // Get all authors
    const [allAuthors, setAllAuthors] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService
            .allUsers()
            .then(res => {
                setAllAuthors(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Breadcrumbs
    const breadcrumbsItems = [
        {
            text: "Authors",
        },
    ]

    return (
        <Page title="All authors" headerBackground isLoading={isLoading}>
            {!isLoading && (
                <WrapperBackground template="aside-right">
                    <Main template="aside-right">
                        <Breadcrumbs items={breadcrumbsItems} />

                        <Font.H1>All authors</Font.H1>

                        <Grid col={3}>
                            {allAuthors.map(author => (
                                <AuthorCard author={author} key={author._id} />
                            ))}
                        </Grid>
                    </Main>

                    <Aside noAuthors />
                </WrapperBackground>
            )}
        </Page>
    )
}

export default AuthorsList
