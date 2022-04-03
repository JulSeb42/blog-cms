// Packages
const router = require("express").Router()
const bcrypt = require("bcryptjs")

// Model
const User = require("../models/User.model")

// Utils
const { emailRegex } = require("js-utils-julseb")
const transporter = require("../utils/transporter")

// Salt password
const saltRounds = 10

// Create user
router.post("/new-user", (req, res, next) => {
    const {
        fullName,
        email,
        password,
        bio,
        imageUrl,
        verifyToken,
        role,
    } = req.body

    if (!fullName) {
        return res.status(400).json({ message: "Please provide a full name." })
    }

    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: "Please provide a valid email address." })
    }

    User.findOne({ email }).then(found => {
        if (found) {
            return res
                .status(400)
                .json({ message: "This email is already taken." })
        } else {
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({
                fullName,
                email,
                bio,
                imageUrl,
                verified: true,
                verifyToken,
                role,
                password: hashedPassword,
                featured: false,
                approved: true,
            }).then(createdUser => {
                // Send email to verify the account
                let mailDetails = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "An account was created for you on our app!",
                    html: `Hello,<br /><br />An account was created for you on our app. <a href="${process.env.ORIGIN}/dashboard/login">Click here to log in</a> with these credentials:<br /><br /><strong>Email: </strong>${email}<br /><strong>Password: </strong>${password}`,
                }

                transporter.sendMail(mailDetails, (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Email sent successfully.")
                    }
                })

                res.status(200).json(createdUser)
            })
        }
    })
})

// Edit user role
router.put("/edit-role/:id", (req, res, next) => {
    const { role } = req.body

    User.findByIdAndUpdate(req.params.id, { role }, { new: true })
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => next(err))
})

// Feature user
router.put("/feature-user/:id", (req, res, next) => {
    const { featured } = req.body

    User.findByIdAndUpdate(req.params.id, { featured }, { new: true })
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => next(err))
})

// Approve user
router.put("/approve-user/:id", (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true })
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => next(err))
})

// Delete user
router.delete("/delete-user/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "User deleted" }))
        .catch(err => next(err))
})

module.exports = router
