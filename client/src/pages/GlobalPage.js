// Packages
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Font, Main, MarkdownContainer } from "components-react-julseb"

// API
import pageService from "../api/page.service"

// Components
import Page from "../components/layouts/Page"
import WrapperBackground from "../components/layouts/WrapperBackground"
import ContactForm from "../components/ContactForm"

// Utils
import markdownConfig from "../config/markdownConfig"

// Data
import siteData from "../data/siteData"

const GlobalPage = () => {
    const { slug } = useParams()

    // Get page data
    const [page, setPage] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        pageService
            .pageSlug(slug)
            .then(res => {
                setPage(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [slug])

    return (
        <Page
            title={isLoading ? "Page" : page.title}
            headerBackground
            isLoading={isLoading}
        >
            {!isLoading && (
                <WrapperBackground
                    template={
                        !isLoading && page._id === siteData.contactId && "form"
                    }
                >
                    <Main>
                        <Font.H1>{page.title}</Font.H1>

                        <MarkdownContainer options={markdownConfig}>
                            {page.body}
                        </MarkdownContainer>

                        {page._id === siteData.contactId && <ContactForm />}
                    </Main>
                </WrapperBackground>
            )}
        </Page>
    )
}

export default GlobalPage
