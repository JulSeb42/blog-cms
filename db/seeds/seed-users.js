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

// Fake users
const names = [
    "Admin",
    "Dirk Faber",
    "Jan Kuester",
    "Katja Osterhagen",
    "Daniela Loewe",
    "Jennifer Eisenhauer",
]

const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

const roles = ["moderator", "writer"]

const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)

const tF = [true, false]

let fakeUsers = []

for (let i = 0; i < names.length; i++) {
    fakeUsers.push({
        fullName: names[i],
        email: convertToEmail(names[i]),
        password: hash,
        verified: true,
        verifyToken: getRandomString(20),
        role: names[i] === "Admin" ? "admin" : getRandom(roles),
        approved: true,
        featured: getRandom(tF),
        imageUrl:
            i <= 2
                ? `https://randomuser.me/api/portraits/men/${i}.jpg`
                : `https://randomuser.me/api/portraits/women/${i}.jpg`,
        bio,
    })
}

mongoose.connect(process.env.MONGODB_URI)

User.insertMany(fakeUsers)
    .then(user => {
        console.log(`Success, ${user.length} users were added to the database`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
