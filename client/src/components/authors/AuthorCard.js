// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Image, Font, Grid, Variables } from "components-react-julseb"
import { slugify } from "js-utils-julseb"

// Styles
const Container = styled(Grid)`
    color: ${Variables.Colors.Black};
    text-decoration: none;
    cursor: pointer;

    &:hover img {
        transform: scale(1.02);
    }
`

const Img = styled(Image)`
    border-radius: ${Variables.Radiuses.M};
    overflow: hidden;
    aspect-ratio: 1;

    img {
        transition: ${Variables.Transitions.Short};
    }
`

const AuthorCard = ({ author }) => {
    return (
        <Container
            as={Link}
            to={`/authors/${slugify(author.fullName)}-${author._id}`}
            gap={Variables.Spacers.S}
        >
            <Img src={author.imageUrl} alt={author.fullName} />

            <Grid as="span" gap={Variables.Spacers.XXS}>
                <Font.H4>{author.fullName}</Font.H4>
                <Font.P>
                    {author.posts.length} post{author.posts.length > 1 && "s"}
                </Font.P>
            </Grid>
        </Container>
    )
}

export default AuthorCard
