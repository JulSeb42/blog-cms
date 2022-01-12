// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"

// Styles
const Container = styled.div`
    display: flex;
    align-items: center;

    a:after {
        content: "/";
        margin: 0 ${Variables.Margins.XXS};
    }
`

const BreadcrumbLink = styled(Link)`
    color: ${Variables.Colors.Primary};
    text-decoration: none;
    font-weight: ${Variables.FontWeights.Bold};
    transition: ${Variables.Transitions.Short};

    &:hover {
        color: ${Variables.Colors.Primary70};
    }
`

const BreadcrumbActive = styled(Font.P)``

function Breadcrumbs(props) {
    return (
        <Container>
            <BreadcrumbLink to="/">Home</BreadcrumbLink>

            {props.items.map((item, i) =>
                item.url !== undefined ? (
                    <BreadcrumbLink to={item.url} key={i}>
                        {item.title}
                    </BreadcrumbLink>
                ) : (
                    <BreadcrumbActive key={i}>{item.title}</BreadcrumbActive>
                )
            )}
        </Container>
    )
}

export default Breadcrumbs
