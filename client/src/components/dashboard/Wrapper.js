// Packages
import React, { useContext } from "react"
import styled, { css } from "styled-components"

// Components
import { AuthContext } from "../../context/auth"
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import Page from "../layouts/Page"
import Nav from "./Nav"

// Utils
import getFirstName from "../utils/getFirstName"

// Styles
const Container = styled.main`
    display: grid;
    grid-template-columns: ${Variables.Container.Template};
    padding: ${Variables.Container.Padding};
    gap: ${Variables.Margins.L};

    & > * {
        grid-column: ${Variables.Container.Column};
    }

    ${props => !props.full && css`
        margin-left: 300px;
    `}
`

function Wrapper(props) {
    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Page title={props.title}>
            {user.approved ? (
                <>
                    <Nav />

                    <Container>{props.children}</Container>
                </>
            ) : (
                <Container full>
                    <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>

                    <Font.P>
                        Your account is not approved, please contact an admin.
                    </Font.P>

                    <button onClick={logoutUser}>Log out</button>
                </Container>
            )}
        </Page>
    )
}

export default Wrapper
