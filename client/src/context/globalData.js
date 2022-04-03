// Packages
import React, { useState, useEffect, createContext } from "react"

// API
import globalService from "../api/global.service"

const GlobalContext = createContext()

const GlobalDataWrapper = props => {
    const [globalData, setGlobalData] = useState()
    const [isGlobalLoading, setIsGlobalLoading] = useState(true)

    useEffect(() => {
        globalService
            .getData()
            .then(res => {
                setGlobalData(res.data)
                setIsGlobalLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <GlobalContext.Provider value={{ globalData, isGlobalLoading }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export { GlobalDataWrapper, GlobalContext }
