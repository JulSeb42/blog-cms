// Colors
export const Colors = {
    Primary: "#00ABE1",
    Primary70: "#61D9FF",
    Primary10: "#E5F9FF",
    Secondary: "#161F6D",
    Secondary70: "#2F40D5",
    Secondary10: "#EAECFB",
    Success: "#62C370",
    Success70: "#BDE6C3",
    Success10: "#EDF8EE",
    Danger: "#BB0A21",
    Danger70: "#F65166",
    Danger10: "#FEE7EA",
    Warning: "#F45D01",
    Warning70: "#FEAA76",
    Warning10: "#FFEFE6",
    Black: "#040F16",
    DarkGray: "#565254",
    Gray: "#969194",
    LightGray: "#E6E5E5",
    White: "#FFFFFF",
}

// Margins
export const Margins = {
    XXL: "48px",
    XL: "32px",
    L: "24px",
    M: "16px",
    S: "12px",
    XS: "8px",
    XXS: "4px",
}

// Font family
export const FontFamily = "'Lato', sans-serif"

// Font weights
export const FontWeights = {
    Regular: 400,
    Semibold: 700,
    Bold: 900,
}

// Font sizes
export const FontSizes = {
    TitleDisplay: "64px",
    TitleLarge: "32px",
    TitleMedium: "24px",
    TitleSmall: "20px",
    Body: "16px",
    Label: "14px",
}

// Line height
export const LineHeight = 1.5

// Radii
export const Radiuses = {
    XL: "16px",
    L: "12px",
    M: "8px",
    S: "4px",
    Round: "99em",
}

// Container template
export const Container = {
    Template: "1fr 600px 1fr",
    Column: 2,
    Padding: `${Margins.XXL} 0`,

    TemplateTablet: "5vw 1fr 5vw",
}

// Transitions
export const Transitions = {
    Short: "all .2s ease",
    Long: "all .5s ease",
}

// Media queries
const DevicesSizes = {
    Mobile: "600px",
    Tablet: "768px",
}

export const Breakpoints = {
    MobileL: `(max-width: ${DevicesSizes.MobileL})`,
}
