const router = require("express").Router()
const Page = require("../models/Page.model")

// Get all pages
router.get("/pages", (req, res, next) => {
    Page.find()
        .then(foundPage => res.status(200).json(foundPage))
        .catch(err => next(err))
})

// Get page by id
router.get("/page/:id", (req, res, next) => {
    Page.findById(req.params.id)
        .then(foundPage => res.status(200).json(foundPage))
        .catch(err => next(err))
})

// Get page by slug
router.get("/page-slug/:slug", (req, res, next) => {
    Page.findOne({ slug: req.params.slug })
        .then(foundPage => res.status(200).json(foundPage))
        .catch(err => next(err))
})

// Create page
router.put("/new-page", (req, res, next) => {
    const { title, body, slug, metaDescription, keywords, draft } = req.body

    if (!title) {
        return res.status(400).json({ message: "Title is required." })
    }

    if (!slug) {
        return res.status(400).json({ message: "Slug is required." })
    }

    Page.create({ title, body, slug, metaDescription, keywords, draft })
        .then(createdPage => res.status(200).json(createdPage))
        .catch(err => next(err))
})

// Edit page
router.put("/edit-page/:id", (req, res, next) => {
    const { title, body, slug, metaDescription, keywords, draft } = req.body

    if (!title) {
        return res.status(400).json({ message: "Title is required." })
    }

    if (!slug) {
        return res.status(400).json({ message: "Slug is required." })
    }

    Page.findByIdAndUpdate(
        req.params.id,
        {
            title,
            body,
            slug,
            metaDescription,
            keywords,
            draft,
        },
        { new: true }
    )
        .then(updatedPage => res.status(200).json({ page: updatedPage }))
        .catch(err => next(err))
})

// Delete page
router.delete("/page/:id/delete", (req, res, next) => {
    Page.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Page deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
