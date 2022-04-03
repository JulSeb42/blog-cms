// Packages
require("dotenv/config")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const {
    convertToEmail,
    getRandom,
    getRandomString,
} = require("js-utils-julseb")

// Model
const User = require("../../models/User.model")

const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)

const fakeUser = {
    fullName: "Jul",
    email: "a@b.com",
    password: hash,
    verified: true,
    verifyToken: getRandomString(20),
    role: "writer",
    approved: false,
    featured: false,
    imageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
}

mongoose.connect(process.env.MONGODB_URI)

User.insertMany(fakeUser)
    .then(user => {
        console.log(`Success, ${user.length} users were added to the database`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))