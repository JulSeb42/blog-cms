// Packages
import React, { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import * as Variables from "../styles/Variables"

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
    justify-content: space-between;
    padding: ${Variables.Margins.L} 5vw;
    z-index: 999;
    transition: ${Variables.Transitions.Short};

    a {
        color: ${Variables.Colors.Primary};
        font-weight: ${Variables.FontWeights.Regular};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};

        &:hover {
            color: ${Variables.Colors.Primary70};
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
`

const Nav = styled.nav`
    display: flex;
    align-items: center;

    a:not(:last-child) {
        margin-right: ${Variables.Margins.M};
    }
`

const NavLinkStyled = styled(NavLink)`
    &.active {
        font-weight: ${Variables.FontWeights.Bold} !important;
    }
`

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

    return (
        <Container top={topPosition} {...props}>
            <Logo to="/">{GlobalData().name}</Logo>

            <Nav>
                <NavLinkStyled to="/">Home</NavLinkStyled>

                <NavLinkStyled to="/posts">Articles</NavLinkStyled>

                {isLoggedIn && (
                    <NavLinkStyled to="/dashboard">Dashboard</NavLinkStyled>
                )}
            </Nav>
        </Container>
    )
}

export default Header
