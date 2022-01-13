// Packages
import React, { useState } from "react"
import axios from "axios"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import Form from "../forms/Form"
import Input from "../forms/Input"
import Button from "../ui/Button"

// Utils
import getToday from "../utils/getToday"
import getTimeNow from "../utils/getTimeNow"

function FormComment(props) {
    // Open form
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "grid" : "none"

    // Form
    const [name, setName] = useState("")
    const [body, setBody] = useState("")

    const handleName = e => setName(e.target.value)
    const handleBody = e => setBody(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            poster: name,
            body,
            date: getToday(),
            time: getTimeNow(),
            post: props.postId,
        }

        axios
            .put("/comments/new-comment", requestBody)
            .then(() => window.location.reload(false))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button
                btnstyle="primary"
                justify="start"
                onClick={() => setIsOpen(true)}
                style={{ display: isOpen ? "none" : "" }}
            >
                Post a comment
            </Button>

            <Form
                btnprimary="Post your comment"
                onSubmit={handleSubmit}
                style={{ display: open }}
                btnreset="Cancel"
                onClickReset={() => setIsOpen(false)}
            >
                <Input
                    label="Your name"
                    id="name"
                    onChange={handleName}
                    value={name}
                />

                <Input
                    label="Your comment"
                    id="body"
                    inputtype="textarea"
                    onChange={handleBody}
                    value={body}
                />
            </Form>
        </>
    )
}

export default FormComment
