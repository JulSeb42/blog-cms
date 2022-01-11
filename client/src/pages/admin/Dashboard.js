// Packages
import React, { useContext, useState, useEffect } from "react"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import Wrapper from "../../components/dashboard/Wrapper"
import * as Font from "../../components/styles/Font"
import Button from "../../components/ui/Button"
import UserCard from "../../components/user/UserCard"
import TitleFlex from "../../components/ui/TitleFlex"
import ListPosts from "../../components/dashboard/ListPosts"
import CardPost from "../../components/dashboard/CardPost"
import FiltersContainer from "../../components/dashboard/FiltersContainer"
import Select from "../../components/forms/Select"
import Input from "../../components/forms/Input"

function Dashboard() {
    const { user } = useContext(AuthContext)

    const [allPosts, setAllPosts] = useState([])
    const [allAuthors, setAllAuthors] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => {
                setAllPosts(res.data)
            })
            .catch(err => console.log(err))

        axios
            .get("/users/user")
            .then(res => setAllAuthors(res.data))
            .catch(err => console.log(err))
    }, [])

    let sortedPosts = allPosts.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }
        return new Date(b.date) - new Date(a.date)
    })

    // Search
    const [query, setQuery] = useState("")

    let results = sortedPosts.filter(post => {
        return post.title.toLowerCase().includes(query.toLowerCase())
    })

    const handleSearch = e => setQuery(e.target.value)

    // Filter by authors
    const [author, setAuthor] = useState("all")
    const handleAuthors = e => setAuthor(e.target.value)

    if (author !== "all") {
        results = results.filter(post => author === post.author.fullName)
    }

    // Filter by status
    const [status, setStatus] = useState("all")
    const handleStatus = e => setStatus(e.target.value)

    if (status !== "all") {
        if (status === "published") {
            results = results.filter(post => post.draft === false)
        } else if (status === "draft") {
            results = results.filter(post => post.draft === true)
        }
    }

    return (
        <Wrapper title="Dashboard">
            <UserCard user={user} dashboard />

            {!user.verified && <Font.P>Your account is not verified.</Font.P>}

            <TitleFlex>
                <Font.H2>Posts</Font.H2>

                <Button to="/dashboard/new-post" btnstyle="primary">
                    New post
                </Button>
            </TitleFlex>

            <FiltersContainer>
                <Input
                    label="Search by name"
                    icon="search"
                    type="search"
                    onChange={handleSearch}
                    value={query}
                />

                <Select
                    label="Filter by author"
                    id="filterAuthor"
                    onChange={handleAuthors}
                >
                    <option value="all">All</option>

                    {allAuthors
                        .sort((a, b) => {
                            return a.fullName > b.fullName ? 1 : -1
                        })
                        .map(author => (
                            <option value={author.id} key={author._id}>
                                {author.fullName}
                            </option>
                        ))}
                </Select>

                <Select
                    label="Filter by status"
                    id="filterStatus"
                    onChange={handleStatus}
                >
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </Select>
            </FiltersContainer>

            <ListPosts>
                {allPosts.length === 0 ? (
                    <Font.P>No posts yet!</Font.P>
                ) : results.length === 0 && author !== "all" ? (
                    status === "all" ? (
                        <Font.P>{author} did not write any article yet.</Font.P>
                    ) : status === "published" ? (
                        <Font.P>
                            {author} did not publish any article yet.
                        </Font.P>
                    ) : (
                        <Font.P>{author} did not add any draft yet.</Font.P>
                    )
                ) : results.length === 0 ? (
                    <Font.P>Your search did not return anything.</Font.P>
                ) : (
                    results.map(post => <CardPost post={post} key={post._id} />)
                )}
            </ListPosts>
        </Wrapper>
    )
}

export default Dashboard
