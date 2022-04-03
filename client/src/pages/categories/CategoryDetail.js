// Packages
import React, { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { Main, Font, Grid } from "components-react-julseb"
import { slugify, unslugify } from "js-utils-julseb"

// API
import postService from "../../api/post.service"

// Components
import Page from "../../components/layouts/Page"
import WrapperBackground from "../../components/layouts/WrapperBackground"
import Aside from "../../components/layouts/Aside"
import Breadcrumbs from "../../components/ui/Breadcrumbs"
import Pagination from "../../components/ui/Pagination"
import CardPost from "../../components/post/CardPost"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const CategoryDetail = () => {
    const { category } = useParams()

    // Get posts by category
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        postService
            .publishedPosts()
            .then(res => {
                setPosts(
                    res.data.filter(post => slugify(post.category) === category)
                )
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [category])

    // Breadcrumbs
    const breadcrumbsItems = [
        {
            text: "Categories",
            to: "/categories",
        },
        {
            text: unslugify(category),
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
            title={unslugify(category)}
            headerBackground
            isLoading={isLoading}
        >
            {!isLoading && (
                <WrapperBackground template="aside-right">
                    <Main template="aside-right">
                        <Breadcrumbs items={breadcrumbsItems} />

                        <Font.H1>{unslugify(category)}</Font.H1>

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

export default CategoryDetail
