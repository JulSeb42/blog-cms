// Packages
import React from "react"
import { useLocation } from "react-router-dom"

// Components
import Helmet from "./Helmet"
import Header from "./Header"

function Page(props) {
    const location = useLocation().pathname

    return (
        <>
            <Helmet
                title={props.title}
                description={props.description}
                keywords={props.keywords}
            />

            {!location.match(/^\/dashboard.*$/gim) && <Header />}

            {props.children}
        </>
    )
}

export default Page
