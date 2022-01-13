const router = require("express").Router()
const Global = require("../models/Global.model")
let transporter = require("../utils/transporter")

const globalId = "61ddbd1b06de66e386e32a88"

router.get("/global", (req, res, next) => {
    Global.find()
        .then(globalFromDb => res.status(200).json(globalFromDb))
        .catch(err => next(err))
})

router.get("/global/:id", (req, res, next) => {
    Global.findById(globalId)
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
    const { name, baseline, metaDescription, favicon, email, cover, keywords } =
        req.body

    Global.findByIdAndUpdate(globalId, {
        name,
        baseline,
        metaDescription,
        favicon,
        email,
        cover,
        keywords,
    })
        .then(updatedGlobal => res.status(200).json({ global: updatedGlobal }))
        .catch(err => next(err))
})

router.put("/contact", (req, res, next) => {
    const { receiver, name, email, subject, body } = req.body

    let mailDetails = {
        from: process.env.EMAIL,
        to: receiver,
        subject: "New message on Blog CMS",
        html: `<p>Hello,</p><p>You just received a new email from ${name} (<a href="mailto:${email}">${email}</a>).</p><p><strong>Subject: </strong>${subject}</p><p><strong>Message: </strong>${body}</p>`,
    }

    transporter.sendMail(mailDetails, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Email sent successfully.")
        }
    })

    res.status(200).json(mailDetails)
})

module.exports = router
