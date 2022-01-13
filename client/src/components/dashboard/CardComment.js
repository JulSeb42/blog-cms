// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"
import axios from "axios"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import ButtonIcon, { IconsContainer } from "../ui/ButtonIcon"
import TitleFlex from "../ui/TitleFlex"

// Utils
import convertDate from "../utils/convertDate"

// Styles
const Container = styled.div`
    padding-bottom: ${Variables.Margins.M};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
`

const Title = styled.span`
    flex-grow: 1;
    margin-right: ${Variables.Margins.XS};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
`

function CardComment({ comment, ...props }) {
    // Delete comment
    const handleDelete = e => {
        e.preventDefault()

        axios
            .delete(`/comments/comment/${comment._id}/delete`)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <TitleFlex>
                <Title>
                    <Font.H5>{comment.poster}</Font.H5>
                    <Font.Label as="small">
                        {convertDate(comment.date)} at {comment.time}
                    </Font.Label>

                    <Font.Label as="small">
                        Posted in{" "}
                        <Link
                            to={`/posts/${comment.post.category}/${comment.post.slug}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {comment.post.title}
                        </Link>
                    </Font.Label>
                </Title>

                <IconsContainer>
                    <ButtonIcon icon="trash" onClick={handleDelete} />
                </IconsContainer>
            </TitleFlex>

            <Font.P pre>{comment.body}</Font.P>
        </Container>
    )
}

export default CardComment
