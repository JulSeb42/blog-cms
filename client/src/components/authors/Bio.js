// Packages
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Avatar, Flexbox, Grid, Variables, Font } from "components-react-julseb"
import { slugify, getFirstName } from "js-utils-julseb"

// Styles
const Container = styled(Grid)`
    border: 1px solid ${Variables.Colors.Gray100};
    border-radius: ${Variables.Radiuses.M};
    padding: ${Variables.Spacers.S};
`

const Picture = styled(Avatar)`
    margin-right: ${Variables.Spacers.XS};
`

const Bio = ({ author, ...props }) => {
    return (
        <Container gap={Variables.Spacers.XS}>
            <Flexbox align="center">
                <Picture
                    src={author.imageUrl}
                    alt={author.fullName}
                    size={props.post ? 48 : 64}
                />

                {props.post ? (
                    <Font.H2 as="h4">{author.fullName}</Font.H2>
                ) : (
                    <Font.H1>
                        {props.dashboard && "Hello "}
                        {props.dashboard
                            ? getFirstName(author.fullName)
                            : author.fullName}
                    </Font.H1>
                )}
            </Flexbox>

            <Font.P>{author.bio}</Font.P>

            {(props.post || props.dashboard) && (
                <Font.P>
                    <Link
                        to={`/authors/${slugify(author.fullName)}-${
                            author._id
                        }`}
                    >
                        Check {props.post ? "their" : "your"} profile
                    </Link>
                </Font.P>
            )}
        </Container>
    )
}

export default Bio
