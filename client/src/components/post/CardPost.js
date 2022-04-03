// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Image, Font, Variables, Grid } from "components-react-julseb"
import { convertDateShort, capitalize } from "js-utils-julseb"

// Styles
const Container = styled(Grid)`
    color: ${Variables.Colors.Black};
    text-decoration: none;
    align-content: start;

    &:hover img {
        transform: scale(1.02);
    }
`

const Img = styled(Image)`
    border-radius: ${Variables.Radiuses.L};
    overflow: hidden;

    img {
        transition: ${Variables.Transitions.Short};
    }
`

const Content = styled(Grid)``

const Date = styled.span`
    color: ${Variables.Colors.Gray500};
    margin-left: ${Variables.Spacers.XS};
`

const Title = styled(Font.H4)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const Intro = styled(Font.P)`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const CardPost = ({ post }) => {
    return (
        <Container
            as={Link}
            gap={Variables.Spacers.S}
            to={`/posts/${post.category}/${post.slug}`}
        >
            <Img
                src={post.imageUrl}
                alt={post.title}
                height={150}
                fit="cover"
            />

            <Content gap={Variables.Spacers.XXS}>
                <Font.Small as="p">
                    <Font.Strong
                        style={{ fontWeight: Variables.FontWeights.Black }}
                    >
                        {capitalize(post.category)}
                    </Font.Strong>
                    <Date>{convertDateShort(post.date)}</Date>
                </Font.Small>

                <Title>{post.title}</Title>

                <Intro>{post.metaDescription}</Intro>
            </Content>
        </Container>
    )
}

export default CardPost
