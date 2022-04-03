// Server
import http from "./http-common"

class GlobalService {
    getData() {
        return http.get("/global-data/data")
    }

    editData(id, requestBody) {
        return http.put(`/global-data/edit-global/${id}`, requestBody)
    }

    contact(requestBody) {
        return http.post("/global-data/contact", requestBody)
    }
}

export default new GlobalService()
