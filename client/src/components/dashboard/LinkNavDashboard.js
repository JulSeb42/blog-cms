// Packages
import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Icon, Flexbox, Variables } from "components-react-julseb"

// Styles
const Container = styled(Flexbox)`
    color: ${Variables.Colors.White};
    text-decoration: none;
    border: none;
    padding: 0;
    background: none;
    font-size: ${Variables.FontSizes.Body};
    transition: ${Variables.Transitions.Short};

    &.active {
        color: ${Variables.Colors.Secondary500};
    }

    &:hover {
        color: ${Variables.Colors.Secondary300};
    }
`

const LinkNavDashboard = props => {
    return (
        <Container
            as={props.as || NavLink}
            align="center"
            gap={Variables.Spacers.XXS}
            to={props.to}
            {...props}
        >
            {props.icon && <Icon name={props.icon} size={16} />}

            {props.children}
        </Container>
    )
}

export default LinkNavDashboard
