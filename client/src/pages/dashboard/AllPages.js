// Packages
import React, { useState, useEffect, useContext } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import {
    Font,
    Flexbox,
    Loader,
    TitleFlex,
    Button,
    Grid,
    Input,
} from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import pageService from "../../api/page.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import Pagination from "../../components/ui/Pagination"
import ListCards from "../../components/dashboard/ListCards"
import CardPage from "../../components/dashboard/CardPage"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const AllPages = () => {
    const { user } = useContext(AuthContext)

    // Get all pages
    const [allPages, setAllPages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        pageService
            .allPages()
            .then(res => {
                setAllPages(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Search & filters
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")

    const handleSearch = e => setSearch(e.target.value)
    const handleFilter = e => setFilter(e.target.value)

    let results = allPages.filter(page =>
        page.title.toLowerCase().includes(search.toLowerCase())
    )

    if (filter !== "all") {
        if (filter === "published") {
            results = results.filter(page => !page.draft)
        }

        if (filter === "draft") {
            results = results.filter(page => page.draft)
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

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <DashboardLayout title="All pages">
            <TitleFlex>
                <Font.H1>
                    All pages ({results.length} page
                    {results.length > 1 && "s"})
                </Font.H1>

                <Button to="/dashboard/pages/new-page">Add a new page</Button>
            </TitleFlex>

            <Grid col={2}>
                <Input
                    label="Search by name"
                    id="name"
                    onChange={handleSearch}
                    value={search}
                />

                <Input
                    label="Filter by status"
                    id="filterStatus"
                    type="select"
                    onChange={handleFilter}
                    value={filter}
                >
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
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
            ) : allPages.length === 0 ? (
                <Font.P>No page yet.</Font.P>
            ) : results.length === 0 ? (
                <Font.P>Your search did not return any result.</Font.P>
            ) : (
                <ListCards>
                    {getPaginatedData().map((page, i) => (
                        <CardPage
                            page={page}
                            key={page._id}
                            last={i === getPaginatedData().length - 1 && true}
                        />
                    ))}
                </ListCards>
            )}

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    data={allPages}
                    totalPages={numberOfPages}
                    dataLimit={dataLimit}
                    pageLimit={pageLimit}
                />
            )}
        </DashboardLayout>
    )
}

export default AllPages
