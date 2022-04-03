// Packages
import React, { useContext } from "react"
import Linkify from "react-linkify"
import {
    Font,
    Grid,
    Variables,
    TitleFlex,
    ButtonIcon,
} from "components-react-julseb"
import { convertDateShort, getToday } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"

const CommentCard = ({ comment }) => {
    // Context
    const { isLoggedIn, user } = useContext(AuthContext)

    // Components
    const TitleContent = () => {
        return (
            <Grid gap={Variables.Spacers.XXS}>
                <Font.H4>{comment.poster}</Font.H4>

                <Font.Small style={{ color: Variables.Colors.Gray500 }}>
                    Posted{" "}
                    {comment.date !== getToday() &&
                        `on ${convertDateShort(comment.date)}`}{" "}
                    at {comment.time}
                </Font.Small>
            </Grid>
        )
    }

    return (
        <Grid gap={Variables.Spacers.S}>
            {(isLoggedIn && user.role === "admin") ||
            (isLoggedIn && user.role === "moderator") ? (
                <TitleFlex>
                    <TitleContent />

                    <ButtonIcon
                        btnStyle="transparent"
                        color="primary"
                        icon="trash"
                        size={32}
                    />
                </TitleFlex>
            ) : (
                <TitleContent />
            )}

            <Font.P>
                <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                            {decoratedText}
                        </a>
                    )}
                >
                    {comment.body}
                </Linkify>
            </Font.P>
        </Grid>
    )
}

export default CommentCard
