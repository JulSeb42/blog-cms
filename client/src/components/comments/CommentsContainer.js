// Packages
import React from "react"
// Components
import * as Font from "../styles/Font"
import FormComment from "./FormComments"
import ListComments from "./ListComments"
import Comment from "./Comment"

function CommentsContainer(props) {
    return (
        <>
            <Font.H4>Comments</Font.H4>

            {props.comments.length > 0 ? (
                <ListComments>
                    {props.comments
                        .sort((a, b) => {
                            if (a.date === b.date) {
                                return b.time.localeCompare(a.time)
                            }

                            return new Date(b.date) - new Date(a.date)
                        })
                        .map(comment => (
                            <Comment comment={comment} key={comment._id} />
                        ))}
                </ListComments>
            ) : (
                <Font.P>No comment yet.</Font.P>
            )}

            <FormComment postId={props.postId} />
        </>
    )
}

export default CommentsContainer
