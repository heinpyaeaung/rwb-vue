import http from '../https-common.js'

class AdminContentServices {
    postContent(infos) {
        return http.post('/member/addcontent', infos)
    }

    getAllContents() {
        return http.get('/allcontents')
    }

    deleteContent(id){
        return http.delete(`/admin/deletecontent/${id}`)
    }

    postContentImgToCl(data){
        return http.post('https://api.cloudinary.com/v1_1/drtoeefis/image/upload', data)
    }

    deleteContentImgFromCl(img_id){
        return http.delete(`${img_id}`)
    }
}

export default new AdminContentServices;