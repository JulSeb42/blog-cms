// Packages
import React from "react"
import styled from "styled-components"
import Link from "../utils/LinkScroll"

// Components
import * as Font from "../styles/Font"
import * as Variables from "../styles/Variables"
import Icon from "../ui/Icon"

// Utils
import convertDate from "../utils/convertDate"

// Styles
const Container = styled.div`
    padding-bottom: ${Variables.Margins.M};
    display: flex;
    align-items: ${props => (props.globalPages ? "center" : "flex-start")};
`

const TextContainer = styled.div`
    flex-grow: 1;
    margin-right: ${Variables.Margins.S};
    display: grid;
    grid-template-columns: 1fr;
    gap: ${Variables.Margins.XS};

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

const IconsContainer = styled.div`
    display: flex;
    align-items: center;

    a:first-child {
        margin-right: ${Variables.Margins.XXS};
    }
`

const IconButton = styled(Link)`
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${Variables.Colors.Primary};
    transition: ${Variables.Transitions.Short};

    &:hover {
        background-color: ${Variables.Colors.LightGray};
        color: ${Variables.Colors.Primary70};
    }
`

function CardPost({ post, ...props }) {
    return (
        <Container globalPages={props.globalPages}>
            <TextContainer>
                <Font.P>
                    <Link
                        to={
                            props.globalPages
                                ? `/dashboard/pages/${post._id}`
                                : `/dashboard/posts/${post._id}`
                        }
                    >
                        {post.title}
                    </Link>
                </Font.P>

                {!props.globalPages && (
                    <>
                        <Font.Label as="small">
                            Written by <strong>{post.author.fullName}</strong>{" "}
                            on {convertDate(post.date)} at {post.time}.
                        </Font.Label>

                        {post.dateEdited && (
                            <Font.Label as="small">
                                Edited on {convertDate(post.dateEdited)} at{" "}
                                {post.timeEdited}
                            </Font.Label>
                        )}
                    </>
                )}
            </TextContainer>

            <IconsContainer>
                <IconButton
                    to={
                        props.globalPages
                            ? `/${post.slug}`
                            : `/posts/${post.category}/${post.slug}`
                    }
                    aria-label="Read post"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <Icon name="file" size={24} color="currentColor" />
                </IconButton>

                <IconButton
                    to={
                        props.globalPages
                            ? `/dashboard/pages/${post._id}`
                            : `/dashboard/posts/${post._id}`
                    }
                    aria-label="Edit post"
                >
                    <Icon name="edit" size={24} color="currentColor" />
                </IconButton>
            </IconsContainer>
        </Container>
    )
}

export default CardPost
