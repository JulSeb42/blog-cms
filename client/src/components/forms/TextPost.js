// Packages
import React, { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

// Components
import InputContainer from "./InputContainer"

function TextPost(props) {
    return (
        <InputContainer label={props.label} id={props.id}>
            <ReactQuill theme="snow" value={props.value} onChange={props.onChange} />
        </InputContainer>
    )
}

export default TextPost
