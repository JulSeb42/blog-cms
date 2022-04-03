// Packages
require("dotenv/config")
const mongoose = require("mongoose")
const { slugify } = require("js-utils-julseb")

// Model
const Page = require("../../models/Page.model")

// Data
const titles = ["About", "Privacy policy", "Impressum", "Contact"]
const body = require("./bodyPage.json")
const bodyContact = "You can contact us by using this contact form."
const meta =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel lacus viverra, aliquam eros sed, accumsan purus. Aliquam urna dolor, hendrerit."

const allPages = []

mongoose.connect(process.env.MONGODB_URI)

for (let i = 0; i < titles.length; i++) {
    allPages.push({
        title: titles[i],
        body: titles[i] === "Contact" ? bodyContact : body[0].body,
        slug: slugify(titles[i]),
        metaDescription: meta,
        keywords: [slugify(titles[i])],
        draft: false,
        header: false,
        orderHeader: 0,
        footer: false,
        orderFooter: 0,
    })
}

Page.insertMany(allPages)
    .then(pages => {
        console.log(`Congrats, you pushed ${pages.length} pages to the db`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
