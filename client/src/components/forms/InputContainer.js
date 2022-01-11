// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XXS};
`

const Label = styled.label`
    color: ${Variables.Colors.Primary};
    font-weight: ${Variables.FontWeights.Bold};
`

function InputContainer(props) {
    return (
        <Container>
            {props.label && <Label htmlFor={props.id}>{props.label}</Label>}

            {props.children}
        </Container>
    )
}

export default InputContainer
