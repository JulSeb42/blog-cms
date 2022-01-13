// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import ListPosts from "../../components/post/ListPosts"
import Card from "../../components/post/Card"
import {
    PaginationContainer,
    PaginationButton,
} from "../../components/ui/Pagination"
import Icon from "../../components/ui/Icon"

// Breadcrumbs
const BreadcrumbsLinks = [
    {
        title: "Posts",
    },
]

function PostsList() {
    // Get data
    const [allPosts, setAllPosts] = useState([])
    const [pages, setPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => {
                setAllPosts(res.data)
                setPages(Math.round(res.data.length / dataLimit))
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    let sortedPosts = allPosts.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }
        return new Date(b.date) - new Date(a.date)
    })

    // Search and filter
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("all")

    const handleSearch = e => setQuery(e.target.value)
    const handleCategory = e => setCategory(e.target.value)

    let results = sortedPosts.filter(post => {
        return (
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.author.fullName.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.join(",").toLowerCase().includes(query.toLowerCase())
        )
    })

    if (category !== "all") {
        results = results.filter(
            post => post.category.toLowerCase() === category
        )
    }

    // Pagination
    const dataLimit = 10
    const [currentPage, setCurrentPage] = useState(1)

    const goToNextPage = () => {
        setCurrentPage(page => page + 1)
    }

    const goToPreviousPage = () => {
        setCurrentPage(page => page - 1)
    }

    const changePage = e => {
        const pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results.slice(startIndex, endIndex)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pages) * pages
        return new Array(pages).fill().map((_, i) => start + i + 1)
    }

    return (
        <Page
            title="All posts"
            headerbackground
            padding
            header
            breadcrumbs={BreadcrumbsLinks}
            noposts
            onChangeSearch={handleSearch}
            valueSearch={query}
            onChangeCategory={handleCategory}
            isLoading={isLoading}
        >
            <Font.H1>All posts</Font.H1>

            {pages > 1 && (
                <Font.P>
                    Page {currentPage} of {pages}
                </Font.P>
            )}

            <ListPosts>
                {allPosts.length === 0 ? (
                    <Font.P>No post yet.</Font.P>
                ) : results.length === 0 ? (
                    <Font.P>Your search did not return anything.</Font.P>
                ) : (
                    getPaginatedData().map(post => (
                        <Card post={post} key={post._id} />
                    ))
                )}
            </ListPosts>

            {getPaginationGroup().length > 0 && (
                <PaginationContainer>
                    <PaginationButton
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1 && "disabled"}
                    >
                        <Icon
                            name="chevron-left"
                            color="currentColor"
                            size={16}
                        />
                    </PaginationButton>

                    {getPaginationGroup().map((item, i) => (
                        <PaginationButton
                            onClick={changePage}
                            className={currentPage === item && "active"}
                            key={i}
                        >
                            {item}
                        </PaginationButton>
                    ))}

                    <PaginationButton
                        onClick={goToNextPage}
                        disabled={currentPage === pages && "disabled"}
                    >
                        <Icon
                            name="chevron-right"
                            color="currentColor"
                            size={16}
                        />
                    </PaginationButton>
                </PaginationContainer>
            )}
        </Page>
    )
}

export default PostsList
