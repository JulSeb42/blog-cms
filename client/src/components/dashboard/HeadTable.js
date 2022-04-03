// Packages
import styled from "styled-components"
import { Grid, Variables } from "components-react-julseb"

// Styles
const HeadTable = styled(Grid)`
    background-color: ${Variables.Colors.Gray50};
    padding-bottom: 0 !important;
    border-bottom: none !important;

    & > * {
        padding: ${Variables.Spacers.XS};
    }
`

export default HeadTable
