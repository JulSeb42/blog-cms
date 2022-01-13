// Packages
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import ButtonsContainer from "../forms/ButtonsContainer"
import Button from "../ui/Button"
import Toggle from "../forms/Toggle"
import Alert from "../ui/Alert"
import ButtonIcon, { IconsContainer } from "../ui/ButtonIcon"
import Select from "../forms/Select"
import { AuthContext } from "../../context/auth"

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

    @media ${Variables.Breakpoints.Mobile} {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        strong {
            margin-bottom: ${Variables.Margins.XS};
        }
    }
`

const Danger = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XS};
`

const SelectStyled = styled(Select)`
    min-width: 150px;
`

function CardUser({ userCard, ...props }) {
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    const [isApproved, setIsApproved] = useState(userCard.approved)

    // Approve user
    const handleApprove = () => {
        axios
            .put(`/users/approve/${userCard._id}`)
            .then(() => {
                setMessageAlert(`Success, you approved ${userCard.fullName}`)
                setAlertStyle("success")
                setIsVisible(true)
                setIsApproved(true)
            })
            .catch(err => console.log(err))
    }

    // Delete user
    const handleDelete = () => {
        axios
            .delete(`/users/delete-user/${userCard._id}`)
            .then(() => {
                setMessageAlert(`Success, you deleted ${userCard.fullName}`)
                setAlertStyle("success")
                setIsVisible(true)
            })
            .catch(err => console.log(err))
    }

    // Feature user
    const [featured, setFeatured] = useState(userCard.featured)

    const handleFeatured = e => {
        if (e.target.checked) {
            setFeatured(true)
            axios
                .put(`/users/feature/${userCard._id}`, { featured: true })
                .then(() => {
                    setMessageAlert(`${userCard.fullName} is now featured`)
                    setAlertStyle("success")
                    setIsVisible(true)
                })
                .catch(err => console.log(err))
        } else {
            setFeatured(false)
            axios
                .put(`/users/feature/${userCard._id}`, { featured: false })
                .then(() => {
                    setMessageAlert(`${userCard.fullName} is not featured`)
                    setAlertStyle("danger")
                    setIsVisible(true)
                })
                .catch(err => console.log(err))
        }
    }

    // Show / hide alert
    const [isVisible, setIsVisible] = useState(false)
    const [messageAlert, setMessageAlert] = useState(undefined)
    const [alertStyle, setAlertStyle] = useState(undefined)

    if (isVisible) {
        setTimeout(() => {
            setIsVisible(false)
        }, 3000)
    }

    // Change role
    const [role, setRole] = useState(userCard.role)

    const handleRole = e => {
        setRole(e.target.value)

        const requestBody = { role: e.target.value }
        
        axios
            .put(`/users/role/${userCard._id}`, requestBody)
            .then(() => {
                setMessageAlert(`${userCard.fullName} is now ${e.target.value}`)
                setAlertStyle("success")
                setIsVisible(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container className={open}>
                <Content>
                    <Font.Strong>{userCard.fullName}</Font.Strong>

                    <IconsContainer>
                        <SelectStyled
                            disabled={user._id === userCard._id && true}
                            defaultValue={role}
                            onChange={handleRole}
                        >
                            <option value="writer">Writer</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </SelectStyled>

                        <Toggle
                            label="Featured"
                            id={`featured-${userCard._id}`}
                            onChange={handleFeatured}
                            defaultChecked={featured}
                            value={featured}
                        />

                        {isApproved === false && (
                            <ButtonIcon
                                icon="check"
                                aria-label="Approve user"
                                className="check"
                                onClick={handleApprove}
                            />
                        )}

                        <ButtonIcon
                            icon="trash"
                            aria-label="Delete user"
                            className="check"
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </IconsContainer>
                </Content>

                {isOpen && (
                    <Danger>
                        <Font.P>
                            Are you sure you want to delete {userCard.fullName}?
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

            <Alert
                alertstyle={alertStyle}
                message={messageAlert}
                isVisible={isVisible}
            />
        </>
    )
}

export default CardUser
