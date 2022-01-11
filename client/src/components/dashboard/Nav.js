// Packages
import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { NavLink } from "react-router-dom"

// Import components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import { AuthContext } from "../../context/auth"
import Icon from "../ui/Icon"

// Data
import SiteData from "../data/SiteData"

// Styles
const Container = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: ${Variables.Colors.DarkGray};
    padding: ${Variables.Margins.XXL};
    display: flex;
    flex-direction: column;

    a,
    button {
        color: ${Variables.Colors.White};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};
        font-weight: ${Variables.FontWeights.Bold};

        &:hover {
            color: ${Variables.Colors.Secondary};
        }
    }
`

const Title = styled(Font.H4)`
    margin-bottom: ${Variables.Margins.L};
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

const LinksAdmin = [
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

// Components
const ButtonNav = ({ link }) => {
    return (
        <Link to={link.url}>
            <Icon name={link.icon} size={16} color="currentColor" />
            {link.title}
        </Link>
    )
}

function Nav() {
    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Container>
            <Title>
                <NavLink to="/">{SiteData.Name}</NavLink>
            </Title>

            <List full>
                {Links.map((link, i) => (
                    <ButtonNav link={link} key={i} />
                ))}

                {user.role === "admin" &&
                    LinksAdmin.map((link, i) => (
                        <ButtonNav link={link} key={i} />
                    ))}
            </List>

            <List>
                {LinksBottom.map((link, i) => (
                    <ButtonNav link={link} key={i} />
                ))}

                <Link as="button" onClick={logoutUser}>
                    <Icon name="quit" size={16} color="currentColor" />
                    Log out
                </Link>
            </List>
        </Container>
    )
}

export default Nav
