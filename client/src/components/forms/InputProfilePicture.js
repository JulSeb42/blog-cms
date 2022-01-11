// Packages
import React from "react"
import styled from "styled-components"

// Components
import ProfilePicture from "../user/ProfilePicture"
import * as Variables from "../styles/Variables"
import InputContainer from "./InputContainer"
import Icon from "../ui/Icon"

// Styles
const Container = styled.label`
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

const IconContainer = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: ${Variables.Transitions.Short};

    &:hover {
        opacity: 0;
    }
`

function InputProfilePicture(props) {
    return (
        <InputContainer label={props.label} id={props.id}>
            <Container htmlFor={props.id}>
                <ProfilePicture src={props.src} alt={props.alt} size={80} />

                <Input
                    type="file"
                    id={props.id}
                    onChange={props.onChange}
                    {...props}
                />

                <IconContainer>
                    <Icon
                        name="edit"
                        color={Variables.Colors.Primary}
                        size={32}
                    />
                </IconContainer>
            </Container>
        </InputContainer>
    )
}

export default InputProfilePicture