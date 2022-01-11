// Packages
import React from "react"

function CheckInputs(props) {
    return (
        <div>
            <input id={props.id} name={props.name} {...props} />

            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default CheckInputs
