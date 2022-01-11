// Packages
import React from "react"

// Components
import Page from "../../components/layouts/Page"
import * as Font from "../../components/styles/Font"
import ContainerForm from "../../components/layouts/ContainerForm"

function Goodbye() {
    return (
        <ContainerForm title="We're sorry to see you go!">
            <Font.P>Your account was deleted successfully.</Font.P>
        </ContainerForm>
    )
}

export default Goodbye
