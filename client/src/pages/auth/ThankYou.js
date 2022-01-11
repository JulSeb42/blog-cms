// Packages
import React from "react"

// Components
import ContainerForm from "../../components/layouts/ContainerForm"
import * as Font from "../../components/styles/Font"

function ThankYou() {
    return (
        <ContainerForm title="Thank you for creating your account!">
            <Font.P>
                You are now logged in. We just sent you an email to verify your
                account, please click on the link to access all the
                functionalities.
            </Font.P>
        </ContainerForm>
    )
}

export default ThankYou
