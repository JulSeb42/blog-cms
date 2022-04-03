// Packages
import React from "react"
import { Grid, Variables } from "components-react-julseb"

const Article = ({ children }) => {
    return (
        <Grid as="article" gap={Variables.Spacers.M}>
            {children}
        </Grid>
    )
}

export default Article
