// Packages
import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import ButtonsContainer from "../forms/ButtonsContainer"
import Button from "../ui/Button"
import Icon from "../ui/Icon"
import Toggle from "../forms/Toggle"

// Styles
const Container = styled.div`
    padding-bottom: ${Variables.Margins.M};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};

    &.open {
        border: 1px solid ${Variables.Colors.LightGray};
        border-radius: ${Variables.Radiuses.M};
        padding: ${Variables.Margins.M};
    }
`

const Content = styled.div`
    display: flex;
    align-items: center;

    strong {
        flex-grow: 1;
    }
`

const IconsContainer = styled.div`
    display: flex;
    align-items: center;

    a:first-child {
        margin-right: ${Variables.Margins.XXS};
    }
`

const IconButton = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${Variables.Colors.Primary};
    transition: ${Variables.Transitions.Short};
    background: none;
    border: none;

    &:hover {
        background-color: ${Variables.Colors.LightGray};
        color: ${Variables.Colors.Primary70};
    }
`

const Danger = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XS};
`

function CardUser({ user, ...props }) {
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    // Approve user
    const handleApprove = () => {
        axios
            .put(`/users/approve/${user._id}`)
            .then(() => {
                alert(`Success, you approved ${user.fullName}`)
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    // Delete user
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${user._id}`)
            .then(() => {
                alert(`Success, you deleted ${user.fullName}`)
                window.location.reload(false)
            })
            .catch(err => console.log(err))
    }

    // Feature user
    const [featured, setFeatured] = useState(user.featured)

    const handleFeatured = e => {
        if (e.target.checked) {
            setFeatured(true)
            axios
                .put(`/users/feature/${user._id}`, { featured: true })
                .then(() => {
                    alert(`Success, ${user.fullName} is now featured`)
                })
        } else {
            setFeatured(false)
            axios
                .put(`/users/feature/${user._id}`, { featured: false })
                .then(() => {
                    alert(`Success, ${user.fullName} is not featured`)
                })
        }
    }

    return (
        <Container className={open}>
            <Content>
                <Font.Strong>{user.fullName}</Font.Strong>

                <IconsContainer>
                    <Toggle
                        label="Featured"
                        id={`featured-${user._id}`}
                        onChange={handleFeatured}
                        defaultChecked={featured}
                        value={featured}
                    />

                    {user.approved === false && (
                        <IconButton>
                            <Icon
                                name="check"
                                color="currentColor"
                                size={24}
                                aria-label="Approve user"
                                className="check"
                                onClick={handleApprove}
                            />
                        </IconButton>
                    )}

                    <IconButton>
                        <Icon
                            name="trash"
                            color="currentColor"
                            size={24}
                            aria-label="Delete user"
                            className="trash"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </IconButton>
                </IconsContainer>
            </Content>

            {isOpen && (
                <Danger>
                    <Font.P>
                        Are you sure you want to delete {user.fullName}?
                    </Font.P>

                    <ButtonsContainer>
                        <Button btnstyle="danger" onClick={handleDelete}>
                            Yes, delete
                        </Button>

                        <Button
                            btnstyle="secondary"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            No, cancel
                        </Button>
                    </ButtonsContainer>
                </Danger>
            )}
        </Container>
    )
}

export default CardUser
