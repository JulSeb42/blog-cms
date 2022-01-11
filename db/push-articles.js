require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

// Generate users
const User = require("../models/User.model")

// Julien
const idJulien = "61ddcbee109f9908bd2781fc"
const postsJulien = [
    "61ddcc3b40e2c0fadd4c09f2",
    "61ddcc3b40e2c0fadd4c09df",
    "61ddcc3b40e2c0fadd4c09ef",
]

User.findOneAndUpdate(
    { _id: idJulien },
    { $push: { posts: postsJulien } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Julien`)
    })
    .catch(err => console.log(err))

// Dirk
const idDirk = "61ddcbee109f9908bd2781fd"
const postsDirk = [
    "61ddcc3b40e2c0fadd4c09e3",
    "61ddcc3b40e2c0fadd4c09f1",
    "61ddcc3b40e2c0fadd4c09ea",
    "61ddcc3b40e2c0fadd4c09f8",
]

User.findOneAndUpdate(
    { _id: idDirk },
    { $push: { posts: postsDirk } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Dirk`)
    })
    .catch(err => console.log(err))

// Jan
const idJan = "61ddcbee109f9908bd2781fe"
const postsJan = [
    "61ddcc3b40e2c0fadd4c09f6",
    "61ddcc3b40e2c0fadd4c09e6",
    "61ddcc3b40e2c0fadd4c09ec",
    "61ddcc3b40e2c0fadd4c09e7",
    "61ddcc3b40e2c0fadd4c09e2",
]

User.findOneAndUpdate(
    { _id: idJan },
    { $push: { posts: postsJan } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Jan`)
    })
    .catch(err => console.log(err))

// Katja
const idKatja = "61ddcbee109f9908bd2781ff"
const postsKatja = [
    "61ddcc3b40e2c0fadd4c09e9",
    "61ddcc3b40e2c0fadd4c09f3",
    "61ddcc3b40e2c0fadd4c09e4",
    "61ddcc3b40e2c0fadd4c09e1",
    "61ddcc3b40e2c0fadd4c09e5",
]

User.findOneAndUpdate(
    { _id: idKatja },
    { $push: { posts: postsKatja } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Katja`)
    })
    .catch(err => console.log(err))

// Daniela
const idDaniela = "61ddcbee109f9908bd278200"
const postsDaniela = [
    "61ddcc3b40e2c0fadd4c09e8",
    "61ddcc3b40e2c0fadd4c09f4",
    "61ddcc3b40e2c0fadd4c09eb",
    "61ddcc3b40e2c0fadd4c09f0",
]

User.findOneAndUpdate(
    { _id: idDaniela },
    { $push: { posts: postsDaniela } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Daniela`)
    })
    .catch(err => console.log(err))

// Jennifer
const idJennifer = "61ddcbee109f9908bd278201"
const postsJennifer = [
    "61ddcc3b40e2c0fadd4c09ed",
    "61ddcc3b40e2c0fadd4c09ee",
    "61ddcc3b40e2c0fadd4c09f7",
    "61ddcc3b40e2c0fadd4c09f5",
    "61ddcc3b40e2c0fadd4c09e0",
]

User.findOneAndUpdate(
    { _id: idJennifer },
    { $push: { posts: postsJennifer } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(
            `Success, ${posts.length} were pushed to Jennifer, and overall ${
                postsJulien.length +
                postsDirk.length +
                postsJan.length +
                postsKatja.length +
                postsDaniela.length +
                postsJennifer.length
            }`
        )
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
