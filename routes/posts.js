// Packages
const router = require("express").Router()

const fileUploader = require("../config/cloudinary.config")
const Post = require("../models/Post.model")
const User = require("../models/User.model")

// Get all posts
router.get("/posts", (req, res, next) => {
    Post.find()
        .populate("author")
        // .populate("comments")
        .then(postsFromDb => res.status(200).json(postsFromDb))
        .catch(err => next(err))
})

// Get post by ID
router.get("/post/:id", (req, res, next) => {
    Post.findById(req.params.id)
        .populate("author")
        // .populate("comments")
        .then(postFromDb => res.status(200).json(postFromDb))
        .catch(err => next(err))
})

// New post
router.put(
    "/upload-picture",
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        res.json({ secure_url: req.file.path })
    }
)

router.put("/new-post", (req, res, next) => {
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
                        res.status(200).json({ user: updatedUser, createdPost })
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
        category,
        tags,
        slug,
        draft,
        body,
        imageUrl,
        dateEdited,
        timeEdited,
        metaDescription,
        featured,
    } = req.body

    Post.findByIdAndUpdate(
        req.params.id,
        {
            title,
            category,
            tags,
            slug,
            draft,
            body,
            imageUrl,
            dateEdited,
            timeEdited,
            metaDescription,
            featured,
        },
        { new: true }
    )
        .then(updatedPost => res.status(200).json({ post: updatedPost }))
        .catch(err => next(err))
})

// Delete post
router.delete("/post/:id/delete", (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Post deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
