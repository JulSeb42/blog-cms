// Packages
import React from "react"
import { useLocation } from "react-router-dom"

// Components
import Helmet from "./Helmet"
import Header from "./Header"
import { Container, Content } from "./Container"
import Aside from "./Aside"
import Footer from "./Footer"

function Page(props) {
    const location = useLocation().pathname

    const conditionsContainer =
        !location.match(/^\/dashboard.*$/gim) && !props.nocontainer

    return (
        <>
            <Helmet
                title={props.title}
                description={props.description}
                keywords={props.keywords}
            />

            {!location.match(/^\/dashboard.*$/gim) && (
                <Header background={props.headerbackground} />
            )}

            {conditionsContainer ? (
                <Container
                    noaside={props.noaside}
                    padding={props.padding}
                    header={props.header}
                >
                    <Content>{props.children}</Content>

                    {!props.noaside && <Aside />}
                </Container>
            ) : (
                props.children
            )}

            {!location.match(/^\/dashboard.*$/gim) && <Footer />}
        </>
    )
}

export default Page
