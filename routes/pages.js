// Packages
const router = require("express").Router()

// Model
const Page = require("../models/Page.model")

// Get all pages
router.get("/all-pages", (req, res, next) => {
    Page.find()
        .then(foundPages => res.status(200).json(foundPages))
        .catch(err => next(err))
})

// Get published pages
router.get("/published-pages", (req, res, next) => {
    Page.find({ draft: false })
        .then(foundPages => res.status(200).json(foundPages))
        .catch(err => next(err))
})

// Get page by id
router.get("/page/:id", (req, res, next) => {
    Page.findById(req.params.id)
        .then(foundPage => res.status(200).json(foundPage))
        .catch(err => next(err))
})

// Get page by slug
router.get("/find-page/:slug", (req, res, next) => {
    Page.findOne({ slug: req.params.slug })
        .then(foundPage => res.status(200).json(foundPage))
        .catch(err => next(err))
})

// Create page
router.post("/new-page", (req, res, next) => {
    const { title, body, slug, metaDescription, keywords, draft } = req.body

    if (!title) {
        return res.status(400).json({ message: "Title is required." })
    }

    if (!slug) {
        return res.status(400).json({ message: "Slug is required." })
    }

    if (!body && !draft) {
        return res.status(400).json({
            message:
                "You can not publish an empty page, but you can add it to drafts.",
        })
    }

    Page.findOne({ slug: slug })
        .then(found => {
            if (found) {
                return res
                    .status(400)
                    .json({ message: "A page with this slug already exists." })
            } else {
                Page.create({
                    title,
                    body,
                    slug,
                    metaDescription,
                    keywords,
                    draft,
                    header: false,
                    orderHeader: 0,
                    footer: false,
                    orderFooter: 0,
                })
                    .then(createdPage => res.status(200).json(createdPage))
                    .catch(err => next(err))
            }
        })
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

    if (!body && !draft) {
        return res.status(400).json({
            message:
                "You can not publish an empty page, but you can add it to drafts.",
        })
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
        .then(updatedPage => res.status(200).json(updatedPage))
        .catch(err => next(err))
})

// Show page in header
router.put("/show-header/:id", (req, res, next) => {
    const { header } = req.body

    Page.findByIdAndUpdate(req.params.id, { header }, { new: true })
        .then(updatedPage => res.status(200).json(updatedPage))
        .catch(err => next(err))
})

// Edit order in header
router.put("/order-header/:id", (req, res, next) => {
    const { orderHeader } = req.body

    Page.findByIdAndUpdate(req.params.id, { orderHeader }, { new: true })
        .then(updatedPage => res.status(200).json(updatedPage))
        .catch(err => next(err))
})

// Show page in footer
router.put("/show-footer/:id", (req, res, next) => {
    const { footer } = req.body

    Page.findByIdAndUpdate(req.params.id, { footer }, { new: true })
        .then(updatedPage => res.status(200).json(updatedPage))
        .catch(err => next(err))
})

// Edit order in footer
router.put("/order-footer/:id", (req, res, next) => {
    const { orderFooter } = req.body

    Page.findByIdAndUpdate(req.params.id, { orderFooter }, { new: true })
        .then(updatedPage => res.status(200).json(updatedPage))
        .catch(err => next(err))
})

// Delete page
router.delete("/delete-page/:id", (req, res, next) => {
    Page.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Page deleted" }))
        .catch(err => next(err))
})

module.exports = router
