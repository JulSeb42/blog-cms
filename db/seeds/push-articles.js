require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

// Generate users
const User = require("../../models/User.model")

// Julien
const idAdmin = "61e0a1f50b56e3317ee7c4ed"
const postsAdmin = [
    "61e0a3c4d4c3b94774e625b7",
    "61e0a3c4d4c3b94774e625b4",
    "61e0a3c4d4c3b94774e625b2",
    "61e0a3c4d4c3b94774e625ba",
    "61e0a3c4d4c3b94774e625bc",
    "61e0a3c4d4c3b94774e625c1",
]

User.findOneAndUpdate(
    { _id: idAdmin },
    { $push: { posts: postsAdmin } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(posts)
    })
    .catch(err => console.log(err))

// Dirk
const idDirk = "61e0a1f50b56e3317ee7c4ee"
const postsDirk = [
    "61e0a3c4d4c3b94774e625c6",
    "61e0a3c4d4c3b94774e625b5",
    "61e0a3c4d4c3b94774e625af",
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
const idJan = "61e0a1f50b56e3317ee7c4ef"
const postsJan = [
    "61e0a3c4d4c3b94774e625b6",
    "61e0a3c4d4c3b94774e625bd",
    "61e0a3c4d4c3b94774e625b0",
    "61e0a3c4d4c3b94774e625bb",
    "61e0a3c4d4c3b94774e625ae",
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
const idKatja = "61e0a1f50b56e3317ee7c4f0"
const postsKatja = [
    "61e0a3c4d4c3b94774e625c2",
    "61e0a3c4d4c3b94774e625c3",
    "61e0a3c4d4c3b94774e625c4",
    "61e0a3c4d4c3b94774e625ad",
    "61e0a3c4d4c3b94774e625c5",
    "61e0a3c4d4c3b94774e625b8",
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
const idDaniela = "61e0a1f50b56e3317ee7c4f1"
const postsDaniela = [
    "61e0a3c4d4c3b94774e625c0",
    "61e0a3c4d4c3b94774e625b3",
    "61e0a3c4d4c3b94774e625bf",
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
const idJennifer = "61e0a1f50b56e3317ee7c4f2"
const postsJennifer = [
    "61e0a3c4d4c3b94774e625b1",
    "61e0a3c4d4c3b94774e625be",
    "61e0a3c4d4c3b94774e625b9",
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
                postsAdmin.length +
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
