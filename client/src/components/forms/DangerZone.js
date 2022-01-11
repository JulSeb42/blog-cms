// Packages
import React, { useState } from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import ButtonsContainer from "./ButtonsContainer"
import Button from "../ui/Button"

// Styles
const Container = styled.div`
    background-color: ${Variables.Colors.Danger10};
    border: 1px solid ${Variables.Colors.Danger};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
`

function DangerZone(props) {
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "grid" : "none"
    const visible = isOpen ? "none" : "block"

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: visible }}
                btnstyle="danger"
                justify="start"
            >
                Delete your account
            </Button>

            <Container style={{ display: open }} {...props}>
                <Font.P>Are you sure you want to delete your account?</Font.P>

                <ButtonsContainer>
                    <Button onClick={props.onClickPrimary} btnstyle="danger">
                        Yes, delete my account
                    </Button>

                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        btnstyle="secondary"
                    >
                        No, cancel
                    </Button>
                </ButtonsContainer>
            </Container>
        </>
    )
}

export default DangerZone
