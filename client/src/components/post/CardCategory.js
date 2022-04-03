// Packages
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Variables } from "components-react-julseb"

// Styles
const CardCategory = styled(Link)`
    color: ${Variables.Colors.Black};
    text-decoration: none;
    padding: ${Variables.Spacers.XS};
    background-color: ${Variables.Colors.White};
    box-shadow: ${Variables.Shadows.S};
    border-radius: ${Variables.Radiuses.M};
    transition: ${Variables.Transitions.Short};
    font-weight: ${Variables.FontWeights.Bold};

    span {
        font-weight: ${Variables.FontWeights.Regular};
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: ${Variables.Shadows.M};
    }
`

export default CardCategory
