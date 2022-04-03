// Packages
import React, { useState } from "react"
import styled, { css } from "styled-components"
import {
    Grid,
    InputCheck,
    Font,
    Variables,
    Input,
} from "components-react-julseb"

// API
import pageService from "../../api/page.service"

// Styles
const Container = styled(Grid)`
    align-items: center;

    & > * {
        padding: ${Variables.Spacers.XS};
    }

    ${props =>
        !props.last &&
        css`
            border-bottom: 1px solid ${Variables.Colors.Gray200};
            padding-bottom: ${Variables.Spacers.M};
        `}
`

const Item = styled.div``

const CardNavItem = ({ page, last }) => {
    // Form items
    const [header, setHeader] = useState(page.header)
    const [orderHeader, setOrderHeader] = useState(page.orderHeader)
    const [footer, setFooter] = useState(page.footer)
    const [orderFooter, setOrderFooter] = useState(page.orderFooter)

    // Form handles
    const handleHeader = e => {
        if (e.target.checked) {
            setHeader(true)

            pageService
                .showHeader(page._id, { header: true })
                .then(() =>
                    console.log(`${page.title} is now visible in header`)
                )
                .catch(err => console.log(err))
        } else if (!e.target.checked) {
            setHeader(false)

            pageService
                .showHeader(page._id, { header: false })
                .then(() =>
                    console.log(`${page.title} is not visible in header`)
                )
                .catch(err => console.log(err))
        }
    }

    const handleOrderHeader = e => {
        setOrderHeader(e.target.value)

        pageService
            .orderHeader(page._id, { orderHeader: e.target.value })
            .then(() =>
                console.log(
                    `${page.title} is now in position ${orderHeader} in header`
                )
            )
            .catch(err => console.log(err))
    }

    const handleFooter = e => {
        if (e.target.checked) {
            setFooter(true)

            pageService
                .showFooter(page._id, { footer: true })
                .then(() =>
                    console.log(`${page.title} is now visible in footer`)
                )
                .catch(err => console.log(err))
        } else if (!e.target.checked) {
            pageService
                .showFooter(page._id, { footer: false })
                .then(() =>
                    console.log(`${page.title} is not visible in footer`)
                )
                .catch(err => console.log(err))
        }
    }

    const handleOrderFooter = e => {
        setOrderFooter(e.target.value)

        pageService
            .orderFooter(page._id, { orderFooter: e.target.value })
            .then(() =>
                console.log(
                    `${page.title} is now in position ${orderHeader} in footer`
                )
            )
            .catch(err => console.log(err))
    }

    return (
        <Container col={5} last={last}>
            <Font.P>{page.title}</Font.P>

            <Item>
                <InputCheck
                    id={`toggle-header-${page._id}`}
                    type="checkbox"
                    name="toggle-header"
                    toggle
                    defaultChecked={header}
                    onChange={handleHeader}
                />
            </Item>

            <Item>
                <Input
                    type="number"
                    step={1}
                    min={0}
                    disabled={!header}
                    onChange={handleOrderHeader}
                    value={orderHeader}
                />
            </Item>

            <Item>
                <InputCheck
                    id={`toggle-footer-${page._id}`}
                    type="checkbox"
                    name="toggle-footer"
                    toggle
                    defaultChecked={footer}
                    onChange={handleFooter}
                />
            </Item>

            <Item>
                <Input
                    type="number"
                    step={1}
                    disabled={!footer}
                    onChange={handleOrderFooter}
                    value={orderFooter}
                />
            </Item>
        </Container>
    )
}

export default CardNavItem
