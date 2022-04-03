// Packages
import React, { useContext } from "react"
import { Wrapper, Main, Button, PageLoading } from "components-react-julseb"

// API
import { GlobalContext } from "../../context/globalData"

// Components
import Helmet from "../layouts/Helmet"

const AuthLayout = props => {
    const { isGlobalLoading } = useContext(GlobalContext)

    return (
        <>
            <Helmet
                title={props.title}
                description={props.description}
                keywords={props.keywords}
                cover={props.cover}
            />

            {isGlobalLoading || props.isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Wrapper template="form">
                        <Main template="form">
                            <Button
                                to="/"
                                iconLeft="chevron-left"
                                btnStyle="text"
                                justify="start"
                                noPadding
                            >
                                Back to site
                            </Button>

                            {props.children}
                        </Main>
                    </Wrapper>
                </>
            )}
        </>
    )
}

export default AuthLayout
