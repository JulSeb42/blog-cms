const { Schema, model } = require("mongoose")

const pageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: String,
        slug: {
            type: String,
            unique: true,
        },
        metaDescription: String,
        keywords: Array,
        draft: Boolean,
        header: Boolean,
        orderHeader: Number,
        footer: Boolean,
        orderFooter: Number,
    },
    {
        timestamps: true,
    }
)

const Page = model("Page", pageSchema)

module.exports = Page
