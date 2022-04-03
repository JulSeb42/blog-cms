// Packages
import React from "react"
import styled, { css } from "styled-components"
import {
    Breadcrumbs as Container,
    BreadcrumbsItem,
    Variables,
} from "components-react-julseb"

// Styles
const Item = styled(BreadcrumbsItem)`
    ${props =>
        props.to &&
        css`
            &:hover {
                color: ${Variables.Colors.Secondary500} !important;
            }
        `}
`

const Breadcrumbs = ({ items }) => {
    return (
        <Container icon="chevron-right">
            <Item to="/">Home</Item>

            {items.map((item, i) => (
                <Item to={item.to} key={i}>
                    {item.text}
                </Item>
            ))}
        </Container>
    )
}

export default Breadcrumbs
