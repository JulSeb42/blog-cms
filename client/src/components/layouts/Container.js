// Packages
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr ${props =>
            props.noaside ? "600px" : "600px 200px"} 1fr;
    gap: ${Variables.Margins.XXL};
    min-height: 100vh;

    ${props =>
        props.padding &&
        css`
            padding: ${Variables.Margins.XXL} 0;
        `}

    ${props =>
        props.header &&
        css`
            margin-top: 72px;
        `}
    
    @media ${Variables.Breakpoints.Tablet} {
        grid-template-columns: 5vw 1fr 5vw;
        gap: ${Variables.Margins.L};
        margin-bottom: ${Variables.Margins.XXL};

        & > * {
            grid-column: 2 !important;
        }
    }
`

export const Content = styled.main`
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.L};
    margin-bottom: ${Variables.Margins.XXL};
    align-content: start;

    @media ${Variables.Breakpoints.Tablet} {
        margin-bottom: 0;
    }
`

export const Article = styled.article`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.M};
`
