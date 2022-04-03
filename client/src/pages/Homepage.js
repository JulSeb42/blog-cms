// Packages
import React, { useState, useEffect, useContext } from "react"
import {
    Font,
    Wrapper,
    Main,
    Grid,
    Variables,
    Button,
} from "components-react-julseb"

// API
import { GlobalContext } from "../context/globalData"
import postService from "../api/post.service"

// Components
import Page from "../components/layouts/Page"
import Cover from "../components/layouts/Cover"
import Featured from "../components/Featured"
import CardPost from "../components/post/CardPost"
import Aside from "../components/layouts/Aside"

const Homepage = () => {
    const { globalData, isGlobalLoading } = useContext(GlobalContext)

    // Get posts
    const [allPosts, setAllPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        postService
            .publishedPosts()
            .then(res => {
                setAllPosts(
                    res.data
                        .filter(post => !post.draft)
                        .sort((a, b) => {
                            if (a.date === b.date) {
                                return b.time.localeCompare(a.time)
                            }
                            return new Date(b.date) - new Date(a.date)
                        })
                )
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    const featured = allPosts.filter(post => post.featured)

    return (
        <Page title="Homepage" isLoading={isLoading}>
            {!isLoading && !isGlobalLoading && (
                <>
                    <Cover
                        src={globalData.cover}
                        alt="Cover home"
                    >
                        <Font.H1>{globalData.name}</Font.H1>

                        {globalData.baseline && (
                            <Font.H2>{globalData.baseline}</Font.H2>
                        )}
                    </Cover>

                    <Featured posts={featured} />

                    <Wrapper template="aside-right">
                        <Main template="aside-right">
                            <Grid col={2} gap={Variables.Spacers.L}>
                                {allPosts.length === 0 ? (
                                    <Font.P>No post yet.</Font.P>
                                ) : (
                                    allPosts
                                        .slice(0, 10)
                                        .map(post => (
                                            <CardPost
                                                post={post}
                                                key={post._id}
                                            />
                                        ))
                                )}
                            </Grid>

                            <Button to="/posts">All posts</Button>
                        </Main>

                        <Aside template="aside-right" noPosts />
                    </Wrapper>
                </>
            )}
        </Page>
    )
}

export default Homepage
