// Packages
import React from "react"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"
import { Container, Content } from "../components/layouts/Container"

function Contact() {
    return (
        <Page title="Contact">
            <Container noaside header>
                <Content>
                    <Font.H1>Contact page</Font.H1>
                </Content>
            </Container>
        </Page>
    )
}

export default Contact
