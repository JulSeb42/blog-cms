// Packages
require("dotenv/config")
const mongoose = require("mongoose")

// Model
const Global = require("../../models/Global.model")

mongoose.connect(process.env.MONGODB_URI)

const emptyGlobal = {
    name: "Amazing blog",
    baseline: "",
    metaDescription: "",
    favicon: "",
    email: "",
    cover: "",
    keywords: [],
}

Global.insertMany(emptyGlobal)
    .then(() => {
        console.log("Congrats, you created an empty global object in the db")
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
