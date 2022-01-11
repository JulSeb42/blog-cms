// Packages
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

// Components
import { AuthProviderWrapper } from "./context/auth"
import App from "./App"

// Styles
import "./index.css"

ReactDOM.render(
    <AuthProviderWrapper>
        <Router>
            <App />
        </Router>
    </AuthProviderWrapper>,
    document.getElementById("root")
)
