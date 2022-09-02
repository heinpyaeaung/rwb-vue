import http from '../https-common.js'

class UserContentServices {
    getAllContents(page,limit){
        return http.get('/user/allcontents',{
            params:{
                page,
                limit
            }
        })
    }
    
    getSingleDetailsPost(id){
        return http.get(`/user/content/${id}`)
    }

    gettingByType(type,page,limit){
        return http.get('/user/content',{
            params:{
                type,
                page,
                limit
            }
        })
    }

    searchingByName(header,page,limit){
        return http.get('/user/content/searchby',{
            params:{
                header,
                page,
                limit
            }
        })
    }
}

export default new UserContentServices();