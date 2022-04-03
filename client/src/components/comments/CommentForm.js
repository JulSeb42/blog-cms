// Packages
import React, { useState } from "react"
import {
    Form,
    Input,
    ButtonsContainer,
    Button,
    Alert,
    Font
} from "components-react-julseb"
import { getToday, getTimeNow } from "js-utils-julseb"

// API
import commentsService from "../../api/comments.service"

const CommentForm = props => {
    // Open / close form
    const [isOpen, setIsOpen] = useState(false)

    // Form items
    const [poster, setPoster] = useState("")
    const [body, setBody] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const handlePoster = e => setPoster(e.target.value)
    const handleBody = e => setBody(e.target.value)

    // Reset form
    const handleReset = () => {
        setIsOpen(false)
        setPoster("")
        setBody("")
    }

    // Handle form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            poster,
            body,
            date: getToday(),
            time: getTimeNow(),
            post: props.post,
        }

        commentsService
            .newComment(requestBody)
            .then(() => window.location.reload(false))
            .catch(err => {
                setErrorMessage(err.response.data.message)
            })
    }

    return isOpen ? (
        <>
            <Form onSubmit={handleSubmit}>
                <Input
                    label="Your name"
                    id="name"
                    onChange={handlePoster}
                    value={poster}
                />

                <Input
                    label="Your comment"
                    id="body"
                    type="textarea"
                    onChange={handleBody}
                    value={body}
                    style={{ minHeight: 150 }}
                />

                <ButtonsContainer>
                    <Button type="submit" justify="start">
                        Post your comment
                    </Button>

                    <Button btnStyle="text" onClick={handleReset}>
                        Cancel
                    </Button>
                </ButtonsContainer>
            </Form>

            {errorMessage && <Alert color="danger" as={Font.P}>{errorMessage}</Alert>}
        </>
    ) : (
        <Button onClick={() => setIsOpen(true)} justify="start">
            Post a comment
        </Button>
    )
}

export default CommentForm
