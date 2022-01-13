// Packages
import React, { useContext, useState } from "react"
import styled, { css } from "styled-components"
import { NavLink, Link as NormalLink, useLocation } from "react-router-dom"

// Import components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import { AuthContext } from "../../context/auth"
import Icon from "../ui/Icon"
import Burger from "../ui/Burger"

// Data
import GlobalData from "../data/GlobalData"

// Styles
const Container = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: ${Variables.Colors.Primary};
    padding: ${Variables.Margins.XXL};
    display: flex;
    flex-direction: column;
    z-index: 999;

    a,
    button {
        color: ${Variables.Colors.White};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};
        font-weight: ${Variables.FontWeights.Bold};

        &:hover {
            color: ${Variables.Colors.Secondary70};
        }
    }

    @media ${Variables.Breakpoints.Tablet} {
        width: calc(${Variables.Margins.XXL} * 2 + 30px);
        transition: ${Variables.Transitions.Long};

        &.open {
            width: 300px;
        }
    }
`

const Title = styled(Font.H4)`
    margin-bottom: ${Variables.Margins.L};

    @media ${Variables.Breakpoints.Tablet} {
        margin-top: calc(20px + ${Variables.Margins.L});
        width: 0;
        overflow: hidden;
    }
`

const List = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};
    align-content: start;

    ${props =>
        props.full &&
        css`
            flex-grow: 1;
        `}

    @media ${Variables.Breakpoints.Tablet} {
        .text {
            white-space: nowrap;
            overflow: hidden;
            max-width: 0;
            transition: ${Variables.Transitions.Short};

            &.open {
                max-width: 300px;
            }
        }
    }
`

const Link = styled(NavLink)`
    font-weight: ${Variables.FontWeights.Bold};
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamily};
    justify-self: start;

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }

    &.active {
        color: ${Variables.Colors.Secondary};
    }
`

// Links
const Links = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: "dashboard",
    },
    {
        title: "Edit your profile",
        url: "/dashboard/edit-account",
        icon: "edit",
    },
]

const LinksModerator = [
    {
        title: "Comments",
        url: "/dashboard/comments",
        icon: "bubble",
    },
]

const LinksAdmin = [
    {
        title: "Pages",
        url: "/dashboard/pages",
        icon: "file",
    },
    {
        title: "Global data",
        url: "/dashboard/global",
        icon: "database",
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: "user",
    },
]

const LinksBottom = [
    {
        title: "Go to website",
        url: "/",
        icon: "external-link",
    },
]

function Nav() {
    const { user, logoutUser } = useContext(AuthContext)
    const location = useLocation().pathname

    const conditionComment = user.role === "admin" || user.role === "moderator"

    const [isOpen, setIsOpen] = useState(false)
    const open = isOpen ? "open" : ""

    // Components
    const ButtonNav = props => {
        return (
            <Link to={props.url} as={props.as} {...props}>
                <Icon name={props.icon} size={24} color="currentColor" />
                <span className={`text ${open}`}>{props.title}</span>
            </Link>
        )
    }

    return (
        <Container className={open}>
            <Burger
                dashboard
                className={open}
                onClick={() => setIsOpen(!isOpen)}
            />

            <Title>
                <NavLink to="/dashboard">{GlobalData().name}</NavLink>
            </Title>

            <List full>
                {Links.map((link, i) => (
                    <ButtonNav
                        as={link.url === "/dashboard" ? NormalLink : Link}
                        className={
                            location === "/dashboard" &&
                            link.url === "/dashboard" &&
                            "active"
                        }
                        url={link.url}
                        icon={link.icon}
                        title={link.title}
                        key={i}
                    />
                ))}

                {conditionComment &&
                    LinksModerator.map((link, i) => (
                        <ButtonNav
                            url={link.url}
                            icon={link.icon}
                            title={link.title}
                            key={i}
                        />
                    ))}

                {user.role === "admin" &&
                    LinksAdmin.map((link, i) => (
                        <ButtonNav
                            url={link.url}
                            icon={link.icon}
                            title={link.title}
                            key={i}
                        />
                    ))}
            </List>

            <List>
                {LinksBottom.map((link, i) => (
                    <ButtonNav
                        url={link.url}
                        icon={link.icon}
                        title={link.title}
                        key={i}
                    />
                ))}

                <Link as="button" onClick={logoutUser}>
                    <Icon name="quit" size={24} color="currentColor" />
                    <span className={`text ${open}`}>Log out</span>
                </Link>
            </List>
        </Container>
    )
}

export default Nav
