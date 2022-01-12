// Packages
import React, { useState } from "react"
import styled, { css } from "styled-components"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import InputContainer from "./InputContainer"
import Icon from "../ui/Icon"

// Styles
const InputStyled = styled.input`
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.S};
    padding: ${Variables.Margins.XXS} ${Variables.Margins.XS};
    font-family: ${Variables.FontFamily};
    font-size: ${Variables.FontSizes.Body};
    width: 100%;
    outline: none;

    &:focus {
        border-color: ${Variables.Colors.Primary};
    }

    &:disabled {
        background-color: ${Variables.Colors.LightGray};
        color: ${Variables.Colors.DarkGray};
        cursor: not-allowed;
    }

    ${props =>
        props.inputtype === "textarea" &&
        css`
            min-height: 200px;

            ${props =>
                props.counter &&
                css`
                    min-height: calc(
                        2 * ${Variables.FontSizes.Body} +
                            ${Variables.LineHeight} *
                            ${Variables.FontSizes.Body} +
                            ${Variables.Margins.XXS} * 2
                    );
                `}
        `}
`

const Password = styled.div`
    position: relative;
`

const Button = styled.button`
    height: 29px;
    border: none;
    background: none;
    color: ${Variables.Colors.Primary};
    transition: ${Variables.Transitions.Short};
    position: absolute;
    top: 0;
    right: ${Variables.Margins.XS};
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
        color: ${Variables.Colors.Primary70};
    }
`

const Validation = styled(Font.Label)`
    display: flex;
    align-items: center;

    & > span {
        margin-right: ${Variables.Margins.XXS};
    }
`

function Input(props) {
    const [isVisible, setIsVisible] = useState(false)
    const visible = isVisible ? "text" : "password"

    return (
        <InputContainer label={props.label} id={props.id}>
            {props.inputtype === "password" ? (
                <>
                    <Password>
                        <InputStyled
                            id={props.id}
                            name={props.name || props.id}
                            type={visible}
                            {...props}
                        />

                        <Button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            aria-label="Show / hide password"
                        >
                            <Icon
                                name={isVisible ? "show" : "show-slash"}
                                size={24}
                                color="currentColor"
                            />
                        </Button>
                    </Password>

                    {props.value.length > 0 && (
                        <Validation>
                            <Icon
                                name={
                                    props.value.length < 6
                                        ? "close-circle"
                                        : "check-circle"
                                }
                                color={
                                    props.value.length < 6
                                        ? Variables.Colors.Danger
                                        : Variables.Colors.Success
                                }
                                size={14}
                            />
                            Your password must be at least 6 characters long
                        </Validation>
                    )}
                </>
            ) : props.inputtype === "textarea" ? (
                <>
                    <InputStyled
                        as="textarea"
                        id={props.id}
                        name={props.name || props.id}
                        maxLength={props.counter && props.counter}
                        {...props}
                    />

                    {props.counter && (
                        <Font.Label>
                            {props.value.length}/{props.counter}
                        </Font.Label>
                    )}
                </>
            ) : (
                <InputStyled
                    id={props.id}
                    name={props.name || props.id}
                    {...props}
                />
            )}

            {props.helper && <Font.Label>{props.helper}</Font.Label>}
        </InputContainer>
    )
}

export default Input
