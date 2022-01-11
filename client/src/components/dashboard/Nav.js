// Packages
import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { NavLink } from "react-router-dom"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import { AuthContext } from "../../context/auth"
import Icon from "../ui/Icon"

// Data
import SiteData from "../data/SiteData"

const Links = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: "dashboard",
    },
    // {
    //     title: "Global data",
    //     url: "/dashboard/global",
    //     icon: "database",
    // },
    {
        title: "Edit your profile",
        url: "/dashboard/edit-account",
        icon: "edit",
    },
]

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

    a {
        color: ${Variables.Colors.White};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};
        font-weight: ${Variables.FontWeights.Bold};

        &:hover {
            color: ${Variables.Colors.Primary};
        }
    }
`

const Title = styled(Font.H4)`
    margin-bottom: ${Variables.Margins.L};
    a {
        color: ${Variables.Colors.White};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};
        font-weight: ${Variables.FontWeights.Bold};

        &:hover {
            color: ${Variables.Colors.Primary};
        }
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
`

const Link = styled(NavLink)`
    color: ${Variables.Colors.White};
    text-decoration: none;
    transition: ${Variables.Transitions.Short};
    font-weight: ${Variables.FontWeights.Bold};
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: ${Variables.FontSizes.Body};
    font-family: ${Variables.FontFamily};
    justify-self: start;

    &:hover {
        color: ${Variables.Colors.Primary};
    }

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }
`

function Nav() {
    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Container>
            <Title>
                <NavLink to="/">{SiteData.Name}</NavLink>
            </Title>

            <List full>
                {Links.map((link, i) => (
                    <Link to={link.url} key={i}>
                        <Icon name={link.icon} size={16} color="currentColor" />
                        {link.title}
                    </Link>
                ))}

                {user.role === "admin" && (
                    <>
                        <Link to="/dashboard/global">
                            <Icon
                                name="database"
                                size={16}
                                color="currentColor"
                            />
                            Global data
                        </Link>

                        <Link to="/dashboard/users">
                            <Icon name="user" size={16} color="currentColor" />
                            Users
                        </Link>
                    </>
                )}
            </List>

            <List>
                <Link to="/">
                    <Icon name="external-link" size={16} color="currentColor" />
                    Go to website
                </Link>

                <Link as="button" onClick={logoutUser}>
                    <Icon name="quit" size={16} color="currentColor" />
                    Log out
                </Link>
            </List>
        </Container>
    )
}

export default Nav
