import http from '../https-common.js'

class AuthServices {
    //register section
    getRegisterPage(){
        return http.get('/register')
    };
    postRegisterInfos(data){
        return http.post('/register', data)
    };

    //Login section
    getLoginPage(){
        return http.get('/login')
    };
    postLoginInfos(data){
        return http.post('/login', data)
    }

    //logout section
    logout(){
        return http.get('/logout')
    }

    //change password 
    changePwd(data){
        return http.patch('/user/profile/changepwd', data)
    }

    //forgot section
    postForgotInfos(data){
        return http.post('/forgot', data)
    }
    postResetInfos(data){
        return http.post('/reset', data)
    }

    //del account
    delUserAcc(){
        return http.get('/delete/my_account')
    }

    //verify user
    userVerify(token){
        return http.get(`/verify/${token}`)
    }
}

export default new AuthServices();