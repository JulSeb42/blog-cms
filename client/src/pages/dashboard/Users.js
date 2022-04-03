// Packages
import React, { useContext, useEffect, useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { Font, Grid, Input, TitleFlex, Button } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import Pagination from "../../components/ui/Pagination"
import ListCards from "../../components/dashboard/ListCards"
import HeadTable from "../../components/dashboard/HeadTable"
import CardUser from "../../components/dashboard/CardUser"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const Users = () => {
    const { user } = useContext(AuthContext)

    // Get users
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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

    let results = allUsers.filter(user =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
    )

    // Filters
    const [filterRole, setFilterRole] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")

    const handleFilterRole = e => setFilterRole(e.target.value)
    const handleFilterStatus = e => setFilterStatus(e.target.value)

    if (filterRole !== "all") {
        results = results.filter(user => user.role.toLowerCase() === filterRole)
    }

    if (filterStatus !== "all") {
        if (filterStatus === "true") {
            results = results.filter(user => user.approved === true)
        } else if (filterStatus === "false") {
            results = results.filter(user => user.approved === false)
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
        <DashboardLayout title="All users" isLoading={isLoading}>
            <TitleFlex>
                <Font.H1>
                    All users ({results.length} user
                    {results.length > 1 && "s"})
                </Font.H1>

                <Button to="/dashboard/users/new-user">Add a new user</Button>
            </TitleFlex>

            <Grid col={3}>
                <Input
                    label="Search by name"
                    id="name"
                    onChange={handleSearch}
                    value={search}
                />

                <Input
                    label="Filter by role"
                    id="filterRole"
                    type="select"
                    onChange={handleFilterRole}
                    value={filterRole}
                >
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="writer">Writer</option>
                </Input>

                <Input
                    label="Filter by status"
                    id="filterStatus"
                    type="select"
                    onChange={handleFilterStatus}
                    value={filterStatus}
                >
                    <option value="all">All</option>
                    <option value="true">Approved</option>
                    <option value="false">Not approved</option>
                </Input>
            </Grid>

            <ListCards>
                <HeadTable col={4} align="center">
                    <Font.H5>Name</Font.H5>
                    <Font.H5>Role</Font.H5>
                    <Font.H5>Featured</Font.H5>
                    <Font.H5>Actions</Font.H5>
                </HeadTable>

                {results.length === 0 ? (
                    <Font.P>Your search did not return any result.</Font.P>
                ) : (
                    getPaginatedData().map((user, i) => (
                        <CardUser
                            cardUser={user}
                            key={user._id}
                            last={i === getPaginatedData().length - 1 && true}
                        />
                    ))
                )}
            </ListCards>

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    data={allUsers}
                    totalPages={numberOfPages}
                    dataLimit={dataLimit}
                    pageLimit={pageLimit}
                />
            )}
        </DashboardLayout>
    )
}

export default Users
