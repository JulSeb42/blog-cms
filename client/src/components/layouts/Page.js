// Packages
import React, { useContext } from "react"
import { PageLoading } from "components-react-julseb"

// API
import { GlobalContext } from "../../context/globalData"

// Components
import Header from "./Header"
import Helmet from "./Helmet"
import Footer from "./Footer"

const Page = props => {
    const { isGlobalLoading } = useContext(GlobalContext)

    return (
        <>
            <Helmet
                title={props.title}
                description={props.description}
                keywords={props.keywords}
                cover={props.cover}
            />

            {isGlobalLoading ? (
                <PageLoading />
            ) : props.isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Header background={props.headerBackground} />

                    {props.children}

                    <Footer isLoading={props.isLoading} />
                </>
            )}
        </>
    )
}

export default Page
