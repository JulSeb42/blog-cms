// Packages
import React, { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import * as Variables from "../styles/Variables"
import Burger from "../ui/Burger"

// Data
import GlobalData from "../data/GlobalData"

// Styles
const Container = styled.header`
    width: 100%;
    position: fixed;
    top: ${props => props.top};
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: ${Variables.Margins.L} 5vw;
    z-index: 999;
    transition: ${Variables.Transitions.Short};

    a {
        color: ${Variables.Colors.White};
        font-weight: ${Variables.FontWeights.Regular};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};

        &:hover {
            color: ${Variables.Colors.Secondary70};
        }
    }

    ${props =>
        props.background &&
        css`
            background-color: ${Variables.Colors.Primary};

            a {
                color: ${Variables.Colors.White};

                &:hover {
                    color: ${Variables.Colors.Secondary};
                }
            }
        `}
`

const Logo = styled(Link)`
    font-weight: ${Variables.FontWeights.Bold} !important;
    flex-grow: 1;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;

    a:not(:last-child) {
        margin-right: ${Variables.Margins.M};
    }

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100vw;
        height: 100vh;
        background-color: ${Variables.Colors.Primary};
        z-index: 998;
        transition: ${Variables.Transitions.Long};
        flex-direction: column;
        justify-content: center;

        a:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${Variables.Margins.M};
        }

        &.open {
            left: 0;
        }
    }
`

const NavLinkStyled = styled(NavLink)`
    &.active {
        font-weight: ${Variables.FontWeights.Bold} !important;
    }
`

// Links
const Links = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Posts",
        url: "/posts",
    },
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Contact",
        url: "/contact",
    },
]

function Header(props) {
    const { isLoggedIn } = useContext(AuthContext)

    const [topPosition, setTopPosition] = useState(0)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset >= 400) {
                setTopPosition("-150px")
            } else {
                setTopPosition(0)
            }
        })
    })

    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    return (
        <Container top={topPosition} {...props}>
            <Logo to="/">{GlobalData().name}</Logo>

            <Burger header className={open} onClick={() => setIsOpen(!isOpen)} />

            <Nav className={open}>
                {Links.map((link, i) => (
                    <NavLinkStyled to={link.url} key={i}>
                        {link.title}
                    </NavLinkStyled>
                ))}

                {isLoggedIn && (
                    <NavLinkStyled to="/dashboard">Dashboard</NavLinkStyled>
                )}
            </Nav>
        </Container>
    )
}

export default Header
