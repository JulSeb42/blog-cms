// Packages
import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"

// Components
import { AuthContext } from "../../context/auth"

// Data
import SiteData from "../data/SiteData"

function Header() {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <header>
            <Link to="/">{SiteData.Name}</Link>

            <nav>
                <NavLink to="/">Home</NavLink>

                <NavLink to="/posts">Articles</NavLink>

                {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
            </nav>
        </header>
    )
}

export default Header
