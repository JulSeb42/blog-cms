// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import Icon from "./Icon"

// Styles
const Container = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${Variables.Colors.Primary};
    background-color: transparent;
    padding: 0;
    border: none;
    transition: ${Variables.Transitions.Short};

    &:hover {
        background-color: ${Variables.Colors.LightGray};
        color: ${Variables.Colors.Primary70};
    }
`

function ButtonIcon(props) {
    return (
        <Container as={props.to && Link} {...props}>
            <Icon name={props.icon} size={24} color="currentColor" />
        </Container>
    )
}

export default ButtonIcon

export const IconsContainer = styled.div`
    display: flex;
    align-items: center;

    div,
    a:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`
