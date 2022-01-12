// Packages
import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"

// Pages
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import GlobalPage from "../pages/GlobalPage"
import Contact from "../pages/Contact"

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
import Global from "../pages/admin/Global"
import Users from "../pages/admin/Users"
import PagesDashboard from "../pages/admin/PagesDashboard"
import AddPage from "../pages/admin/AddPage"
import EditPage from "../pages/admin/EditPage"

// Posts
import PostsList from "../pages/posts/PostsList"
import PostDetail from "../pages/posts/PostDetail"
import CategoryDetail from "../pages/categories/CategoryDetail"
import AuthorList from "../pages/authors/AuthorList"
import AuthorDetail from "../pages/authors/AuthorDetail"

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes"
import scrollToTop from "./utils/scrollToTop"
import slugify from "./utils/slugify"

function Switch() {
    const [allUsers, setAllUsers] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [allPages, setAllPages] = useState([])
    const [edited, setEdited] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios
            .get("/users/user")
            .then(res => setAllUsers(res.data))
            .catch(err => console.log(err))

        axios
            .get("/posts/posts")
            .then(res => setAllPosts(res.data))
            .catch(err => console.log(err))

        axios
            .get("/pages/pages")
            .then(res => setAllPages(res.data))
            .catch(err => console.log(err))
    }, [])

    let allCategories = allPosts.map(post => post.category)
    let uniqCategories = [...new Set(allCategories)]

    return (
        <Routes>
            <Route path="/" element={<Home />} preload={scrollToTop()} />

            {allPages
                .filter(page => page.slug !== "contact")
                .map(page => (
                    <Route
                        path={`/${page.slug}`}
                        element={<GlobalPage page={page} />}
                        preload={scrollToTop()}
                        key={page._id}
                    />
                ))}

            <Route
                path="/contact"
                element={<Contact />}
                preload={scrollToTop()}
            />

            {/* Auth */}
            <Route
                path="/signup"
                element={<Navigate to="/dashboard/signup" />}
            />
            <Route
                path="/dashboard/signup"
                element={<Signup />}
                preload={scrollToTop()}
            />
            <Route path="/login" element={<Navigate to="/dashboard/login" />} />
            <Route
                path="/dashboard/login"
                element={<Login />}
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/thank-you"
                element={<ThankYou />}
                preload={scrollToTop()}
            />
            {allUsers.map(user => (
                <Route
                    path={`/dashboard/verify/${user.verifyToken}/${user._id}`}
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
                path="/dashboard/login/forgot-password"
                element={<ForgotPassword />}
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/login/forgot-password/email-sent"
                element={<ForgotSent />}
                preload={scrollToTop()}
            />
            {allUsers.map(user => (
                <Route
                    path={`/dashboard/reset-password/${user.resetToken}/${user._id}`}
                    element={<ResetPassword />}
                    key={`${user.resetToken}-${user._id}`}
                    preload={scrollToTop()}
                />
            ))}
            <Route
                path="/dashboard/goodbye"
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
                path="/dashboard/edit-account"
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
            <Route
                path="/dashboard/global"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <Global edited={edited} setEdited={setEdited} />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/users"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <Users />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/pages"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <PagesDashboard />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            <Route
                path="/dashboard/pages/new-page"
                element={
                    <ProtectedRoutes redirectTo="/login">
                        <AddPage />
                    </ProtectedRoutes>
                }
                preload={scrollToTop()}
            />
            {allPages.map(page => (
                <Route
                    path={`/dashboard/pages/${page._id}`}
                    element={
                        <ProtectedRoutes redirectTo="/login">
                            <EditPage page={page} />
                        </ProtectedRoutes>
                    }
                    preload={scrollToTop()}
                    key={page._id}
                />
            ))}

            {/* Posts */}
            <Route path="/posts" element={<Navigate to="/posts/1" />} />

            <Route
                exact
                path="/posts/:page"
                element={<PostsList page={page} setPage={setPage} />}
                preload={scrollToTop()}
            />

            {allPosts.map(post => (
                <Route
                    path={`/posts/${slugify(post.category)}/${post.slug}`}
                    element={<PostDetail post={post} />}
                    preload={scrollToTop()}
                    key={post._id}
                />
            ))}
            {uniqCategories.map((category, i) => (
                <Route
                    path={`/posts/${slugify(category)}`}
                    element={<CategoryDetail category={category} />}
                    preload={scrollToTop()}
                    key={i}
                />
            ))}
            <Route
                path="/authors"
                element={<AuthorList />}
                preload={scrollToTop()}
            />
            {allUsers.map(user => (
                <Route
                    path={`/authors/${slugify(user.fullName)}`}
                    element={<AuthorDetail author={user} />}
                    preload={scrollToTop()}
                    key={user._id}
                />
            ))}

            {/* 404 */}
            <Route path="*" element={<NotFound />} preload={scrollToTop()} />
        </Routes>
    )
}

export default Switch
