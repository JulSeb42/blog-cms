// Packages
import React from "react"
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import AsyncImage from "../utils/AsyncImage"

// Styles
const Container = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;

    &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        background: ${Variables.Colors.OverlayWhite};
    }
`

const Image = styled(AsyncImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
`

const Content = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: ${Variables.Margins.XXL} 5vw;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    flex-direction: column;

    h1 {
        margin-bottom: ${Variables.Margins.S};
    }
`

function Cover(props) {
    return (
        <Container>
            <Image src={props.src} alt={props.alt} />

            <Content>{props.children}</Content>
        </Container>
    )
}

export default Cover
