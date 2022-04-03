// Packages
const router = require("express").Router()

// Models
const Post = require("../models/Post.model")

// Search posts by category
router.get("/:category", (req, res, next) => {
    Post.find({ category: { $regex: req.params.category, $options: "-i" } })
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Search author's post
router.get("/:author", (req, res, next) => {
    // Post.find({
    //     author: {
    //         fullName: { $regex: req.params.author, $options: "-i" },
    //     },
    // })
    Post.find({
        "author.fullName": { $regex: req.params.author, $options: "-i" },
    })
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Search
router.get("/search/:query", (req, res, next) => {
    const query = req.params.query
    const search = { $regex: query, $options: "-i" }

    Post.find({ tags: search, draft: false })
        .then(foundPosts => res.status(200).json(foundPosts))
        .catch(err => next(err))
})

module.exports = router
