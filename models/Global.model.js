const { Schema, model } = require("mongoose")

const globalSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        baseline: String,
        metaDescription: String,
        favicon: String,
        email: String,
        cover: String,
        keywords: Array,
        type: String,
        language: String,
    },
    {
        timestamps: true,
    }
)

const Global = model("Global", globalSchema)

module.exports = Global
