// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import ProfilePicture from "./ProfilePicture"

// Utils
import getFirstName from "../utils/getFirstName"

// Styles
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${props =>
        props.dashboard ? Variables.Margins.M : Variables.Margins.XXS};
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;

    img {
        margin-right: ${props =>
            props.dashboard ? Variables.Margins.S : Variables.Margins.XXS};
    }
`

function UserCard({ user, ...props }) {
    return (
        <Container {...props}>
            <TitleContainer dashboard={props.dashboard}>
                <ProfilePicture
                    src={user.imageUrl}
                    alt={user.fullName}
                    size={props.dashboard ? 64 : 48}
                />

                {props.dashboard ? (
                    <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>
                ) : (
                    <Font.H4>{user.fullName}</Font.H4>
                )}
            </TitleContainer>

            {user.bio && <Font.P>{user.bio}</Font.P>}

            <Font.P>
                <Link to={`/authors/${user.id}`}>
                    Check {props.dashboard ? "your" : "their"} profile.
                </Link>
            </Font.P>
        </Container>
    )
}

export default UserCard
