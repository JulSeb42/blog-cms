// Packages
import React from "react"

// Components
import ContainerForm from "../../components/layouts/ContainerForm"
import * as Font from "../../components/styles/Font"

function Goodbye() {
    return (
        <ContainerForm title="We're sorry to see you go!">
            <Font.P>Your account was deleted successfully.</Font.P>
        </ContainerForm>
    )
}

export default Goodbye
