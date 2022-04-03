// Packages
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { Variables, Flexbox, Font, ButtonIcon, Badge } from "components-react-julseb"

// Styles
const Container = styled(Flexbox)`
    ${props =>
        !props.last &&
        css`
            border-bottom: 1px solid ${Variables.Colors.Gray200};
            padding-bottom: ${Variables.Spacers.M};
        `}
`

const CardPage = ({ page, last }) => {
    return (
        <Container gap={Variables.Spacers.XS} align="center" last={last}>
            <Flexbox align="center" style={{ height: 24 }}>
                <Badge size={8} color={page.draft ? "warning" : "success"} />
            </Flexbox>
            
            <Font.P style={{ flexGrow: 1 }}>
                <Link to={`/dashboard/pages/${page._id}`}>{page.title}</Link>
            </Font.P>

            <Flexbox gap={Variables.Spacers.XXS}>
                <ButtonIcon
                    to={`/${page.slug}`}
                    icon="file"
                    size={32}
                    btnStyle="transparent"
                    aria-label="Read page"
                    target="_blank"
                    rel="noreferrer noopener"
                    hoverBackground
                />

                <ButtonIcon
                    to={`/dashboard/pages/${page._id}`}
                    icon="edit"
                    size={32}
                    btnStyle="transparent"
                    aria-label="Edit post"
                    hoverBackground
                />
            </Flexbox>
        </Container>
    )
}

export default CardPage
