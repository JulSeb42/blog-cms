// Packages
import React, { useContext } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import { Variables, Font, Flexbox, Grid } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import { GlobalContext } from "../../context/globalData"

// Components
import LinkNavDashboard from "./LinkNavDashboard"

// Styles
const Container = styled(Flexbox)`
    position: fixed;
    height: 100vh;
    background-color: ${Variables.Colors.Primary500};
    width: 250px;
    padding: ${Variables.Spacers.XXL};
`

const Nav = styled(Grid)`
    flex-grow: ${props => props.as === "nav" && 1};
    align-content: start;
`

const Logo = styled(Font.H3)`
    margin-bottom: ${Variables.Spacers.S};

    a {
        color: ${Variables.Colors.White};
        text-decoration: none;

        &:hover {
            color: ${Variables.Colors.Secondary500};
        }
    }
`

const NavDashboard = props => {
    const { user, logoutUser } = useContext(AuthContext)
    const { globalData } = useContext(GlobalContext)
    const location = useLocation().pathname

    // Links
    const links = [
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

    const linksModerator = [
        {
            title: "Comments",
            url: "/dashboard/comments",
            icon: "bubble",
        },
    ]

    const linksAdmin = [
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
        {
            title: "Navigation items",
            url: "/dashboard/navigation",
            icon: "sitemap"
        }
    ]

    const linksBottom = [
        {
            title: "Go to website",
            url: "/",
            icon: "link-external",
        },
    ]

    return (
        <Container as="header" direction="column">
            <Logo>
                <Link to="/dashboard">{globalData.name}</Link>
            </Logo>

            <Nav as="nav" gap={Variables.Spacers.XS}>
                {links.map((link, i) => (
                    <LinkNavDashboard
                        to={link.url}
                        icon={link.icon}
                        as={link.url === "/dashboard" ? Link : NavLink}
                        className={
                            location === "/dashboard" &&
                            link.url === "/dashboard" &&
                            "active"
                        }
                        key={i}
                    >
                        {link.title}
                    </LinkNavDashboard>
                ))}

                {(user.role === "moderator" || user.role === "admin") &&
                    linksModerator.map((link, i) => (
                        <LinkNavDashboard
                            to={link.url}
                            icon={link.icon}
                            key={i}
                        >
                            {link.title}
                        </LinkNavDashboard>
                    ))}

                {user.role === "admin" &&
                    linksAdmin.map((link, i) => (
                        <LinkNavDashboard
                            to={link.url}
                            icon={link.icon}
                            key={i}
                        >
                            {link.title}
                        </LinkNavDashboard>
                    ))}
            </Nav>

            <Nav gap={Variables.Spacers.XS}>
                {linksBottom.map((link, i) => (
                    <LinkNavDashboard
                        to={link.url}
                        icon={link.icon}
                        target="_blank"
                        rel="noreferrer noopener"
                        key={i}
                    >
                        {link.title}
                    </LinkNavDashboard>
                ))}

                <LinkNavDashboard
                    as="button"
                    icon="logout"
                    onClick={logoutUser}
                >
                    Log out
                </LinkNavDashboard>
            </Nav>
        </Container>
    )
}

export default NavDashboard
