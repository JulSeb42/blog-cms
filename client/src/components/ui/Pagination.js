// Packages
import styled from "styled-components"

// Components
import * as Variables from "../styles/Variables"

// Styles
export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button:not(:last-child) {
        margin-right: ${Variables.Margins.XS};
    }
`

export const PaginationButton = styled.button`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    border: none;
    background-color: transparent;
    font-family: ${Variables.FontFamily};
    font-size: ${Variables.FontSizes.Body};
    font-weight: ${Variables.FontWeights.Bold};
    color: ${Variables.Colors.Black};
    transition: ${Variables.Transitions.Short};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
        background-color: ${Variables.Colors.Primary};
        color: ${Variables.Colors.White};
    }

    &:hover {
        background-color: ${Variables.Colors.Primary70};
        color: ${Variables.Colors.White};
    }

    &:disabled {
        cursor: not-allowed;
        color: ${Variables.Colors.DarkGray};

        &:hover {
            background-color: transparent;
            color: ${Variables.Colors.DarkGray};
        }
    }
`
