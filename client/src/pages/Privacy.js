// Packages
import React from "react"

// Components
import * as Font from "../components/styles/Font"
import Page from "../components/layouts/Page"
import { Container, Content } from "../components/layouts/Container"

function Privacy() {
    return (
        <Page title="Privacy policy">
            <Container noaside header>
                <Content>
                    <Font.H1>Privacy policy</Font.H1>
                </Content>
            </Container>
        </Page>
    )
}

export default Privacy
