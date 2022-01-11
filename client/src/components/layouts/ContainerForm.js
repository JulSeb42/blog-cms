// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"
import Page from "./Page"
import Back from "../ui/Back"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 400px 1fr;
    padding: ${Variables.Margins.XXL} 0;
`

const Content = styled.div`
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.L};
`

function ContainerForm(props) {
    return (
        <Page title={props.title}>
            <Container>
                <Content>
                    <Back to="/">Back to site</Back>

                    <Font.H1>{props.title}</Font.H1>

                    {props.children}
                </Content>
            </Container>
        </Page>
    )
}

export default ContainerForm
