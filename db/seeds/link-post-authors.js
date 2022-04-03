// Packages
require("dotenv/config")
const mongoose = require("mongoose")

// Model
const User = require("../../models/User.model")

mongoose.connect(process.env.MONGODB_URI)

const idAdmin = "62399c8b05749e1a7d1b9e11"

const postsAdmin = [
    "6249883f9e4be39ebc9e6de1",
    "6249883f9e4be39ebc9e6de6",
    "6249883f9e4be39ebc9e6de8",
]

User.findOneAndUpdate(
    { _id: idAdmin },
    { $push: { posts: postsAdmin } },
    { new: true }
)
    .then(posts => {
        console.log(posts)
    })
    .catch(err => console.log(err))

const idDirk = "62399c8b05749e1a7d1b9e12"

const postsDirk = [
    "6249883f9e4be39ebc9e6de0",
    "6249883f9e4be39ebc9e6de3",
    "6249883f9e4be39ebc9e6de7",
    "6249883f9e4be39ebc9e6de9",
    "6249883f9e4be39ebc9e6dea",
    "6249883f9e4be39ebc9e6def",
    "6249883f9e4be39ebc9e6df2",
    "6249883f9e4be39ebc9e6df5",
]

User.findOneAndUpdate(
    { _id: idDirk },
    { $push: { posts: postsDirk } },
    { new: true }
)
    .then(posts => {
        console.log(posts)
    })
    .catch(err => console.log(err))

const idJan = "62399c8b05749e1a7d1b9e13"

const postsJan = [
    "6249883f9e4be39ebc9e6ded",
    "6249883f9e4be39ebc9e6dee",
    "6249883f9e4be39ebc9e6df4",
]

User.findOneAndUpdate(
    { _id: idJan },
    { $push: { posts: postsJan } },
    { new: true }
)
    .then(posts => {
        console.log(posts)
    })
    .catch(err => console.log(err))

const idKatja = "62399c8b05749e1a7d1b9e14"

const postsKatja = [
    "6249883f9e4be39ebc9e6de2",
    "6249883f9e4be39ebc9e6dec",
    "6249883f9e4be39ebc9e6df6",
    "6249883f9e4be39ebc9e6df8",
]

User.findOneAndUpdate(
    { _id: idKatja },
    { $push: { posts: postsKatja } },
    { new: true }
)
    .then(posts => {
        console.log(posts)
    })
    .catch(err => console.log(err))

const idDaniela = "62399c8b05749e1a7d1b9e15"

const postsDaniela = [
    "6249883f9e4be39ebc9e6de4",
    "6249883f9e4be39ebc9e6df1",
    "6249883f9e4be39ebc9e6df7",
    "6249883f9e4be39ebc9e6df9",
]

User.findOneAndUpdate(
    { _id: idDaniela },
    { $push: { posts: postsDaniela } },
    { new: true }
)
    .then(posts => {
        console.log(posts)
    })
    .catch(err => console.log(err))

const idJennifer = "62399c8b05749e1a7d1b9e16"

const postsJennifer = [
    "6249883f9e4be39ebc9e6de5",
    "6249883f9e4be39ebc9e6deb",
    "6249883f9e4be39ebc9e6df0",
    "6249883f9e4be39ebc9e6df3",
]

User.findOneAndUpdate(
    { _id: idJennifer },
    { $push: { posts: postsJennifer } },
    { new: true }
)
    .then(posts => {
        console.log(posts)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
