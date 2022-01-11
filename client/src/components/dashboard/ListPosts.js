// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
const ListPosts = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.M};

    & > div:not(:last-child) {
        border-bottom: 1px solid ${Variables.Colors.LightGray};
    }
`

export default ListPosts