// Packages
import React, { useContext } from "react"
import { Helmet as HelmetMeta } from "components-react-julseb"

// API
import { GlobalContext } from "../../context/globalData"

const Helmet = props => {
    const { globalData, isGlobalLoading } = useContext(GlobalContext)

    return (
        !isGlobalLoading && (
            <HelmetMeta
                title={`${props.title} | ${globalData.name}`}
                description={props.description}
                keywords={[globalData.keywords, props.keywords]}
                siteName={globalData.name}
                favicon={globalData.favicon}
                author={globalData.author}
                type={globalData.type}
                cover={props.cover || globalData.cover}
                language={globalData.language}
            />
        )
    )
}

export default Helmet
