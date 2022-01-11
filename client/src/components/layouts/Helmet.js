// Packages
import React, { useState, useEffect } from "react"
import { Helmet as HelmetMeta } from "react-helmet"
import axios from "axios"

// Data
import SiteData from "../data/SiteData"
import GlobalData from "../data/GlobalData"

function Helmet(props) {
    // Get meta from backend
    const [globalData, setGlobalData] = useState({})

    useEffect(() => {
        axios
            .get("/global/global")
            .then(res => {
                setGlobalData(res.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <HelmetMeta>
            <title>
                {`${props.title} | ${
                    GlobalData() !== undefined ? GlobalData().name : "Site name"
                }`}
            </title>
            <link rel="icon" href={globalData.favicon} />
            <meta content="IE=edge" http-equiv="X-UA-Compatible" />
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta
                name="description"
                content={
                    props.description
                        ? props.description
                        : GlobalData().metaDescription
                }
            />
            <meta
                name="keywords"
                content={`${props.keywords}, ${GlobalData().keywords}`}
            />
            <meta name="author" content={SiteData.Author} />
            <meta property="og:title" content={props.title} />
            <meta property="og:type" content={SiteData.Type} />
            <meta property="og:image" content={SiteData.Cover} />
            <meta property="og:site_name" content={SiteData.Title} />
            <meta property="og:locale" content={SiteData.Language} />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
                rel="stylesheet"
            />
        </HelmetMeta>
    )
}

export default Helmet
