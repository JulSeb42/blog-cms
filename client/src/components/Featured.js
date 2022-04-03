// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Image, Font, Variables, Grid } from "components-react-julseb"

// Styles
const Container = styled(Grid)`
    padding: ${Variables.Spacers.XXL} 5vw;
`

const Card = styled(Link)`
    position: relative;
    height: 20vw;
    z-index: 0;
    text-decoration: none;
    overflow: hidden;
    border-radius: ${Variables.Radiuses.M};
    min-height: 200px;

    &:after {
        content: "";
        background: ${Variables.Overlays.Gradient.Black};
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &:hover > div {
        transform: scale(1.02);
    }
`

const Img = styled(Image)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    transition: ${Variables.Transitions.Short};
`

const Title = styled(Font.H3)`
    position: relative;
    z-index: 2;
    color: ${Variables.Colors.White};
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: ${Variables.Spacers.M};
`

const Featured = ({ posts }) => {
    const firstLine = posts.slice(0, 2)
    const secondLine = posts.slice(2, 5)

    return (
        <Container>
            <Grid col={2}>
                {firstLine.map((post, i) => (
                    <Card
                        to={`/posts/${post.category}/${post.slug}`}
                        key={post._id}
                    >
                        <Img src={post.imageUrl} alt={post.title} />

                        <Title>{post.title}</Title>
                    </Card>
                ))}
            </Grid>

            <Grid col={3}>
                {secondLine.map((post, i) => (
                    <Card
                        to={`/posts/${post.category}/${post.slug}`}
                        key={post._id}
                    >
                        <Img src={post.imageUrl} alt={post.title} />

                        <Title>{post.title}</Title>
                    </Card>
                ))}
            </Grid>
        </Container>
    )
}

export default Featured
