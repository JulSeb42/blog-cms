// Packages
import React from "react"

// Components
import * as Font from "../../components/styles/Font"
import Page from "../../components/layouts/Page"
import ListPosts from "../../components/post/ListPosts"
import Card from "../../components/post/Card"
import UserCard from "../../components/user/UserCard"

function AuthorDetail({ author }) {
    // Breadcrumbs
    const BreadcrumbsLinks = [
        {
            title: "Authors",
            url: "/authors",
        },
        {
            title: author.fullName,
        },
    ]

    return (
        <Page
            title={author.fullName}
            padding
            headerbackground
            header
            noauthors
            breadcrumbs={BreadcrumbsLinks}
        >
            <UserCard user={author} detail />

            {author.posts.length > 0 ? (
                <ListPosts>
                    {author.posts.map(post => (
                        <Card post={post} key={post._id} />
                    ))}
                </ListPosts>
            ) : (
                <Font.P>{author.fullName} did not write any post yet.</Font.P>
            )}
        </Page>
    )
}

export default AuthorDetail
