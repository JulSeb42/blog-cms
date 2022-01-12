// Packages
import React, { useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Wrapper from "../../components/dashboard/Wrapper"
import ListPosts from "../../components/dashboard/ListPosts"
import CardUser from "../../components/dashboard/CardUser"
import FiltersContainer from "../../components/dashboard/FiltersContainer"
import Input from "../../components/forms/Input"
import Select from "../../components/forms/Select"

function Users() {
    const { user } = useContext(AuthContext)

    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => {
                setAllUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    let sortedUsers = allUsers.sort((a, b) => {
        return a.fullName > b.fullName ? 1 : -1
    })

    // Search
    const [query, setQuery] = useState("")

    let results = sortedUsers.filter(user => {
        return user.fullName.toLowerCase().includes(query.toLowerCase())
    })

    const handleSearch = e => setQuery(e.target.value)

    // Filter by role
    const [role, setRole] = useState("all")
    const handleAuthors = e => setRole(e.target.value)

    if (role !== "all") {
        results = results.filter(user => user.role === role)
    }

    // Filter by status
    const [status, setStatus] = useState("all")
    const handleStatus = e => setStatus(e.target.value)

    if (status !== "all") {
        if (status === "approved") {
            results = results.filter(user => user.approved === true)
        } else if (status === "not-approved") {
            results = results.filter(user => user.approved === false)
        }
    }

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <Wrapper title="Users">
            <Font.H1>All users</Font.H1>

            <FiltersContainer>
                <Input
                    label="Search by name"
                    icon="search"
                    type="search"
                    onChange={handleSearch}
                    value={query}
                />

                <Select
                    label="Filter by role"
                    id="filterAuthor"
                    onChange={handleAuthors}
                >
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="writer">Writer</option>
                </Select>

                <Select
                    label="Filter by status"
                    id="filterStatus"
                    onChange={handleStatus}
                >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="not-approved">Not approved</option>
                </Select>
            </FiltersContainer>

            <ListPosts>
                {results.map(user => (
                    <CardUser key={user._id} user={user} />
                ))}
            </ListPosts>
        </Wrapper>
    )
}

export default Users
