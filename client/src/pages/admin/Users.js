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

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <Wrapper title="Users">
            <Font.H1>All users</Font.H1>

            {/* Filters => not approved, role, search */}

            <ListPosts>
                {sortedUsers.map(user => (
                    <CardUser key={user._id} user={user} />
                ))}
            </ListPosts>
        </Wrapper>
    )
}

export default Users
