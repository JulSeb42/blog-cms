// Packages
import React from "react"
import styled from "styled-components"

// Components
import AsyncImage from "../utils/AsyncImage"

// Styles
const Image = styled(AsyncImage)`
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: 50%;
    display: inline;
    object-fit: cover;
`

function ProfilePicture(props) {
    return (
        <Image
            src={props.src}
            alt={props.alt}
            size={props.size || 150}
            {...props}
        />
    )
}

export default ProfilePicture
