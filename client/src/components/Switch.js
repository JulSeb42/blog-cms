// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

// Pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"

// Auth
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login"
import ThankYou from "../pages/auth/ThankYou"
import Verify from "../pages/auth/Verify"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

// Dashboard
import Dashboard from "../pages/admin/Dashboard"
import EditAccount from "../pages/admin/EditAccount"
import EditPassword from "../pages/admin/EditPassword"
import NewPost from "../pages/admin/NewPost"
import EditPost from "../pages/admin/EditPost"

// Posts
import PostsList from "../pages/posts/PostsList"
import PostDetail from "../pages/posts/PostDetail"

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes"
import scrollToTop from "./utils/scrollToTop"

function Switch() {
    const [allUsers, setAllUsers] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [edited, setEdited] = useState(false)

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))

        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Home />} preload={scrollToTop()} />

            {/* Auth */}
            <Route
                path="/signup"
                element={<Signup />}
                preload={scrollToTop()}
            />
            <Route path="/login" element={<Login />} preload={scrollToTop()} />
            <Route
                path="/thank-you"
                element={<ThankYou />}
                preload={scrollToTop()}
            />
            {allUsers.map(user => (
                <Route
                    path={`/verify/${user.verifyToken}/${user._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <Verify edited={edited} setEdited={setEdited} />
                        </ProtectedRoutes>
                    }
                    key={`${user.verifyToken}/${user._id}`}
                    preload={scrollToTop()}
                />
            ))}
            <Route
                path="/login/forgot-password"
                element={<ForgotPassword />}
                preload={scrollToTop()}
            />
            <Route
                path="/login/forgot-password/email-sent"
                element={<ForgotSent />}
                preload={scrollToTop()}
            />
            {allUsers.map(user => (
                <Route
                    path={`/reset-password/${user.resetToken}/${user._id}`}
                    element={<ResetPassword />}
                    key={`${user.resetToken}-${user._id}`}
                    preload={scrollToTop()}
                />
            ))}
            <Route
                path="/goodbye"
                element={<Goodbye />}
                preload={scrollToTop()}
            />

            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <Dashboard />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/edit"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditAccount edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/edit-password"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <EditPassword edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/new-post"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <NewPost edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            {allPosts.map(post => (
                <Route
                    path={`/dashboard/posts/${post._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <EditPost
                                post={post}
                                edited={edited}
                                setEdited={setEdited}
                            />
                        </ProtectedRoutes>
                    }
                    preload={scrollToTop()}
                    key={post._id}
                />
            ))}

            {/* Posts */}
            <Route
                path="/posts"
                element={<PostsList />}
                preload={scrollToTop()}
            />
            {allPosts.map(post => (
                <Route
                    path={`/posts/${post.category}/${post.slug}`}
                    element={<PostDetail post={post} />}
                    preload={scrollToTop()}
                    key={post._id}
                />
            ))}

            {/* 404 */}
            <Route path="*" element={<NotFound />} preload={scrollToTop()} />
        </Routes>
    )
}

export default Switch
