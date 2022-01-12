// Packages
import React from "react"
import styled from "styled-components"

// Components
import AsyncImage from "../utils/AsyncImage"

// Styles
const Image = styled(AsyncImage)`
    width: 100%;
    height: 20vw;
    object-fit: cover;
`

function ImageCover(props) {
    return <Image src={props.src} alt={props.alt} {...props} />
}

export default ImageCover
