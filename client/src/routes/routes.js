// Import routes
import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"
// import Seeds from "../pages/Seeds"
import GlobalPage from "../pages/GlobalPage"

// Auth
import Signup from "../pages/auth/Signup"
import ThankYou from "../pages/auth/ThankYou"
import Login from "../pages/auth/Login"
import Verify from "../pages/auth/Verify"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

// Posts
import PostsList from "../pages/posts/PostsList"
import PostDetail from "../pages/posts/PostDetail"

// Authors
import AuthorsList from "../pages/authors/AuthorsList"
import AuthorDetail from "../pages/authors/AuthorDetail"

// Categories
import CategoriesList from "../pages/categories/CategoriesList"
import CategoryDetail from "../pages/categories/CategoryDetail"

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard"
import NewPost from "../pages/dashboard/NewPost"
import EditPost from "../pages/dashboard/EditPost"
import EditAccount from "../pages/dashboard/EditAccount"
import EditPassword from "../pages/dashboard/EditPassword"
import Comments from "../pages/dashboard/Comments"
import AllPages from "../pages/dashboard/AllPages"
import NewPage from "../pages/dashboard/NewPage"
import EditPage from "../pages/dashboard/EditPage"
import GlobalData from "../pages/dashboard/GlobalData"
import Users from "../pages/dashboard/Users"
import NewUser from "../pages/dashboard/NewUser"
import NavigationItems from "../pages/dashboard/NavigationItems"

// All routes
const routes = [
    {
        path: "/",
        element: Homepage,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "*",
        element: NotFound,
        protected: false,
        anon: false,
        edit: false,
    },
    // {
    //     path: "/seeds",
    //     element: Seeds,
    //     protected: false,
    //     anon: false,
    //     edit: false,
    // },
    {
        path: "/:slug",
        element: GlobalPage,
        protected: false,
        anon: false,
        edit: false,
    },

    // Auth
    {
        path: "/dashboard/signup",
        element: Signup,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/dashboard/thank-you",
        element: ThankYou,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/dashboard/verify/:token/:id",
        element: Verify,
        protected: false,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/login",
        element: Login,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/dashboard/login/forgot-password",
        element: ForgotPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/dashboard/login/forgot-password/email-sent",
        element: ForgotSent,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/dashboard/reset-password/:token/:id",
        element: ResetPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/dashboard/goodbye",
        element: Goodbye,
        protected: false,
        anon: false,
        edit: false,
    },

    // Posts
    {
        path: "/posts",
        element: PostsList,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/posts/:category/:slug",
        element: PostDetail,
        protected: false,
        anon: false,
        edit: false,
    },

    // Authors
    {
        path: "/authors",
        element: AuthorsList,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/authors/:author-:id",
        element: AuthorDetail,
        protected: false,
        anon: false,
        edit: false,
    },

    // Categories
    {
        path: "/categories",
        element: CategoriesList,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/categories/:category",
        element: CategoryDetail,
        protected: false,
        anon: false,
        edit: false,
    },

    // Dashboard
    {
        path: "/dashboard",
        element: Dashboard,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/dashboard/new-post",
        element: NewPost,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/posts/:id",
        element: EditPost,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/edit-account",
        element: EditAccount,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/edit-account/edit-password",
        element: EditPassword,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/comments",
        element: Comments,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/pages",
        element: AllPages,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/pages/new-page",
        element: NewPage,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/pages/:id",
        element: EditPage,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/global",
        element: GlobalData,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/users",
        element: Users,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/users/new-user",
        element: NewUser,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/dashboard/navigation",
        element: NavigationItems,
        protected: true,
        anon: false,
        edit: true,
    },
]

export default routes
