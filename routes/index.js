const router = require("express").Router()

// Middleware
const { isAuthenticated } = require("../middleware/jwt.middleware")

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
const auth = require("./auth")
router.use("/auth", auth)

const users = require("./users")
router.use("/users", users)

const admin = require("./admin")
router.use("/admin", admin)

const posts = require("./posts")
router.use("/posts", posts)

const search = require("./search")
router.use("/search", search)

const comments = require("./comments")
router.use("/comments", comments)

const pages = require("./pages")
router.use("/pages", pages)

const uploader = require("./uploader")
router.use("/uploader", uploader)

const globalData = require("./global-data")
router.use("/global-data", globalData)

module.exports = router
