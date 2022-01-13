// Packages
import React, { useContext, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../../components/styles/Font"
import Wrapper from "../../components/dashboard/Wrapper"
import ListPosts from "../../components/dashboard/ListPosts"
import CardComment from "../../components/dashboard/CardComment"

import CardUser from "../../components/dashboard/CardUser"
import FiltersContainer from "../../components/dashboard/FiltersContainer"
import Input from "../../components/forms/Input"
import Select from "../../components/forms/Select"

function Comments() {
    const { user } = useContext(AuthContext)

    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        axios
            .get("/comments/comments")
            .then(res => setAllComments(res.data))
            .catch(err => console.log(err))
    }, [])

    const sortedComments = allComments.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }

        return new Date(b.date) - new Date(a.date)
    })

    return user.role === "writer" ? (
        <Navigate to="/dashboard" />
    ) : (
        <Wrapper title="Comments">
            <Font.H1>All comments</Font.H1>

            {allComments.length > 0 ? (
                <ListPosts>
                    {sortedComments.map(comment => (
                        <CardComment comment={comment} key={comment._id} />
                    ))}
                </ListPosts>
            ) : (
                <Font.P>No comment yet.</Font.P>
            )}
        </Wrapper>
    )
}

export default Comments
