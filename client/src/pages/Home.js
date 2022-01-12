// Packages
import React, { useEffect, useState } from "react"
import axios from "axios"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"
import Cover from "../components/layouts/Cover"
import Featured from "../components/home/Featured"
import { Container, Content } from "../components/layouts/Container"
import ListPosts from "../components/post/ListPosts"
import Card from "../components/post/Card"
import Aside from "../components/layouts/Aside"

// Data
import GlobalData from "../components/data/GlobalData"

function Home() {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    let sortedPosts = allPosts.sort((a, b) => {
        if (a.date === b.date) {
            return b.time.localeCompare(a.time)
        }
        return new Date(b.date) - new Date(a.date)
    })

    // Featured posts
    let featuredPosts = sortedPosts.filter(post => post.featured === true)

    return (
        <Page title="Home">
            <Cover src={GlobalData().cover} alt={`Cover ${GlobalData().name}`}>
                <Font.H1>{GlobalData().name}</Font.H1>
                <Font.H2>{GlobalData().baseline}</Font.H2>
            </Cover>

            <Featured posts={featuredPosts} />

            <Container>
                <Content>
                    <ListPosts>
                        {sortedPosts.slice(0, 10).map(post => (
                            <Card post={post} key={post._id} />
                        ))}
                    </ListPosts>
                </Content>

                <Aside />
            </Container>
        </Page>
    )
}

export default Home
