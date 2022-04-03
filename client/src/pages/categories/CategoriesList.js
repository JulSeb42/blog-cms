// Packages
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Main, Font, Grid } from "components-react-julseb"
import { slugify, unslugify } from "js-utils-julseb"

// API
import postService from "../../api/post.service"

// Components
import Page from "../../components/layouts/Page"
import WrapperBackground from "../../components/layouts/WrapperBackground"
import Aside from "../../components/layouts/Aside"
import CardCategory from "../../components/post/CardCategory"
import Breadcrumbs from "../../components/ui/Breadcrumbs"
import Pagination from "../../components/ui/Pagination"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const CategoriesList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        postService
            .publishedPosts()
            .then(res => {
                setAllCategories([
                    ...new Set(
                        res.data
                            .filter(post => !post.draft)
                            .map(post => post.category)
                    ),
                ])
                setAllPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    // Breadcrumbs
    const breadcrumbsItems = [
        {
            text: "Categories",
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
        return allCategories.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(allCategories.length / dataLimit)

    return (
        <Page title="All categories" headerBackground>
            <WrapperBackground template="aside-right">
                <Main template="aside-right">
                    <Breadcrumbs items={breadcrumbsItems} />

                    <Font.H1>All categories</Font.H1>

                    <Grid col={3}>
                        {allCategories.length === 0 ? (
                            <Font.P>No category yet.</Font.P>
                        ) : (
                            getPaginatedData().map((category, i) => (
                                <CardCategory
                                    to={`/categories/${slugify(category)}`}
                                    key={i}
                                >
                                    {unslugify(category)}
                                    <br />
                                    <span>
                                        {
                                            allPosts.filter(
                                                post =>
                                                    slugify(post.category) ===
                                                    slugify(category)
                                            ).length
                                        }{" "}
                                        post
                                        {allPosts.filter(
                                            post =>
                                                slugify(post.category) ===
                                                slugify(category)
                                        ).length > 1 && "s"}
                                    </span>
                                </CardCategory>
                            ))
                        )}

                        {numberOfPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                data={allCategories}
                                totalPages={numberOfPages}
                                dataLimit={dataLimit}
                                pageLimit={pageLimit}
                            />
                        )}
                    </Grid>
                </Main>

                <Aside template="aside-right" noCategories />
            </WrapperBackground>
        </Page>
    )
}

export default CategoriesList
