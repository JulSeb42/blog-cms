// Packages
import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import Icon from "../ui/Icon"

// Utils
import convertDate from "../utils/convertDate"

// Styles
const Container = styled.div``

const TextContainer = styled.div``

const IconsContainer = styled.div``

function CardPost({ post, ...props }) {
    return (
        <Container>
            <TextContainer>
                <Font.P>
                    <Link to={`/dashboard/posts/${post._id}`}>
                        {post.title}
                    </Link>
                </Font.P>

                <Font.Label>
                    Written by <strong>{post.author.fullName}</strong>{" "}
                    on {convertDate(post.date)} at {post.time}.
                </Font.Label>
            </TextContainer>

            <IconsContainer>
                <Link to={`/posts/${post.category}/${post.slug}`}>
                    <Icon name="file" size={16} color="currentColor" />
                </Link>

                <Link to={`/dashboard/posts/${post._id}`}>
                    <Icon name="edit" size={16} color="currentColor" />
                </Link>
            </IconsContainer>
        </Container>
    )
}

export default CardPost
