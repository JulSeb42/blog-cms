// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import Loader from "./Loader"

// Styles
const Container = styled.button``

function Button(props) {
    return (
        <Container
            as={props.to && Link}
            to={props.to}
            disabled={props.isLoading && "disabled"}
            {...props}
        >
            {props.isLoading && <Loader color={Variables.Colors.DarkGray} />}

            {props.children}
        </Container>
    )
}

export default Button
