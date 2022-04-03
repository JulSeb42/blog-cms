// Server
import http from "./http-common"

class SearchService {
    search(query) {
        return http.get(`/search/search/${query}`)
    }
}

export default new SearchService()
