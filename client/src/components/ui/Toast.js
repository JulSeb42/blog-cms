// Packages
import React from "react"
import styled from "styled-components"
import {
    Variables,
    Icon,
    Font,
    Flexbox,
    ButtonIcon,
} from "components-react-julseb"

// Styles
const Container = styled(Flexbox)`
    position: fixed;
    bottom: ${Variables.Spacers.XXL};
    right: ${props => (props.open ? Variables.Spacers.XXL : "-400px")};
    width: 250px;
    padding: ${Variables.Spacers.S};
    background-color: ${Variables.Colors.White};
    box-shadow: ${Variables.Shadows.XL};
    border-radius: ${Variables.Radiuses.M};
    border: 1px solid
        ${props =>
            props.color === "success"
                ? Variables.Colors.Success500
                : Variables.Colors.Danger500};
    transition: ${Variables.Transitions.Long};
    z-index: 999;
    padding-bottom: ${Variables.Spacers.S} !important;
    border-bottom-color: ${props =>
        props.color === "success"
            ? Variables.Colors.Success500
            : Variables.Colors.Danger500} !important;
    transition: ${Variables.Transitions.Long};

    p {
        flex-grow: 1;
    }
`

const IconContainer = styled(Flexbox)`
    height: 32px;
`

const Toast = props => {
    return (
        <Container
            gap={Variables.Spacers.XS}
            color={props.color}
            open={props.open}
        >
            <IconContainer align="center">
                <Icon
                    name={
                        props.color === "success"
                            ? "check-circle"
                            : "close-circle"
                    }
                    color={
                        props.color === "success"
                            ? Variables.Colors.Success500
                            : Variables.Colors.Danger500
                    }
                    size={16}
                />
            </IconContainer>

            <Font.P>{props.text}</Font.P>

            <ButtonIcon
                size={32}
                icon="close"
                btnStyle="transparent"
                aria-label="Close"
                hoverBackground
                onClick={props.onClickClose}
            />
        </Container>
    )
}

export default Toast
