// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const ListPosts = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols || 2}, 1fr);
    gap: ${Variables.Margins.L};

    @media ${Variables.Breakpoints.Mobile} {
        grid-template-columns: repeat(${props => props.colsMobile || 1}, 1fr);
    }
`

export default ListPosts
