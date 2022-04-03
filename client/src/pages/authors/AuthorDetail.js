// Packages
import React, { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Main, Font, Grid } from "components-react-julseb"

// API
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"
import WrapperBackground from "../../components/layouts/WrapperBackground"
import Aside from "../../components/layouts/Aside"
import Breadcrumbs from "../../components/ui/Breadcrumbs"
import Bio from "../../components/authors/Bio"
import Pagination from "../../components/ui/Pagination"
import CardPost from "../../components/post/CardPost"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const AuthorDetail = () => {
    const { id } = useParams()

    // Get author
    const [author, setAuthor] = useState()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService
            .getUser(id)
            .then(res => {
                setAuthor(res.data)
                setPosts(res.data.posts)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    // Breadcrumbs
    const breadcrumbsItems = [
        {
            text: "Authors",
            to: "/authors",
        },
        {
            text: isLoading ? "Author" : author.fullName,
        },
    ]

    // Pagination
    const [query] = useSearchParams()
    const pageNumber = query.get("page")

    const [currentPage, setCurrentPage] = useState(
        pageNumber === null ? 1 : pageNumber
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return posts.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(posts.length / dataLimit)

    return (
        <Page
            title={isLoading ? "Author" : author.fullName}
            headerBackground
            isLoading={isLoading}
        >
            {!isLoading && (
                <WrapperBackground template="aside-right">
                    <Main template="aside-right">
                        <Breadcrumbs items={breadcrumbsItems} />

                        <Bio author={author} />

                        {posts.length === 0 ? (
                            <Font.P>No post yet.</Font.P>
                        ) : (
                            <Grid col={2}>
                                {getPaginatedData().map(post => (
                                    <CardPost post={post} key={post._id} />
                                ))}
                            </Grid>
                        )}

                        {numberOfPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                data={posts}
                                totalPages={numberOfPages}
                                dataLimit={dataLimit}
                                pageLimit={pageLimit}
                            />
                        )}
                    </Main>

                    <Aside template="aside-right" />
                </WrapperBackground>
            )}
        </Page>
    )
}

export default AuthorDetail
