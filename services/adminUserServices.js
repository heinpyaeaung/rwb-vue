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

    delUser(user_infos){
        return http.delete('/admin/remove/member_acc',{
            params:{
                user_infos
            }
        })
    }
}

export default new AdminUserServices;