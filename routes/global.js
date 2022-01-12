const router = require("express").Router()
const Global = require("../models/Global.model")

router.get("/global", (req, res, next) => {
    Global.find()
        .then(globalFromDb => res.status(200).json(globalFromDb))
        .catch(err => next(err))
})

router.get("/global/:id", (req, res, next) => {
    Global.findById("61ddbd1b06de66e386e32a88")
        .then(globalFromDb => res.status(200).json(globalFromDb))
        .catch(err => next(err))
})

// In case we delete data in the DB
// router.put("/create", (req, res, next) => {
//     const { name, metaDescription, favicon, email, cover, keywords } = req.body
//     Global.create({ name, metaDescription, favicon, email, cover, keywords })
//         .then(createdGlobal => res.status(200).json(createdGlobal))
//         .catch(err => next(err))
// })

router.put("/edit", (req, res, next) => {
    const {
        name,
        baseline,
        metaDescription,
        favicon,
        email,
        cover,
        keywords,
        textAbout,
        textContact,
        textPrivacy,
        textImpressum,
    } = req.body

    Global.findByIdAndUpdate("61ddbd1b06de66e386e32a88", {
        name,
        baseline,
        metaDescription,
        favicon,
        email,
        cover,
        keywords,
        textAbout,
        textContact,
        textPrivacy,
        textImpressum,
    })
        .then(updatedGlobal => res.status(200).json({ global: updatedGlobal }))
        .catch(err => next(err))
})

module.exports = router
