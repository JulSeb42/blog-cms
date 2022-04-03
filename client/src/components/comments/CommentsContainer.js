// Packages
import React from "react"
import styled from "styled-components"
import { Font, Grid, Variables } from "components-react-julseb"

// Components
import CommentCard from "./CommentCard"
import CommentForm from "./CommentForm"

// Styles
const List = styled(Grid)`
    & > div:not(:last-child) {
        border-bottom: 1px solid ${Variables.Colors.Gray100};
        padding-bottom: ${Variables.Spacers.S};
    }
`

const CommentsContainer = props => {
    return (
        <>
            <Font.H2>Comments</Font.H2>

            {props.comments.length > 0 ? (
                <List gap={Variables.Spacers.S}>
                    {props.comments
                        .sort((a, b) => {
                            if (a.date === b.date) {
                                return b.time.localeCompare(a.time)
                            }

                            return new Date(b.date) - new Date(a.date)
                        })
                        .map(comment => (
                            <CommentCard comment={comment} key={comment._id} />
                        ))}
                </List>
            ) : (
                <Font.P>No comment yet.</Font.P>
            )}

            <CommentForm post={props.post} />
        </>
    )
}

export default CommentsContainer
