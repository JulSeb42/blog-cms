// Packages
import React from "react"
import styled from "styled-components"
import { Image, Variables, Flexbox } from "components-react-julseb"

// Styles
const Container = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;

    &:after {
        content: "";
        width: 100%;
        height: 100%;
        z-index: 1;
        background: ${Variables.Overlays.Gradient.Black};
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
`

const Img = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
`

const Content = styled(Flexbox)`
    position: relative;
    z-index: 2;
    padding: ${Variables.Spacers.XXL} 5vw;
    width: 100%;
    height: 100%;
    color: ${Variables.Colors.White};
`

const Cover = props => {
    return (
        <Container>
            <Img
                src={props.src}
                alt={props.alt}
                width="100%"
                height="100%"
                fit="cover"
            />

            <Content
                direction="column"
                align="flex-start"
                justify="flex-end"
                gap={Variables.Spacers.S}
            >
                {props.children}
            </Content>
        </Container>
    )
}

export default Cover
