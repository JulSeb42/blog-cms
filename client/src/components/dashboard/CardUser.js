// Packages
import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import {
    ButtonIcon,
    Flexbox,
    Input,
    InputCheck,
    Variables,
    Grid,
    Font,
    Modal,
    ButtonsContainer,
    Button,
    Alert,
    Badge,
} from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import adminService from "../../api/admin.service"

// Components
import Toast from "../ui/Toast"

// Styles
const Container = styled(Grid)`
    align-items: center;

    & > * {
        padding: ${Variables.Spacers.XS};
    }

    ${props =>
        !props.last &&
        css`
            border-bottom: 1px solid ${Variables.Colors.Gray200};
            padding-bottom: ${Variables.Spacers.M};
        `}
`

const Item = styled.div``

const Name = styled(Font.P)`
    display: flex;
`

const BadgeContainer = styled.span`
    height: 24px;
    display: flex;
    align-items: center;
    margin-right: ${Variables.Spacers.XS};
`

const CardUser = ({ cardUser, last }) => {
    const { user } = useContext(AuthContext)

    // Toast
    const [toastOpen, setToastOpen] = useState(false)
    const [textToast, setTextToast] = useState("")
    const [colorToast, setColorToast] = useState("")

    if (toastOpen) {
        setTimeout(() => {
            setToastOpen(false)
        }, 3000)
    }

    // Form items
    const [role, setRole] = useState(cardUser.role)

    // Change role
    const handleRoleChange = e => {
        e.preventDefault()

        setRole(e.target.value)

        const role = e.target.value

        adminService
            .editRole(cardUser._id, { role: role })
            .then(() => {
                setToastOpen(true)
                setTextToast(`${cardUser.fullName} is now ${e.target.value}`)
                setColorToast("success")
            })
            .catch(err => console.log(err))
    }

    // Feature user
    const [featured, setFeatured] = useState(cardUser.featured)

    const handleFeature = e => {
        if (e.target.checked) {
            setFeatured(true)

            adminService
                .featureUser(cardUser._id, { featured: true })
                .then(() => {
                    setToastOpen(true)
                    setTextToast(`${cardUser.fullName} is now featured`)
                    setColorToast("success")
                })
                .catch(err => console.log(err))
        } else {
            setFeatured(false)

            adminService
                .featureUser(cardUser._id, { featured: false })
                .then(() => {
                    setToastOpen(true)
                    setTextToast(`${cardUser.fullName} is not featured anymore`)
                    setColorToast("danger")
                })
                .catch(err => console.log(err))
        }
    }

    // Approve user
    const [approved, setApproved] = useState(cardUser.approved)
    const handleApprove = () => {
        setApproved(true)
        adminService
            .approveUser(cardUser._id)
            .then(() => {
                setToastOpen(true)
                setTextToast(`${cardUser.fullName} has been approved`)
                setColorToast("success")
            })
            .catch(err => console.log(err))
    }

    // Delete user
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        adminService
            .deleteUser(cardUser._id)
            .then(() => {
                window.location.reload(false)
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
            <Container col={4} last={last}>
                <Item>
                    <Name>
                        <BadgeContainer>
                            <Badge
                                size={8}
                                color={approved ? "success" : "warning"}
                            />
                        </BadgeContainer>

                        <Link
                            to={`/authors/${cardUser.fullName}-${cardUser._id}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {cardUser.fullName}
                        </Link>
                    </Name>
                </Item>

                <Item>
                    <Input
                        type="select"
                        onChange={handleRoleChange}
                        value={role}
                        disabled={cardUser._id === user._id && true}
                    >
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="writer">Writer</option>
                    </Input>
                </Item>

                <Item>
                    <InputCheck
                        id={`toggle-featured-${cardUser._id}`}
                        type="checkbox"
                        name="toggle-featured"
                        toggle
                        onChange={handleFeature}
                        value={featured}
                        defaultChecked={featured}
                    />
                </Item>

                <Item>
                    <Flexbox gap={Variables.Spacers.XS}>
                        <ButtonIcon
                            icon="check"
                            size={32}
                            color="success"
                            btnStyle="transparent"
                            aria-label="Approve user"
                            hoverBackground
                            disabled={approved}
                            onClick={handleApprove}
                        />

                        <ButtonIcon
                            icon="trash"
                            size={32}
                            color="danger"
                            btnStyle="transparent"
                            aria-label="Delete user"
                            hoverBackground
                            onClick={() => setIsOpen(true)}
                        />
                    </Flexbox>
                </Item>

                <Modal open={isOpen}>
                    <Alert color="danger">
                        <Font.P>
                            Are you sure you want to delete {cardUser.fullName}?
                        </Font.P>

                        <ButtonsContainer>
                            <Button color="danger" onClick={handleDelete}>
                                Yes, delete
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
                color={colorToast}
                text={textToast}
                open={toastOpen}
                onClickClose={() => setToastOpen(false)}
            />
        </>
    )
}

export default CardUser
