// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

// API
import postService from "./api/post.service"

// Routes
import routes from "./routes/routes"
import redirects from "./routes/redirects"

// Utils
import ProtectedRoutes from "./routes/ProtectedRoutes"
import AnonRoutes from "./routes/AnonRoutes"

const App = () => {
    const [edited, setEdited] = useState(false)

    const [allCategories, setAllCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        postService
            .publishedPosts()
            .then(res => {
                setAllCategories(res.data.map(post => post.category))
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Routes>
            {routes.map((route, i) => (
                <Route
                    path={route.path}
                    element={
                        route.protected ? (
                            <ProtectedRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </ProtectedRoutes>
                        ) : route.anon ? (
                            <AnonRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </AnonRoutes>
                        ) : (
                            <route.element
                                edited={route.edit && edited}
                                setEdited={route.edit && setEdited}
                            />
                        )
                    }
                    key={i}
                />
            ))}

            {redirects.map((route, i) => (
                <Route
                    path={route.path}
                    element={<Navigate to={route.to} />}
                    key={i}
                />
            ))}

            {!isLoading &&
                allCategories.map((category, i) => (
                    <Route
                        path={`/posts/${category}`}
                        element={<Navigate to={`/categories/${category}`} />}
                        key={i}
                    />
                ))}
        </Routes>
    )
}

export default App
