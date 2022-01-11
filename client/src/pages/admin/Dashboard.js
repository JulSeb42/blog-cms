// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"
import Wrapper from "../../components/dashboard/Wrapper"
import * as Font from "../../components/styles/Font"
import Button from "../../components/ui/Button"
import UserCard from "../../components/user/UserCard"
import CardPost from "../../components/dashboard/CardPost"
import TitleFlex from "../../components/ui/TitleFlex"

function Dashboard() {
    const { user } = useContext(AuthContext)

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => {
                setAllPosts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const sortedPosts = allPosts.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }
        return new Date(b.date) - new Date(a.date)
    })

    return (
        <Wrapper title="Dashboard">
            <UserCard user={user} dashboard />

            {!user.verified && <Font.P>Your account is not verified.</Font.P>}

            <TitleFlex>
                <Font.H2>Posts</Font.H2>

                <Button to="/dashboard/new-post">New post</Button>
            </TitleFlex>

            {/* Tabs all posts / user's posts */}

            <div>
                {sortedPosts.map(post => (
                    <CardPost post={post} key={post._id} />
                ))}
            </div>
        </Wrapper>
    )
}

export default Dashboard
