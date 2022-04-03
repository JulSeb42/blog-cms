// Packages
const router = require("express").Router()

// Models
const Comment = require("../models/Comment.model")
const Post = require("../models/Post.model")

// Get all comment
router.get("/all-comments", (req, res, next) => {
    Comment.find()
        .populate("post")
        .then(commentsFromDb => res.status(200).json(commentsFromDb))
        .catch(err => next(err))
})

// Get comment by ID
router.get("/comment/:id", (req, res, next) => {
    Comment.findById(req.params.id)
        .populate("post")
        .then(commentFromDb => res.status(200).json(commentFromDb))
        .catch(err => next(err))
})

// New comment
router.post("/new-comment", (req, res, next) => {
    const { poster, body, date, time, post } = req.body

    if (!poster) {
        return res.status(400).json({ message: "Please enter your name." })
    }

    if (!body) {
        return res.status(400).json({ message: "Please enter your comment." })
    }

    Comment.create({ poster, body, date, time, post })
        .then(createdComment => {
            Post.findByIdAndUpdate(post, {
                $push: { comments: createdComment },
            }).then(updatedPost => res.status(200).json({ post: updatedPost }))
        })
        .catch(err => next(err))
})

// Delete comment
router.delete("/delete-comment/:id", (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Comment deleted" }))
        .catch(err => next(err))
})

module.exports = router
