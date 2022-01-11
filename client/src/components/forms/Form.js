// Packages
import React from "react"

// Components
import ButtonsContainer from "./ButtonsContainer"
import Button from "../ui/Button"

function Form(props) {
    const conditionsButtons = props.btnprimary || props.btnreset
    return (
        <form {...props}>
            {props.children}

            {conditionsButtons && (
                <ButtonsContainer>
                    {props.btnprimary && (
                        <Button type="submit" isLoading={props.isLoading}>
                            {props.btnprimary}
                        </Button>
                    )}

                    {props.btncancel && (
                        <Button to={props.btncancel}>Cancel</Button>
                    )}

                    {props.btnreset && (
                        <Button type="reset">{props.btnreset}</Button>
                    )}
                </ButtonsContainer>
            )}
        </form>
    )
}

export default Form
