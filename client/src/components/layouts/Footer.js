// Packages
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Font, Variables } from "components-react-julseb"

// API
import pageService from "../../api/page.service"

// Data
import siteData from "../../data/siteData"

// Styles
const Container = styled.footer`
    width: 100%;
    background-color: ${Variables.Colors.Primary500};
    color: ${Variables.Colors.White};
    padding: ${Variables.Spacers.L} 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LinksContainer = styled.div`
    display: flex;
    align-items: center;

    a {
        color: ${Variables.Colors.White};
        font-weight: ${Variables.FontWeights.Bold};
        text-decoration: none;
        transition: ${Variables.Transitions.Short};

        &:hover {
            color: ${Variables.Colors.Secondary500};
        }

        &:not(:last-child) {
            margin-right: ${Variables.Spacers.M};
        }
    }
`

const Footer = () => {
    // Get pages from db
    const [publishedPages, setPublishedPages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        pageService
            .publishedPages()
            .then(res => {
                setPublishedPages(
                    res.data
                        .filter(page => page.footer)
                        .sort((a, b) => a.orderFooter - b.orderFooter)
                )
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <LinksContainer>
                {!isLoading &&
                    publishedPages.map(page => (
                        <Link to={`/${page.slug}`} key={page._id}>
                            {page.title}
                        </Link>
                    ))}
            </LinksContainer>

            <Font.P>
                &copy; {siteData.author} | {siteData.year}
            </Font.P>
        </Container>
    )
}

export default Footer
