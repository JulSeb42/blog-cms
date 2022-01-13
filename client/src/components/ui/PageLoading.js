// Packages
import React from "react"
import styled, { keyframes } from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const Rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${Variables.Colors.Primary};
    display: flex;
    align-items: center;
    justify-content: center;
`

const Loader = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid ${Variables.Colors.White};
    border-bottom-color: ${Variables.Colors.Danger};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${Rotation} 1s linear infinite;
`

function PageLoading() {
    return (
        <Container>
            <Loader />
        </Container>
    )
}

export default PageLoading
