// Server
import http from "./http-common"

class PostService {
    allPosts() {
        return http.get("/posts/all-posts")
    }

    publishedPosts() {
        return http.get("/posts/published-posts")
    }

    post(id) {
        return http.get(`/posts/post/${id}`)
    }

    postSlug(slug) {
        return http.get(`/posts/post-slug/${slug}`)
    }

    newPost(requestBody) {
        return http.post("/posts/new-post", requestBody)
    }

    editPost(id, requestBody) {
        return http.put(`/posts/edit-post/${id}`, requestBody)
    }

    deletePost(id) {
        return http.delete(`/posts/delete-post/${id}`)
    }
}

export default new PostService()
