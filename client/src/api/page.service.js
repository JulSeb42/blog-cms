// Server
import http from "./http-common"

class PageService {
    allPages() {
        return http.get("/pages/all-pages")
    }

    publishedPages() {
        return http.get("/pages/published-pages")
    }

    pageId(id) {
        return http.get(`/pages/page/${id}`)
    }

    pageSlug(slug) {
        return http.get(`/pages/find-page/${slug}`)
    }

    newPage(requestBody) {
        return http.post("/pages/new-page", requestBody)
    }

    editPage(id, requestBody) {
        return http.put(`/pages/edit-page/${id}`, requestBody)
    }

    showHeader(id, show) {
        return http.put(`/pages/show-header/${id}`, show)
    }

    orderHeader(id, order) {
        return http.put(`/pages/order-header/${id}`, order)
    }

    showFooter(id, show) {
        return http.put(`/pages/show-footer/${id}`, show)
    }

    orderFooter(id, order) {
        return http.put(`/pages/order-footer/${id}`, order)
    }

    deletePage(id) {
        return http.delete(`/pages/delete-page/${id}`)
    }
}

export default new PageService()
