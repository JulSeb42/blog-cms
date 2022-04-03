// Server
import http from "./http-common"

class AdminService {
    newUser(requestBody) {
        return http.post("/admin/new-user", requestBody)
    }

    editRole(id, role) {
        return http.put(`/admin/edit-role/${id}`, role)
    }

    featureUser(id, featured) {
        return http.put(`/admin/feature-user/${id}`, featured)
    }

    approveUser(id) {
        return http.put(`/admin/approve-user/${id}`)
    }

    deleteUser(id) {
        return http.delete(`/admin/delete-user/${id}`)
    }
}

export default new AdminService()
