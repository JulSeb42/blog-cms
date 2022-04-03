// Packages
import React, { useContext, useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { TitleFlex, Button, Font, Grid, Input } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"
import postService from "../../api/post.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import Bio from "../../components/authors/Bio"
import Pagination from "../../components/ui/Pagination"
import ListCards from "../../components/dashboard/ListCards"
import CardPost from "../../components/dashboard/CardPost"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const Dashboard = () => {
    const { user } = useContext(AuthContext)

    // Get all posts
    const [allPosts, setAllPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        postService
            .allPosts()
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))

        userService
            .allUsers()
            .then(res => {
                setAllUsers(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Search
    const [search, setSearch] = useState("")
    const handleSearch = e => setSearch(e.target.value)

    let results = allPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    )

    // Filters
    const [filterAuthor, setFilterAuthor] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")

    const handleFilterAuthor = e => setFilterAuthor(e.target.value)
    const handleFilterStatus = e => setFilterStatus(e.target.value)

    if (filterAuthor !== "all") {
        results = results.filter(post => post.author.fullName === filterAuthor)
    }

    if (filterStatus !== "all") {
        if (filterStatus === "draft") {
            results = results.filter(post => post.draft === true)
        } else if (filterStatus === "published") {
            results = results.filter(post => post.draft === false)
        }
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

    return (
        <DashboardLayout title="Dashboard" isLoading={isLoading}>
            {!isLoading && (
                <>
                    <Bio author={user} dashboard />

                    <TitleFlex>
                        <Font.H2>
                            Posts ({results.length} post
                            {results.length > 1 && "s"})
                        </Font.H2>

                        <Button to="/dashboard/new-post">New post</Button>
                    </TitleFlex>

                    <Grid col={3}>
                        <Input
                            label="Search by name"
                            onChange={handleSearch}
                            value={search}
                        />

                        <Input
                            label="Filter by author"
                            type="select"
                            onChange={handleFilterAuthor}
                            value={filterAuthor}
                        >
                            <option value="all">All</option>
                            {allUsers
                                .sort((a, b) => {
                                    return a.fullName > b.fullName ? 1 : -1
                                })
                                .map(user => (
                                    <option value={user.fullName}>
                                        {user.fullName}
                                    </option>
                                ))}
                        </Input>

                        <Input
                            label="Filter by status"
                            type="select"
                            onChange={handleFilterStatus}
                            value={filterStatus}
                        >
                            <option value="all">All</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </Input>
                    </Grid>

                    {results.length === 0 ? (
                        <Font.P>Your search did not return any result.</Font.P>
                    ) : allPosts.length > 0 ? (
                        <ListCards>
                            {getPaginatedData()
                                .sort((a, b) => {
                                    if (a.date === b.date) {
                                        return b.time.localeCompare(a.time)
                                    }
                                    return new Date(b.date) - new Date(a.date)
                                })
                                .map((post, i) => (
                                    <CardPost
                                        post={post}
                                        key={post._id}
                                        last={i === 9 && true}
                                    />
                                ))}
                        </ListCards>
                    ) : (
                        <Font.P>No post yet.</Font.P>
                    )}

                    {numberOfPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            data={allPosts}
                            totalPages={numberOfPages}
                            dataLimit={dataLimit}
                            pageLimit={pageLimit}
                        />
                    )}
                </>
            )}
        </DashboardLayout>
    )
}

export default Dashboard
