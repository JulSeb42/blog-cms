// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import ButtonsContainer from "./ButtonsContainer"
import Button from "../ui/Button"

// Styles
const Container = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.M};
`

function Form(props) {
    const conditionsButtons = props.btnprimary || props.btnreset
    return (
        <Container {...props}>
            {props.children}

            {conditionsButtons && (
                <ButtonsContainer>
                    {props.btnprimary && (
                        <Button
                            type="submit"
                            btnstyle="primary"
                            isLoading={props.isLoading}
                        >
                            {props.btnprimary}
                        </Button>
                    )}

                    {props.btncancel && (
                        <Button to={props.btncancel} btnstyle="secondary">
                            Cancel
                        </Button>
                    )}

                    {props.btnreset && (
                        <Button type="reset">{props.btnreset}</Button>
                    )}
                </ButtonsContainer>
            )}
        </Container>
    )
}

export default Form
