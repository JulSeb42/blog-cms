// Packages
import React from "react"

// Components
import ContainerForm from "../../components/layouts/ContainerForm"
import * as Font from "../../components/styles/Font"

function ForgotSent() {
    return (
        <ContainerForm title="Email sent successfully">
            <Font.P>
                We just sent you an email with a link to reset your password.
            </Font.P>
        </ContainerForm>
    )
}

export default ForgotSent
