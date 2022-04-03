// Server
import http from "./http-common"

class CommentService {
    allComments() {
        return http.get("/comments/all-comments")
    }

    comment(id) {
        return http.get(`/comments/comment/${id}`)
    }

    newComment(requestBody) {
        return http.post("/comments/new-comment", requestBody)
    }

    deleteComment(id) {
        return http.delete(`/comments/delete-comment/${id}`)
    }
}

export default new CommentService()
