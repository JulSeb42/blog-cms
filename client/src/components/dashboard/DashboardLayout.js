// Packages
import React, { useContext } from "react"
import {
    Button,
    Font,
    Wrapper,
    Main,
    PageLoading,
} from "components-react-julseb"
import { getFirstName } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"
import { GlobalContext } from "../../context/globalData"

// Components
import Helmet from "../layouts/Helmet"
import NavDashboard from "./NavDashboard"

const DashboardLayout = props => {
    const { user, logoutUser } = useContext(AuthContext)
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
                    {user.approved ? (
                        <>
                            <NavDashboard />

                            <Wrapper
                                style={{ paddingLeft: 250 }}
                                template={props.template}
                            >
                                <Main template={props.template}>
                                    {props.children}
                                </Main>
                            </Wrapper>
                        </>
                    ) : (
                        <Wrapper>
                            <Main>
                                <Font.H1>
                                    Hello {getFirstName(user.fullName)}
                                </Font.H1>

                                <Font.P>
                                    Your account is not approved, please contact
                                    an admin.
                                </Font.P>

                                <Button onClick={logoutUser} justify="start">
                                    Log out
                                </Button>
                            </Main>
                        </Wrapper>
                    )}
                </>
            )}
        </>
    )
}

export default DashboardLayout
