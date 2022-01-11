// Packages
import React from "react"
import styled from "styled-components"

// Components
import Button from "./Button"
import Icon from "./Icon"
import * as Variables from "../styles/Variables"

// Styles
const BackButton = styled(Button)`
    display: flex;
    align-items: center;
    padding: 0;

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }
`

function Back(props) {
    return (
        <BackButton btnstyle="secondary" to={props.to} {...props}>
            <Icon name="chevron-left" size={12} color="currentColor" />

            {props.children}
        </BackButton>
    )
}

export default Back
