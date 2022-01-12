// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import Icon from "./Icon"

// Styles
const Container = styled(Font.P)`
    position: fixed;
    right: -400px;
    bottom: ${Variables.Margins.XXL};
    z-index: 999;
    background-color: ${props =>
        props.alertstyle === "success"
            ? Variables.Colors.Success10
            : Variables.Colors.Danger10};
    padding: ${Variables.Margins.S};
    border-radius: ${Variables.Radiuses.M};
    display: flex;
    align-items: center;
    transition: ${Variables.Transitions.Long};

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }

    &.visible {
        right: ${Variables.Margins.XXL};
    }
`

function Alert(props) {
    const visible = props.isVisible ? "visible" : ""

    return (
        <Container className={visible} {...props}>
            <Icon
                name={
                    props.alertstyle === "success"
                        ? "check-circle"
                        : "close-circle"
                }
                size={16}
                color={
                    props.alertstyle === "success"
                        ? Variables.Colors.Success
                        : Variables.Colors.Danger
                }
            />

            {props.message}
        </Container>
    )
}

export default Alert
