// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const ListComments = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.S};

    & > div:not(:last-child) {
        border-bottom: 1px solid ${Variables.Colors.LightGray};
        padding-bottom: ${Variables.Margins.S};
    }
`

export default ListComments
