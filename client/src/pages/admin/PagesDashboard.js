// Packages
import React, { useState, useEffect } from "react"
import axios from "axios"

// Components
import Wrapper from "../../components/dashboard/Wrapper"
import * as Font from "../../components/styles/Font"
import ListPosts from "../../components/dashboard/ListPosts"
import TitleFlex from "../../components/ui/TitleFlex"
import Button from "../../components/ui/Button"
import CardPost from "../../components/dashboard/CardPost"

function PagesDashboard() {
    const [allPages, setAllPages] = useState([])

    useEffect(() => {
        axios
            .get("/pages/pages")
            .then(res => setAllPages(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Wrapper title="Pages">
            <TitleFlex>
                <Font.H1>Pages</Font.H1>

                <Button to="/dashboard/pages/new-page" btnstyle="primary">
                    Add a new page
                </Button>
            </TitleFlex>

            <ListPosts>
                {allPages.length > 0 ? (
                    allPages.map(page => (
                        <CardPost globalPages post={page} key={page._id} />
                    ))
                ) : (
                    <Font.P>No pages yet.</Font.P>
                )}
            </ListPosts>
        </Wrapper>
    )
}

export default PagesDashboard
