// Packages
import React from "react"

function Toggle(props) {
    return (
        <div>
            <input id={props.id} name={props.name} type="checkbox" {...props} />

            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default Toggle