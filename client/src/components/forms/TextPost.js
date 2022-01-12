// Packages
import React from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import styled from "styled-components"

// Components
import InputContainer from "./InputContainer"
import * as Variables from "../styles/Variables"

// Styles
const Input = styled(ReactQuill)`
    .ql-container {
        height: auto;
        min-height: calc(
            ${Variables.FontSizes.Body} * 10 + ${Variables.FontSizes.Body} *
                ${Variables.LineHeight}
        );

        .ql-editor {
            height: 100%;
            min-height: calc(
                ${Variables.FontSizes.Body} * 10 + ${Variables.FontSizes.Body} *
                    ${Variables.LineHeight}
            );
        }
    }
`

function TextPost(props) {
    return (
        <InputContainer label={props.label} id={props.id}>
            <Input
                theme="snow"
                height={200}
                value={props.value}
                onChange={props.onChange}
            />
        </InputContainer>
    )
}

export default TextPost
