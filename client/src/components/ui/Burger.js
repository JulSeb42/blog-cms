// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.button`
    display: none;

    @media ${Variables.Breakpoints.Tablet} {
        display: inline;
        position: ${props => (props.dashboard ? "fixed" : "relative")};
        background: none;
        border: none;
        padding: 0;
        width: 30px;
        height: 20px;
        left: ${props => props.dashboard && Variables.Margins.XXL};
        z-index: 999;

        span {
            width: 100%;
            background-color: ${Variables.Colors.White};
            height: 2px;
            position: absolute;
            left: 0;
            transition: ${Variables.Transitions.Short};

            &:first-child {
                top: 0;
            }

            &:nth-child(2) {
                top: calc(50% - 2px / 2);
            }

            &:last-child {
                bottom: 0;
            }
        }

        &.open span {
            &:first-child {
                transform: rotate(45deg);
                top: 45%;
            }

            &:nth-child(2) {
                width: 0;
            }

            &:last-child {
                transform: rotate(-45deg);
                bottom: 45%;
            }
        }
    }
`

function Burger(props) {
    return (
        <Container aria-label="Open / Close menu" {...props}>
            <span />
            <span />
            <span />
        </Container>
    )
}

export default Burger
