import http from '../https-common.js'

class AdminContentServices {
    postContent(infos) {
        return http.post('/admin/addcontent', infos)
    }

    getAllContents() {
        return http.get('/admin/allcontents')
    }

}

export default new AdminContentServices;