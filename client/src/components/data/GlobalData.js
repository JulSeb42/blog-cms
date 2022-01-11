// Packages
import { useEffect, useState } from "react"
import axios from "axios"

function GlobalData(props) {
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

    return globalData
}

export default GlobalData
