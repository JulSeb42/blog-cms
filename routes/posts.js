// Packages
const router = require("express").Router()
const jwt = require("jsonwebtoken")

// Models
const Post = require("../models/Post.model")
const User = require("../models/User.model")

// Utils
const jwtConfig = require("../utils/jwtConfig")

// Get all posts
router.get("/all-posts", (req, res, next) => {
    Post.find()
        .populate("author")
        .populate("comments")
        .then(postsFromDb => res.status(200).json(postsFromDb))
        .catch(err => next(err))
})

// Get published posts
router.get("/published-posts", (req, res, next) => {
    Post.find({ draft: false })
        .then(postsFromDb => res.status(200).json(postsFromDb))
        .catch(err => next(err))
})

// Get drafts
router.get("/drafts", (req, res, next) => {
    Post.find({ draft: true })
        .then(drafts => res.status(200).json(drafts))
        .catch(err => next(err))
})

// Get post by ID
router.get("/post/:id", (req, res, next) => {
    Post.findById(req.params.id)
        .populate("author")
        .populate("comments")
        .then(postFromDb => res.status(200).json(postFromDb))
        .catch(err => next(err))
})

// Get post by slug
router.get("/post-slug/:slug", (req, res, next) => {
    Post.findOne({ slug: req.params.slug })
        .populate("author")
        .populate("comments")
        .then(postFromDb => res.status(200).json(postFromDb))
        .catch(err => next(err))
})

// New post
router.post("/new-post", (req, res, next) => {
    const {
        title,
        date,
        time,
        category,
        tags,
        slug,
        author,
        body,
        imageUrl,
        draft,
        metaDescription,
        featured,
    } = req.body

    if (!title) {
        return res.status(400).json({ message: "Please enter a title. " })
    }

    if (!category) {
        return res.status(400).json({ message: "Please enter a category. " })
    }

    if (!slug) {
        return res.status(400).json({ message: "Please enter a slug. " })
    }

    if (!body) {
        return res.status(400).json({ message: "Please enter a body. " })
    }

    Post.findOne({ slug }).then(found => {
        if (found) {
            res.status(400).json({ message: "This slug already exists." })
        } else {
            Post.create({
                title,
                date,
                time,
                category,
                tags,
                slug,
                author,
                body,
                imageUrl,
                draft,
                metaDescription,
                featured,
            })
                .then(createdPost => {
                    User.findOneAndUpdate(
                        { _id: author },
                        { $push: { posts: createdPost } }
                    ).then(updatedUser => {
                        // Payload
                        const payload = { user: updatedUser }

                        const authToken = jwt.sign(
                            payload,
                            process.env.TOKEN_SECRET,
                            jwtConfig
                        )

                        res.status(201).json({
                            user: updatedUser,
                            authToken: authToken,
                            createdPost,
                        })
                    })
                })
                .catch(err => next(err))
        }
    })
})

// Edit post
router.put("/edit-post/:id", (req, res, next) => {
    const {
        title,
        dateEdited,
        timeEdited,
        category,
        tags,
        slug,
        author,
        body,
        imageUrl,
        draft,
        metaDescription,
        featured,
    } = req.body

    if (!title) {
        return res.status(400).json({ message: "Please enter a title. " })
    }

    if (!category) {
        return res.status(400).json({ message: "Please enter a category. " })
    }

    if (!slug) {
        return res.status(400).json({ message: "Please enter a slug. " })
    }

    if (!body) {
        return res.status(400).json({ message: "Please enter a body. " })
    }

    Post.findByIdAndUpdate(
        req.params.id,
        {
            title,
            dateEdited,
            timeEdited,
            category,
            tags,
            slug,
            body,
            imageUrl,
            draft,
            metaDescription,
            featured,
        },
        { new: true }
    )
        .then(updatedPost => res.status(200).json(updatedPost))
        .catch(err => next(err))
})

// Delete post
router.delete("/delete-post/:id", (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Post deleted." }))
        .catch(err => next(err))
})

module.exports = router
