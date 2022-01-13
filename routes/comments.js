const router = require("express").Router()
const Comment = require("../models/Comment.model")
const Post = require("../models/Post.model")

// Get all comments
router.get("/comments", (req, res, next) => {
    Comment.find()
        .populate("post")
        .then(foundComments => res.status(200).json(foundComments))
        .catch(err => next(err))
})

// Get comment by ID
router.get("/comment/:id", (req, res, next) => {
    Comment.findById(req.params.id)
        .populate("post")
        .then(foundComment => res.status(200).json(foundComment))
        .catch(err => next(err))
})

// New comment
router.put("/new-comment", (req, res, next) => {
    const { poster, body, date, time, post } = req.body

    Comment.create({ poster, body, date, time, post })
        .then(createdComment => {
            Post.findByIdAndUpdate(post, {
                $push: { comments: createdComment },
            }).then(updatedPost => {
                res.status(200).json({ post: updatedPost })
            })
        })
        .catch(err => next(err))
})

// Delete comment
router.delete("/comment/:id/delete", (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Comment deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
