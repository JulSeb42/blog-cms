// Packages
import React, { useContext, useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { Burger, Variables } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import { GlobalContext } from "../../context/globalData"
import pageService from "../../api/page.service"

// Components
import Search from "../Search"

// Styles
const Container = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${Variables.Spacers.M} 5vw;
    position: fixed;
    top: ${props => props.top};
    left: 0;
    z-index: 500;
    transition: ${Variables.Transitions.Short};

    ${props =>
        props.background &&
        css`
            background-color: ${Variables.Colors.Primary500};
        `}
`

const MenuButton = styled(Burger)`
    display: none;
    color: ${Variables.Colors.Primary500};

    @media ${Variables.Breakpoints.Mobile} {
        display: inline;
    }
`

const Nav = styled.nav`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
        margin-right: ${Variables.Spacers.M};
    }

    @media ${Variables.Breakpoints.Mobile} {
        position: absolute;
        flex-direction: column;
        align-items: flex-start;
        left: 0;
        width: 100%;
        top: -200px;
        padding: ${Variables.Spacers.XS} 5vw;
        z-index: 999;
        background-color: ${Variables.Colors.White};
        transition: ${Variables.Transitions.Short};

        & > *:not(:last-child) {
            margin-right: 0;
            margin-bottom: ${Variables.Spacers.XS};
        }

        ${props =>
            props.isOpen &&
            css`
                top: 56px;
            `}
    }
`

const MenuLink = styled(NavLink)`
    text-decoration: none;
    color: ${Variables.Colors.White};
    transition: ${Variables.Transitions.Short};
    padding: 0;
    border: none;
    background: none;
    font-size: ${Variables.FontSizes.Body};

    &:hover {
        color: ${Variables.Colors.Secondary500};
    }

    &:active {
        color: ${Variables.Colors.Primary600};
    }

    &.active {
        font-weight: ${Variables.FontWeights.Black};
    }

    ${props =>
        props.logo &&
        css`
            font-weight: ${Variables.FontWeights.Black};
        `}
`

const Header = props => {
    const { isLoggedIn } = useContext(AuthContext)
    const { globalData } = useContext(GlobalContext)

    // Mobile menu
    const [isOpen, setIsOpen] = useState(false)

    // Nav items
    const navItems = [
        {
            text: "Home",
            to: "/",
        },
        {
            text: "Posts",
            to: "/posts",
        },
    ]

    // Get nav items
    const [publishedPages, setPublishedPages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        pageService
            .publishedPages()
            .then(res => {
                setPublishedPages(
                    res.data
                        .filter(page => page.header)
                        .sort((a, b) => a.orderHeader - b.orderHeader)
                )
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Hide menu on scroll
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
        <Container background={props.background} top={topPosition}>
            <MenuLink as={Link} to="/" logo>
                {globalData.name}
            </MenuLink>

            <MenuButton
                width={28}
                height={20}
                onClick={() => setIsOpen(!isOpen)}
                color="currentColor"
                open={isOpen}
            />

            <Nav isOpen={isOpen}>
                {navItems.map((item, i) => (
                    <MenuLink to={item.to} key={i}>
                        {item.text}
                    </MenuLink>
                ))}

                {!isLoading &&
                    publishedPages.map(page => (
                        <MenuLink to={`/${page.slug}`} key={page._id}>
                            {page.title}
                        </MenuLink>
                    ))}

                {isLoggedIn && <MenuLink to="/dashboard">Dashboard</MenuLink>}

                <Search headerBackground={props.background} />
            </Nav>
        </Container>
    )
}

export default Header
