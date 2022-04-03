// Packages
const router = require("express").Router()
const { emailRegex } = require("js-utils-julseb")

// Model
const Global = require("../models/Global.model")

// Utils
const transporter = require("../utils/transporter")

// Get global data
router.get("/data", (req, res, next) => {
    Global.find()
        .then(global => res.status(200).json(global[0]))
        .catch(err => next(err))
})

// Edit data
router.put("/edit-global/:id", (req, res, next) => {
    const { name, baseline, metaDescription, email, favicon, cover, keywords, author, year } =
        req.body

    if (!name) {
        return res.status(400).json({ message: "The name can not be empty." })
    }

    if (!email) {
        return res.status(400).json({ message: "The email can not be empty." })
    }

    Global.findByIdAndUpdate(
        req.params.id,
        {
            name,
            baseline,
            metaDescription,
            email,
            favicon,
            cover,
            keywords,
        },
        { new: true }
    )
        .then(updatedGlobal => res.status(200).json({ global: updatedGlobal }))
        .catch(err => next(err))
})

// Contact form
router.post("/contact", (req, res, next) => {
    const { receiver, name, email, subject, body } = req.body

    if (!name) {
        return res.status(400).json({ message: "Your name can not be empty." })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email address not valid." })
    }

    if (!subject) {
        return res
            .status(400)
            .json({ message: "The subject can not be empty." })
    }

    if (!body) {
        return res
            .status(400)
            .json({ message: "Your message can not be empty." })
    }

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
