// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 600px 200px 1fr;
    gap: ${Variables.Margins.XXL};
`

export const Content = styled.main`
    grid-column: 2;
`
