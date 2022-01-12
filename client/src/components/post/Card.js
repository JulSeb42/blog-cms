// Packages
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import AsyncImage from "../utils/AsyncImage"

// Utils
import convertDate from "../utils/convertDate"

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

const ImgContainer = styled.div`
    border-radius: ${Variables.Radiuses.M};
    width: 100%;
    height: 10vw;
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
    gap: ${Variables.Margins.XS};
    align-content: start;
`

const Info = styled.span`
    strong {
        display: inline;
        font-weight: ${Variables.FontWeights.Bold};
        width: auto;
        margin-right: ${Variables.Margins.XS};
    }

    p {
        display: inline;
        width: auto;
        color: ${Variables.Colors.Gray};
    }
`

const Title = styled(Font.H4)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const Text = styled(Font.P)`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

function Card({ post }) {
    return (
        <Container to={`/posts/${post.category}/${post.slug}`}>
            <ImgContainer>
                <Image src={post.imageUrl} alt={post.title} />
            </ImgContainer>

            <Content>
                <Info>
                    <Font.Label as="strong">
                        {post.category.charAt(0).toUpperCase() +
                            post.category.slice(1)}
                    </Font.Label>

                    <Font.Label as="p">{convertDate(post.date)}</Font.Label>
                </Info>

                <Title>{post.title}</Title>

                <Text>{post.metaDescription}</Text>
            </Content>
        </Container>
    )
}

export default Card
