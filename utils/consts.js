const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://localhost/blog-cms"

module.exports = MONGO_URI
