// Packages
import React, { useContext } from "react"
import styled from "styled-components"
import axios from "axios"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import TitleFlex from "../ui/TitleFlex"
import ButtonIcon from "../ui/ButtonIcon"

// Utils
import convertDate from "../utils/convertDate"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
`

const Title = styled.span`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};

    small {
        color: ${Variables.Colors.Gray};
    }
`

function Comment({ comment }) {
    const { isLoggedIn, user } = useContext(AuthContext)

    // Delete comment
    const handleDelete = e => {
        e.preventDefault()

        axios
            .delete(`/comments/comment/${comment._id}/delete`)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    // Components
    const TitleContent = () => {
        return (
            <Title>
                <Font.H5>{comment.poster}</Font.H5>

                <Font.Label as="small">
                    Posted on {convertDate(comment.date)} at {comment.time}
                </Font.Label>
            </Title>
        )
    }

    return (
        <Container>
            {(isLoggedIn && user.role === "admin") ||
            (isLoggedIn && user.role === "moderator") ? (
                <TitleFlex>
                    <TitleContent />

                    <ButtonIcon icon="trash" onClick={handleDelete} />
                </TitleFlex>
            ) : (
                <TitleContent />
            )}

            <Font.P>{comment.body}</Font.P>
        </Container>
    )
}

export default Comment
