import http from '../https-common.js'

class ProfileServices {
    getAllContents(){
        return http.get('/profile/mycontents')
    }

    deleteContent(id){
        return http.delete(`/profile/deletecontent/${id}`)
    }
}

export default new ProfileServices;