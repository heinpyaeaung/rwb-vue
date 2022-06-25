import http from '../https-common.js'

class AdminUserServices {
    getAllUsers(page,limit){
        return http.get('/admin/userslist/', {
            params: {
                page,
                limit
            }
        })
    }   
    changePermission(id,action){
        return http.post(`/admin/userslist/${action}/${id}`)
    }
    searchAnEmail(email){
        return http.get('/admin/userslist/searchby', {
            params: {
                email
            }
        })
    }
}

export default new AdminUserServices;