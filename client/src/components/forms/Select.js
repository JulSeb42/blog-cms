// Packages
import React from "react"
import styled, { css } from "styled-components"

// Components
import * as Variables from "../styles/Variables"
import InputContainer from "./InputContainer"
import { IconMixin } from "../ui/Icon"

// Styles
const Container = styled.div`
    position: relative;
    width: 100%;

    &:after {
        ${IconMixin({
            icon: "chevron-down",
            size: 12,
            color: Variables.Colors.Primary,
        })}
        position: absolute;
        z-index: 1;
        top: calc(50% - 12px / 2);
        right: ${Variables.Margins.XS};
    }

    ${props =>
        props.disabled &&
        css`
            &:after {
                ${IconMixin({
                    icon: "chevron-down",
                    size: 12,
                    color: Variables.Colors.DarkGray,
                })}
            }
        `}
`

const Input = styled.select`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.S};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
    font-family: ${Variables.FontFamily};
    font-size: ${Variables.FontSizes.Body};
    width: 100%;
    outline: none;
    appearance: none;
    z-index: 0;
    cursor: pointer;

    &::-ms-expand {
        display: none;
    }

    &:focus {
        border-color: ${Variables.Colors.Primary};
    }

    &:disabled {
        cursor: not-allowed;
        color: ${Variables.Colors.DarkGray};
    }
`

function Select(props) {
    return (
        <InputContainer label={props.label} id={props.id}>
            <Container {...props}>
                <Input
                    disabled={props.disabled}
                    defaultValue={props.defaultValue}
                >
                    {props.children}
                </Input>
            </Container>
        </InputContainer>
    )
}

export default Select
