// Packages
import React from "react"
import MDEditor from "@uiw/react-md-editor"

// Components
import InputContainer from "./InputContainer"

function TextPost(props) {
    return (
        <InputContainer label={props.label} id={props.id}>
            <MDEditor value={props.value} onChange={props.onChange} />
        </InputContainer>
    )
}

export default TextPost
