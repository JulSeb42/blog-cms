// Packages
import React, { useState } from "react"

// Components
import ButtonsContainer from "./ButtonsContainer"
import Button from "../ui/Button"

function DangerZone(props) {
    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "block" : "none"
    const visible = isOpen ? "none" : "block"

    return (
        <>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: visible }}
            >
                Delete your account
            </Button>

            <div style={{ display: open }} {...props}>
                <p>Are you sure you want to delete your account?</p>

                <ButtonsContainer>
                    <Button onClick={props.onClick}>Yes, delete my account</Button>

                    <Button onClick={() => setIsOpen(!isOpen)}>
                        No, cancel
                    </Button>
                </ButtonsContainer>
            </div>
        </>
    )
}

export default DangerZone
