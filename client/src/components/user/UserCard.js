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
        props.dashboard || props.detail
            ? Variables.Margins.M
            : Variables.Margins.XXS};
    border: 1px solid ${Variables.Colors.LightGray};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Margins.M};
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;

    img {
        margin-right: ${props =>
            props.dashboard || props.detail
                ? Variables.Margins.S
                : Variables.Margins.XXS};
    }
`

function UserCard({ user, ...props }) {
    return (
        <Container {...props}>
            <TitleContainer dashboard={props.dashboard} detail={props.detail}>
                <ProfilePicture
                    src={user.imageUrl}
                    alt={user.fullName}
                    size={props.dashboard || props.detail ? 64 : 48}
                />

                {props.dashboard ? (
                    <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>
                ) : props.detail ? (
                    <Font.H1>{user.fullName}</Font.H1>
                ) : (
                    <Font.H4>{user.fullName}</Font.H4>
                )}
            </TitleContainer>

            {user.bio && <Font.P>{user.bio}</Font.P>}

            {!props.detail && (
                <Font.P>
                    <Link
                        to={`/authors/${user.fullName
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                    >
                        Check {props.dashboard ? "your" : "their"} profile.
                    </Link>
                </Font.P>
            )}
        </Container>
    )
}

export default UserCard
