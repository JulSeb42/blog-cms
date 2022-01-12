// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import AsyncImage from "../utils/AsyncImage"

// Utils
import slugify from "../utils/slugify"

// Styles
const Container = styled(Link)`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
    color: ${Variables.Colors.Black};
    text-decoration: none;
    align-content: start;

    &:hover img {
        transform: scale(1.02);
    }
`

const ImgContainer = styled.span`
    border-radius: ${Variables.Radiuses.M};
    width: 100%;
    min-height: 10vw;
    aspect-ratio: 1 !important;
    overflow: hidden;
`

const Image = styled(AsyncImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${Variables.Transitions.Short};
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
    align-content: start;
`

function UserCardSmall({ author }) {
    return (
        <Container to={`/authors/${slugify(author.fullName)}`}>
            <ImgContainer>
                <Image src={author.imageUrl} alt={author.fullName} />
            </ImgContainer>

            <Content>
                <Font.H4>{author.fullName}</Font.H4>

                <Font.Label as="small">
                    {author.posts.length} post{author.posts.length > 1 && "s"}
                </Font.Label>
            </Content>
        </Container>
    )
}

export default UserCardSmall
