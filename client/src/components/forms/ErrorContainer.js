// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import * as Font from "../styles/Font"

const ErrorContainer = styled(Font.P)`
    background-color: ${Variables.Colors.Danger10};
    border: 1px solid ${Variables.Colors.Danger};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
`

export default ErrorContainer
