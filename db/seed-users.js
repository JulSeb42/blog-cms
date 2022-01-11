require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

// Generate users
const User = require("../models/User.model")

const bcrypt = require("bcryptjs")
const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)

const convertToEmail = str => {
    return `${str.toString().toLowerCase().replace(" ", "-")}@email.com`
}

const getRandomString = require("../utils/getRandomString")

const names = [
    "Dirk Faber",
    "Jan Kuester",
    "Katja Osterhagen",
    "Daniela Loewe",
    "Jennifer Eisenhauer",
]

const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

let fakeUsers = []

const realUser = {
    fullName: "Julien Sebag",
    email: "julien.sebag@me.com",
    password: hash,
    verified: true,
    verifyToken: getRandomString(20),
    role: "admin",
    approved: true,
    imageUrl:
        "https://res.cloudinary.com/dyfxmafvr/image/upload/v1641851092/blog-cms/khbmmw8bkrrmda6s6rwg.jpg",
    bio: "Developer and owner of this amazing site ❤️",
}

for (let i = 0; i < names.length; i++) {
    fakeUsers.push({
        fullName: names[i],
        email: convertToEmail(names[i]),
        password: hash,
        verified: true,
        verifyToken: getRandomString(20),
        role: "writer",
        approved: true,
        imageUrl:
            i <= 1
                ? `https://randomuser.me/api/portraits/men/${i}.jpg`
                : `https://randomuser.me/api/portraits/women/${i}.jpg`,
        bio,
    })
}

User.insertMany(realUser)
    .then(user => {
        console.log(`Success, ${user.length} user was added to the database`)
    })
    .catch(err => console.log(err))

User.insertMany(fakeUsers)
    .then(user => {
        console.log(`Success, ${user.length} users were added to the database`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))

// fullName: String,
// email: String,
// password: String,
// verified: Boolean,
// verifyToken: String,
// role: "writer",
// approved: true,

// posts: [
//     {
//         type: Schema.Types.ObjectId,
//         ref: "Post",
//     },
// ],
