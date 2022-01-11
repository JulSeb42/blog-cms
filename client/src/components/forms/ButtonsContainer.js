// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    button:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

export default ButtonsContainer
