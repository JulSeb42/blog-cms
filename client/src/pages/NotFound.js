// Packages
import React from "react"
import { Link } from "react-router-dom"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"
import { Container, Content } from "../components/layouts/Container"

function NotFound() {
    return (
        <Page title="Not found!">
            <Container noaside header>
                <Content>
                    <Font.H1>Page not found!</Font.H1>

                    <Font.P>
                        <Link to="/">Back to homepage.</Link>
                    </Font.P>
                </Content>
            </Container>
        </Page>
    )
}

export default NotFound
