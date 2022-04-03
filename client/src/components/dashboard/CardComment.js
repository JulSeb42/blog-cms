// Packages
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import {
    Font,
    Variables,
    Grid,
    TitleFlex,
    ButtonIcon,
    Modal,
    Alert,
    Button,
    ButtonsContainer,
} from "components-react-julseb"
import { convertDate } from "js-utils-julseb"

// API
import commentsService from "../../api/comments.service"

// Components
import Toast from "../ui/Toast"

// Styles
const Container = styled(Grid)`
    padding-bottom: ${Variables.Spacers.M};
    display: ${props => props.display};

    ${props =>
        !props.last &&
        css`
            border-bottom: 1px solid ${Variables.Colors.Gray200};
            padding-bottom: ${Variables.Spacers.M};
        `}
`

const CardComment = ({ comment, last }) => {
    const [isOpen, setIsOpen] = useState(false)

    // Toast
    const [toastOpen, setToastOpen] = useState(false)

    if (toastOpen) {
        setTimeout(() => {
            setToastOpen(false)
        }, 3000)
    }

    // Hide when delete card
    const [display, setDisplay] = useState("grid")

    // Delete comment
    const handleDelete = () => {
        commentsService
            .deleteComment(comment._id)
            .then(() => {
                setDisplay("none")
                setToastOpen(true)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        isOpen
            ? document.body.classList.add("stop-scrolling")
            : document.body.classList.remove("stop-scrolling")
    }, [isOpen])

    return (
        <>
            <Container gap={Variables.Spacers.S} display={display} last={last}>
                <TitleFlex>
                    <Grid gap={Variables.Spacers.XXS}>
                        <Font.H5>{comment.poster}</Font.H5>

                        <Font.Small>
                            {convertDate(comment.date)} at {comment.time}
                        </Font.Small>

                        <Font.Small>
                            Posted in{" "}
                            <Link
                                to={`/posts/${comment.post.category}/${comment.post.slug}-${comment.post._id}`}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {comment.post.title}
                            </Link>
                        </Font.Small>
                    </Grid>

                    <ButtonIcon
                        btnStyle="transparent"
                        color="danger"
                        hoverBackground
                        icon="trash"
                        size={32}
                        onClick={() => setIsOpen(true)}
                    />
                </TitleFlex>

                <Font.P>{comment.body}</Font.P>

                <Modal open={isOpen}>
                    <Alert color="danger">
                        <Font.P>
                            Are you sure you want to delete this comment?
                        </Font.P>

                        <ButtonsContainer>
                            <Button color="danger" onClick={handleDelete}>
                                Yes, delete this comment
                            </Button>

                            <Button
                                btnStyle="text"
                                onClick={() => setIsOpen(false)}
                            >
                                No, cancel
                            </Button>
                        </ButtonsContainer>
                    </Alert>
                </Modal>
            </Container>

            <Toast
                color="danger"
                text="The comment has been deleted"
                open={toastOpen}
                onClickClose={() => setToastOpen(false)}
            />
        </>
    )
}

export default CardComment
