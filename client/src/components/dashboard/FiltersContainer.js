// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Variables.Margins.S};

    @media ${Variables.Breakpoints.Mobile} {
        grid-template-columns: repeat(1, 1fr);
    }
`

export default FiltersContainer
