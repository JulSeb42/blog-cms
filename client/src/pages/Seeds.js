// Packages
import React, { useState, useEffect } from "react"
import { Button } from "components-react-julseb"
import { getFirstName, capitalize } from "js-utils-julseb"

// API
import userService from "../api/user.service"
import postService from "../api/post.service"

// Components
import Page from "../components/layouts/Page"

const Seeds = () => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        userService
            .allUsers()
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))

        postService
            .allPosts()
            .then(res => {
                setPosts(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Page title="Seeds">
            <Button
                to="/"
                btnStyle="text"
                iconLeft="chevron-left"
                justify="start"
                noPadding
            >
                Back to homepage
            </Button>

            <h2>All users</h2>

            <ul>
                {!isLoading &&
                    users.map(user => <li key={user._id}>"{user._id}",</li>)}
            </ul>

            <h2>Link post to authors</h2>

            <div style={{ display: "grid", gap: 8 }}>
                {users.map(user => (
                    <div style={{ display: "grid", gap: 2 }}>
                        <p>
                            const id{getFirstName(capitalize(user.fullName))} =
                            "{user._id}"
                        </p>
                        <p
                            style={{
                                whiteSpace: "normal",
                                display: "block",
                                wordBreak: "break-all",
                            }}
                        >
                            const posts{getFirstName(capitalize(user.fullName))}{" "}
                            = [
                            {!isLoading &&
                                posts
                                    .filter(
                                        post => post.author._id === user._id
                                    )
                                    .map(post => <>"{post._id}", </>)}
                            ]
                        </p>

                        <p>
                            User.findOneAndUpdate( &#123; _id: id
                            {getFirstName(capitalize(user.fullName))} &#125;,
                            &#123; $push: &#123; posts: posts
                            {getFirstName(capitalize(user.fullName))} &#125;
                            &#125;, &#123; new: true, &#125; ) .then(posts =&gt;
                            &#123; console.log(posts) &#125;) .catch(err =&gt;
                            console.log(err))
                        </p>
                    </div>
                ))}
            </div>

            {/* <ul>
                {!isLoading &&
                    posts
                        .filter(post => post.author._id === user._id)
                        .map(post => <li key={post._id}>"{post._id}",</li>)}
            </ul> */}
        </Page>
    )
}

export default Seeds
