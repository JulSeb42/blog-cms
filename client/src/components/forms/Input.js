// Packages
import React, { useState } from "react"

// Components
import * as Font from "../styles/Font"
import InputContainer from "./InputContainer"

function Input(props) {
    const [isVisible, setIsVisible] = useState(false)
    const visible = isVisible ? "text" : "password"

    return (
        <InputContainer label={props.label} id={props.id}>
            {props.inputtype === "password" ? (
                <div>
                    <input
                        id={props.id}
                        name={props.name || props.id}
                        type={visible}
                        {...props}
                    />

                    <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {isVisible ? "Hide" : "Show"} password
                    </button>
                </div>
            ) : props.inputtype === "textarea" ? (
                <textarea
                    id={props.id}
                    name={props.name || props.id}
                    {...props}
                />
            ) : (
                <input id={props.id} name={props.name || props.id} {...props} />
            )}

            {props.helper && <Font.Label>{props.helper}</Font.Label>}
        </InputContainer>
    )
}

export default Input
