// Packages
import React, { useState, useEffect, useContext } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { Font, Flexbox, Loader, Grid, Input } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import commentsService from "../../api/comments.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import CardComment from "../../components/dashboard/CardComment"
import ListCards from "../../components/dashboard/ListCards"
import Pagination from "../../components/ui/Pagination"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const Comments = () => {
    const { user } = useContext(AuthContext)

    // Get all comments
    const [allComments, setAllComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        commentsService
            .allComments()
            .then(res => {
                setAllComments(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Search
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("desc")

    const handleSearch = e => setSearch(e.target.value)
    const handleSort = e => setSort(e.target.value)

    let results = allComments.filter(
        comment =>
            comment.poster.toLowerCase().includes(search) ||
            comment.body.toLowerCase().includes(search) ||
            comment.post.title.toLowerCase().includes(search)
    )

    if (sort === "desc") {
        results = results.sort((a, b) => {
            if (a.date === b.date) {
                return new Date(b.time) - new Date(a.time)
            } else {
                return new Date(b.date) - new Date(a.date)
            }
        })
    }

    if (sort === "asc") {
        results = results.sort((a, b) => {
            if (a.date === b.date) {
                return new Date(a.time) - new Date(b.time)
            } else {
                return new Date(a.date) - new Date(b.date)
            }
        })
    }

    // Pagination
    const [query] = useSearchParams()
    const pageNumber = query.get("page")

    const [currentPage, setCurrentPage] = useState(
        pageNumber === null ? 1 : pageNumber
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(results.length / dataLimit)

    return user.role === "writer" ? (
        <Navigate to="/dashboard" />
    ) : (
        <DashboardLayout title="All comments">
            <Font.H1>
                All comments ({allComments.length} comment
                {allComments.length > 1 && "s"})
            </Font.H1>

            <Grid col={2}>
                <Input
                    label="Search by post, name or content"
                    id="search"
                    onChange={handleSearch}
                    value={search}
                />

                <Input
                    label="Sort"
                    id="sort"
                    type="select"
                    onChange={handleSort}
                    value={sort}
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </Input>
            </Grid>

            {isLoading ? (
                <Flexbox
                    align="center"
                    justify="center"
                    style={{ minHeight: 150 }}
                >
                    <Loader border={4} />
                </Flexbox>
            ) : allComments.length === 0 ? (
                <Font.P>No comment yet.</Font.P>
            ) : (
                <ListCards>
                    {getPaginatedData().map((comment, i) => (
                        <CardComment
                            comment={comment}
                            key={comment._id}
                            last={i === getPaginatedData().length - 1 && true}
                        />
                    ))}
                </ListCards>
            )}

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    data={allComments}
                    totalPages={numberOfPages}
                    dataLimit={dataLimit}
                    pageLimit={pageLimit}
                />
            )}
        </DashboardLayout>
    )
}

export default Comments
