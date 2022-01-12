// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

// Styles
const Container = styled.footer`
    width: 100%;
    background-color: ${Variables.Colors.DarkGray};
    color: ${Variables.Colors.White};
    padding: ${Variables.Margins.L} 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LinksContainer = styled.div`
    display: flex;
    align-items: center;

    a {
        color: ${Variables.Colors.White};
        font-weight: ${Variables.FontWeights.Bold};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};

        &:hover {
            color: ${Variables.Colors.Secondary};
        }

        &:not(:last-child) {
            margin-right: ${Variables.Margins.M};
        }
    }
`

const Copy = styled(Font.P)``

// Links
const Links = [
    {
        text: "About us",
        url: "/about",
    },
    {
        text: "Contact",
        url: "/contact",
    },
    {
        text: "Privacy policy",
        url: "/privacy-policy",
    },
    {
        text: "Impressum",
        url: "/impressum",
    },
]

function Footer() {
    return (
        <Container>
            <LinksContainer>
                {Links.map((link, i) => (
                    <Link to={link.url} key={i}>
                        {link.text}
                    </Link>
                ))}
            </LinksContainer>

            <Copy>&copy; Julien Sebag | 2022</Copy>
        </Container>
    )
}

export default Footer
