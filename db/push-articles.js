require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

// Generate users
const User = require("../models/User.model")

// Julien
const idJulien = "61dcbea3c3f8a683bfe59875"
const postsJulien = [
    "61dcbeecb9a81326e6578630",
    "61dcbeecb9a81326e6578627",
    "61dcbeecb9a81326e6578633",
    "61dcbeecb9a81326e6578636",
    "61dcbeecb9a81326e6578629",
    "61dcbeecb9a81326e657863b",
    "61dcbeecb9a81326e657862f",
]
// 7

User.findOneAndUpdate(
    { _id: idJulien },
    { $push: { posts: postsJulien } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Julien`)
        // mongoose.connection.close()
    })
    .catch(err => console.log(err))

// Dirk
const idDirk = "61dcbea3c3f8a683bfe59876"
const postsDirk = ["61dcbeecb9a81326e6578632", "61dcbeecb9a81326e6578639"]
// 2

User.findOneAndUpdate(
    { _id: idDirk },
    { $push: { posts: postsDirk } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Dirk`)
        // mongoose.connection.close()
    })
    .catch(err => console.log(err))

// Jan
const idJan = "61dcbea3c3f8a683bfe59877"
const postsJan = [
    "61dcbeecb9a81326e6578635",
    "61dcbeecb9a81326e657862c",
    "61dcbeecb9a81326e657863c",
    "61dcbeecb9a81326e657862a",
]
// 4

User.findOneAndUpdate(
    { _id: idJan },
    { $push: { posts: postsJan } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Jan`)
        // mongoose.connection.close()
    })
    .catch(err => console.log(err))

// Katja
const idKatja = "61dcbea3c3f8a683bfe59878"
const postsKatja = [
    "61dcbeecb9a81326e6578631",
    "61dcbeecb9a81326e6578634",
    "61dcbeecb9a81326e6578624",
]
// 3

User.findOneAndUpdate(
    { _id: idKatja },
    { $push: { posts: postsKatja } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Katja`)
        // mongoose.connection.close()
    })
    .catch(err => console.log(err))

// Daniela
const idDaniela = "61dcbea3c3f8a683bfe59879"
const postsDaniela = [
    "61dcbeecb9a81326e6578625",
    "61dcbeecb9a81326e6578638",
    "61dcbeecb9a81326e6578626",
]
// 3

User.findOneAndUpdate(
    { _id: idDaniela },
    { $push: { posts: postsDaniela } },
    {
        new: true,
    }
)
    .then(posts => {
        console.log(`Success, ${posts.length} were pushed to Daniela`)
        // mongoose.connection.close()
    })
    .catch(err => console.log(err))

// Jennifer
const idJennifer = "61dcbea3c3f8a683bfe5987a"
const postsJennifer = [
    "61dcbeecb9a81326e6578628",
    "61dcbeecb9a81326e657862b",
    "61dcbeecb9a81326e657863a",
    "61dcbeecb9a81326e657862d",
    "61dcbeecb9a81326e6578623",
    "61dcbeecb9a81326e6578637",
    "61dcbeecb9a81326e657862e",
]
// 7

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
