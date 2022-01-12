// Packages
import React from "react"
import { useLocation } from "react-router-dom"

// Components
import Helmet from "./Helmet"
import Header from "./Header"
import { Container, Content } from "./Container"
import Aside from "./Aside"
import Footer from "./Footer"
import Breadcrumbs from "./Breadcrumbs"

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
                    <Content>
                        {props.breadcrumbs && (
                            <Breadcrumbs items={props.breadcrumbs} />
                        )}

                        {props.children}
                    </Content>

                    {!props.noaside && (
                        <Aside
                            noauthors={props.noauthors}
                            noposts={props.noposts}
                            onChangeSearch={props.onChangeSearch}
                            valueSearch={props.valueSearch}
                            onChangeCategory={props.onChangeCategory}
                        />
                    )}
                </Container>
            ) : (
                props.children
            )}

            {!location.match(/^\/dashboard.*$/gim) && <Footer />}
        </>
    )
}

export default Page
