// Packages
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import AsyncImage from "../utils/AsyncImage"

// Styles
const Container = styled.div`
    padding: ${Variables.Margins.XXL} 5vw;
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.L};
`

const Row = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.col}, 1fr)`};
    gap: ${Variables.Margins.L};
`

const Card = styled(Link)`
    position: relative;
    height: 20vw;
    z-index: 0;
    text-decoration: none;
    overflow: hidden;
    border-radius: ${Variables.Radiuses.M};

    &:after {
        content: "";
        background: ${Variables.Colors.Overlay};
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &:hover img {
        transform: scale(1.02);
    }
`

const Image = styled(AsyncImage)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    transition: ${Variables.Transitions.Short};
`

const Title = styled(Font.H4)`
    position: relative;
    z-index: 2;
    color: ${Variables.Colors.White};
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: ${Variables.Margins.M};
`

function Featured({ posts }) {
    const firstLine = posts.slice(0, 2)
    const secondLine = posts.slice(2, 5)

    return (
        posts.length > 0 && (
            <Container>
                <Row col={2}>
                    {firstLine.map((post, i) => (
                        <Card
                            to={`/posts/${post.category}/${post.slug}`}
                            key={i}
                        >
                            <Image src={post.imageUrl} alt={post.title} />

                            <Title>{post.title}</Title>
                        </Card>
                    ))}
                </Row>

                <Row col={3}>
                    {secondLine.map((post, i) => (
                        <Card
                            to={`/posts/${post.category}/${post.slug}`}
                            key={i}
                        >
                            <Image src={post.imageUrl} alt={post.title} />

                            <Title>{post.title}</Title>
                        </Card>
                    ))}
                </Row>
            </Container>
        )
    )
}

export default Featured
