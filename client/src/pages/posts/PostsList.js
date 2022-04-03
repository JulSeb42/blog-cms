// Packages
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Main, Font, Grid } from "components-react-julseb"

// API
import postService from "../../api/post.service"
import searchService from "../../api/search.service"

// Components
import Page from "../../components/layouts/Page"
import WrapperBackground from "../../components/layouts/WrapperBackground"
import Aside from "../../components/layouts/Aside"
import Breadcrumbs from "../../components/ui/Breadcrumbs"
import CardPost from "../../components/post/CardPost"
import Pagination from "../../components/ui/Pagination"

// Config
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const PostsList = () => {
    // Breadcrumbs
    const breadcrumbsItems = [
        {
            text: "Posts",
        },
    ]

    // Get all posts
    const [allPosts, setAllPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Search & pagination
    const [query] = useSearchParams()
    const pageNumber = query.get("page")
    const search = query.get("query")

    const [currentPage, setCurrentPage] = useState(
        pageNumber === null ? 1 : pageNumber
    )

    useEffect(() => {
        search === null
            ? postService
                  .publishedPosts()
                  .then(res => {
                      setAllPosts(res.data)
                      setIsLoading(false)
                  })
                  .catch(err => console.log(err))
            : searchService
                  .search(search)
                  .then(res => {
                      setAllPosts(res.data)
                      setIsLoading(false)
                  })
                  .catch(err => console.log(err))
    }, [search])

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return allPosts.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(allPosts.length / dataLimit)

    return (
        <Page title="All posts" headerBackground isLoading={isLoading}>
            {!isLoading && (
                <WrapperBackground template="aside-right">
                    <Main template="aside-right">
                        <Breadcrumbs items={breadcrumbsItems} />

                        <Font.H1>All posts</Font.H1>

                        {allPosts.length === 0 ? (
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
                                data={allPosts}
                                totalPages={numberOfPages}
                                dataLimit={dataLimit}
                                pageLimit={pageLimit}
                                query={search}
                            />
                        )}
                    </Main>

                    <Aside template="aside-right" noPosts />
                </WrapperBackground>
            )}
        </Page>
    )
}

export default PostsList
