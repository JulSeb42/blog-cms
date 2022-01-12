// Packages
import React from "react"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"
import { Container, Content } from "../components/layouts/Container"

function Impressum() {
    return (
        <Page title="Impressum">
            <Container noaside header>
                <Content>
                    <Font.H1>Impressum</Font.H1>
                </Content>
            </Container>
        </Page>
    )
}

export default Impressum
