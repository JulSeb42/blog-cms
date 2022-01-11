const { Schema, model } = require("mongoose")

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: String,
        time: String,
        category: String,
        tags: Array,
        slug: {
            type: String,
            unique: true,
        },
        draft: Boolean,
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        body: String,
        // comments: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Comment",
        //     },
        // ],
        imageUrl: String,
    },
    {
        timestamps: true,
    }
)

const Post = model("Post", postSchema)

module.exports = Post
