// Packages
import React from "react"
import Markdown from "markdown-to-jsx"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import Cover from "../../components/layouts/Cover"
import { Container, Content, Article } from "../../components/layouts/Container"
import Aside from "../../components/layouts/Aside"
import UserCard from "../../components/user/UserCard"
import Breadcrumbs from "../../components/layouts/Breadcrumbs"
import CommentsContainer from "../../components/comments/CommentsContainer"
import Link from "../../components/utils/LinkScroll"

// Utils
import slugify from "../../components/utils/slugify"

const options = {
    forceBlock: true,

    wrapper: Article,

    overrides: {
        h2: {
            component: Font.H2,
        },

        h3: {
            component: Font.H3,
        },

        h4: {
            component: Font.H4,
        },

        h5: {
            component: Font.H5,
        },

        h6: {
            component: Font.H6,
        },

        p: {
            component: Font.P,
        },

        strong: {
            component: Font.Strong,
        },

        em: {
            component: Font.Em,
        },

        ul: {
            component: Font.List,
        },

        small: {
            component: Font.Small,
        },

        Link: {
            component: Link,
        },
    },
}

function PostDetail({ post, ...props }) {
    // Breadcrumbs
    const BreadcrumbsLinks = [
        {
            title: "Posts",
            url: "/posts",
        },
        {
            title:
                post.category.charAt(0).toUpperCase() + post.category.slice(1),
            url: `/posts/${slugify(post.category)}`,
        },
        {
            title: post.title,
        },
    ]

    return (
        <Page
            title={post.title}
            description={post.metaDescription}
            keywords={post.tags}
            nocontainer
        >
            <Cover src={post.imageUrl} alt={post.title}>
                <Font.H1>{post.title}</Font.H1>
            </Cover>

            <Container padding>
                <Content>
                    <Breadcrumbs items={BreadcrumbsLinks} />

                    <Markdown options={options}>{post.body}</Markdown>

                    <UserCard user={post.author} />

                    <CommentsContainer
                        postId={post._id}
                        comments={post.comments}
                    />
                </Content>

                <Aside />
            </Container>
        </Page>
    )
}

export default PostDetail
