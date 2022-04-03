// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import {
    Grid,
    Font,
    ButtonIcon,
    Flexbox,
    Badge,
    Variables,
} from "components-react-julseb"
import { convertDateShort } from "js-utils-julseb"

// Styles
const Container = styled(Flexbox)`
    ${props =>
        !props.last &&
        css`
            border-bottom: 1px solid ${Variables.Colors.Gray200};
            padding-bottom: ${Variables.Spacers.M};
        `}
`
const Content = styled(Grid)`
    flex-grow: 1;
`

const Title = styled(Font.H6)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const CardPost = ({ post, last }) => {
    return (
        <Container gap={Variables.Spacers.XS} last={last}>
            <Flexbox align="center" style={{ height: 24 }}>
                <Badge size={8} color={post.draft ? "warning" : "success"} />
            </Flexbox>

            <Content gap={Variables.Spacers.XXS}>
                <Title>
                    <Link to={`/dashboard/posts/${post._id}`}>
                        {post.title}
                    </Link>
                </Title>

                <Font.Small>
                    {post.draft ? "Draft" : "Published"} by{" "}
                    <Font.Strong>{post.author.fullName}</Font.Strong> on{" "}
                    {convertDateShort(post.date)} at {post.time}.
                </Font.Small>
            </Content>

            <Flexbox gap={Variables.Spacers.XXS}>
                <ButtonIcon
                    to={`/posts/${post.category}/${post.slug}`}
                    icon="file"
                    size={32}
                    btnStyle="transparent"
                    aria-label="Read post"
                    target="_blank"
                    rel="noreferrer noopener"
                    hoverBackground
                />

                <ButtonIcon
                    to={`/dashboard/posts/${post._id}`}
                    icon="edit"
                    size={32}
                    btnStyle="transparent"
                    aria-label="Edit post"
                    hoverBackground
                />
            </Flexbox>
        </Container>
    )
}

export default CardPost
