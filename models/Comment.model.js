const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        poster: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        date: String,
        time: String,
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment
