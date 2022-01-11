// Packages
import React from "react"

function InputContainer(props) {
    return (
        <div>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}

            {props.children}
        </div>
    )
}

export default InputContainer
