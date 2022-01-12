// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Loader from "./Loader"

// Styles
const Container = styled.button`
    text-decoration: none;
    background: none;
    border: none;
    font-family: ${Variables.FontFamily};
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Bold};
    padding: ${Variables.Margins.XS} ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.S};
    transition: ${Variables.Transitions.Short};
    text-align: center;

    ${props =>
        props.btnstyle === "primary" &&
        css`
            background-color: ${Variables.Colors.Primary};
            color: ${Variables.Colors.White};

            &:hover {
                background-color: ${Variables.Colors.Primary70};
            }

            &:disabled {
                background-color: ${Variables.Colors.LightGray};
                color: ${Variables.Colors.DarkGray};
            }
        `}

    ${props =>
        props.btnstyle === "secondary" &&
        css`
            color: ${Variables.Colors.Primary};

            &:hover {
                color: ${Variables.Colors.Primary70};
            }
        `}
    
    ${props =>
        props.btnstyle === "danger" &&
        css`
            background-color: ${Variables.Colors.Danger};
            color: ${Variables.Colors.White};

            &:hover {
                background-color: ${Variables.Colors.Danger70};
            }
        `}
    
    ${props =>
        props.justify &&
        css`
            justify-self: ${props => props.justify};
        `}
    
    ${props => props.isLoading && css`
        display: flex;
        align-items: center;
    `}
`

function Button(props) {
    return (
        <Container
            as={props.to && Link}
            to={props.to}
            disabled={props.isLoading && "disabled"}
            {...props}
        >
            {props.isLoading && <Loader color={Variables.Colors.DarkGray} />}

            {props.children}
        </Container>
    )
}

export default Button
