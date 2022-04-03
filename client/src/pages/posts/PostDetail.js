// Packages
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Wrapper, Main, Font, MarkdownContainer } from "components-react-julseb"
import { unslugify, slugify } from "js-utils-julseb"

// API
import postService from "../../api/post.service"

// Components
import Page from "../../components/layouts/Page"
import Aside from "../../components/layouts/Aside"
import Cover from "../../components/layouts/Cover"
import Breadcrumbs from "../../components/ui/Breadcrumbs"
import Bio from "../../components/authors/Bio"
import CommentsContainer from "../../components/comments/CommentsContainer"

// Utils
import markdownConfig from "../../config/markdownConfig"

const PostDetail = () => {
    const { slug } = useParams()

    // Get post
    const [post, setPost] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        postService
            .postSlug(slug)
            .then(res => {
                setPost(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [slug])

    // Breadcrumbs
    const breadcrumbsItems = [
        {
            text: "Posts",
            to: "/posts",
        },
        {
            text: isLoading ? "Category" : unslugify(post.category),
            to: isLoading ? "#" : `/categories/${slugify(post.category)}`,
        },
        {
            text: isLoading ? "Post" : post.title,
        },
    ]

    return (
        <Page
            title={isLoading ? "Post" : post.title}
            description={!isLoading && post.metaDescription}
            keywords={!isLoading && post.tags}
            isLoading={isLoading}
        >
            {!isLoading && (
                <>
                    <Cover src={post.imageUrl} alt={post.title}>
                        <Font.H1>{post.title}</Font.H1>
                    </Cover>

                    <Wrapper template="aside-right">
                        <Main template="aside-right">
                            <Breadcrumbs items={breadcrumbsItems} />

                            <MarkdownContainer options={markdownConfig}>
                                {post.body}
                            </MarkdownContainer>

                            <Bio author={post.author} post />

                            <CommentsContainer
                                comments={post.comments}
                                post={post}
                            />
                        </Main>

                        <Aside template="aside-right" />
                    </Wrapper>
                </>
            )}
        </Page>
    )
}

export default PostDetail
