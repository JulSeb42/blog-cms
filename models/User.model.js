const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        fullName: {
            type: String,
            required: true,
        },
        bio: String,
        password: String,
        imageUrl: String,
        verified: Boolean,
        verifyToken: String,
        resetToken: String,

        role: {
            type: String,
            enum: ["admin", "writer", "moderator"],
        },

        approved: Boolean,
        featured: Boolean,

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const User = model("User", userSchema)

module.exports = User
