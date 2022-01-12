const { Schema, model } = require("mongoose")

const pageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: String,
        slug: String,
        metaDescription: String,
        keywords: Array,
        draft: Boolean,
    },
    {
        timestamps: true,
    }
)

const Page = model("Page", pageSchema)

module.exports = Page
