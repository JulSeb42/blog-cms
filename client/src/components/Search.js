// Packages
import React, { useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import {
    Modal,
    Form,
    Input,
    ButtonIcon,
    Variables,
} from "components-react-julseb"
import styled from "styled-components"

// Styles
const Button = styled(ButtonIcon)`
    &:hover {
        color: ${Variables.Colors.Secondary500};
    }
`

const Container = styled(Form)`
    max-width: calc(400px + ${Variables.Spacers.S} * 2);
    padding: ${Variables.Spacers.S};
    background-color: ${Variables.Colors.White};
    border-radius: ${Variables.Radiuses.M};
`

const Search = () => {
    const navigate = useNavigate()

    // Open / close modal
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
        setQuery("")
    }

    // Search
    const [query, setQuery] = useState("")
    const handleQuery = e => setQuery(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()

        navigate({
            pathname: "/posts",
            search: createSearchParams({
                query: query,
            }).toString(),
        })

        setIsOpen(false)
    }

    return (
        <>
            <Button
                icon="search"
                size={32}
                onClick={() => setIsOpen(true)}
                btnStyle="transparent"
                color="white"
            />

            <Modal open={isOpen} close={handleClose}>
                <Container onSubmit={handleSubmit}>
                    <Input
                        label="Search"
                        placeholder="Search by title, tag or category"
                        onChange={handleQuery}
                        value={query}
                    />
                </Container>
            </Modal>
        </>
    )
}

export default Search
