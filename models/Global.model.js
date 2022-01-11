const { Schema, model } = require("mongoose")

const globalSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        metaDescription: String,
        favicon: String,
        email: String,
        cover: String,
        keywords: Array,
    },
    {
        timestamps: true,
    }
)

const Global = model("Global", globalSchema)

module.exports = Global
