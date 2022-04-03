// Packages
import React, { useState, useEffect, useContext } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { Font } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import pageService from "../../api/page.service"

// Components
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import HeadTable from "../../components/dashboard/HeadTable"
import ListCards from "../../components/dashboard/ListCards"
import CardNavItem from "../../components/dashboard/CardNavItem"
import Pagination from "../../components/ui/Pagination"

// Utils
import { dataLimit, pageLimit } from "../../config/paginationConfig"

const NavigationItems = () => {
    const { user } = useContext(AuthContext)

    // Get all pages
    const [publishedPages, setPublishedPages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        pageService
            .publishedPages()
            .then(res => {
                setPublishedPages(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    // Pagination
    const [query] = useSearchParams()
    const pageNumber = query.get("page")

    const [currentPage, setCurrentPage] = useState(
        pageNumber === null ? 1 : pageNumber
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return publishedPages.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(publishedPages.length / dataLimit)

    return user.role !== "admin" ? (
        <Navigate to="/dashboard" />
    ) : (
        <DashboardLayout title="Navigation items" isLoading={isLoading}>
            <Font.H1>Navigation items</Font.H1>

            <ListCards>
                <HeadTable col={5}>
                    <Font.H5>Page title</Font.H5>
                    <Font.H5>In header</Font.H5>
                    <Font.H5>Position in header</Font.H5>
                    <Font.H5>In footer</Font.H5>
                    <Font.H5>Position in footer</Font.H5>
                </HeadTable>

                {publishedPages.length === 0 ? (
                    <Font.P>No page yet.</Font.P>
                ) : (
                    getPaginatedData().map((page, i) => (
                        <CardNavItem
                            page={page}
                            key={page._id}
                            last={i === getPaginatedData().length - 1 && true}
                        />
                    ))
                )}
            </ListCards>

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    data={publishedPages}
                    totalPages={numberOfPages}
                    dataLimit={dataLimit}
                    pageLimit={pageLimit}
                />
            )}
        </DashboardLayout>
    )
}

export default NavigationItems
