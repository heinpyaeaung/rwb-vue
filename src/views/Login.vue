<template>
    <div class="container">
        <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
        <Alertbox :warningText="warningText" @isAlert='isAlert'></Alertbox>
        <div class="login-box">
            <div class="input-container">
                <input type="email" @keyup="check" v-model="loginInfos.email" id="email-tag" placeholder="Email">
                <input type="password" @keyup="check" v-model="loginInfos.password" id="pwd-tag" placeholder="Password">
            </div>
            <div class="btn-container" ref="btnBox">
                <router-link to="/forgot"><a href="#">forgot password ?</a></router-link>
                <button @click="login" :disabled="isDisabled" id="register-btn" type="submit">Login</button>
                <router-link to="/register"><a href="#">Don't you have an account? sing up here</a></router-link>
            </div>
        </div>             
        <p id="guest-mode-text" @click="guestMode">Guest Mode</p>
    </div>
</template>

<script>
    import authServices from '../../services/authServices';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Alertbox from '../components/alertbox.vue';
    export default {
        components: {
            Loading,
            Alertbox
        },
        data() {
            return {
                    warningText:'',
                    isLoading: false,
                    fullPage: true,
                    loader: 'bars',
                    isDisabled: true,
                    loginInfos:{
                        email: '',
                        password: '',
                    }
            }
        },
        methods: {
            async login() {
                this.isLoading = true;
                try{
                    let response =  await authServices.postLoginInfos(this.loginInfos);
                    if(response.data.error){
                        this.isLoading = false;
                        this.warningText = response.data.error;
                    }
                    if(response.data.success){
                        await localStorage.setItem('isConfirmed', response.data.success)
                        this.$router.push("/home")
                    }
                }catch(err){
                    this.isLoading = false;
                    this.warningText = err.message;
                }
            },
            guestMode(){
                this.isLoading = true;
                localStorage.setItem('isConfirmed', true);
                this.$router.push("/home");
            },
            check(){
                if(this.loginInfos.email.length !== 0 && this.loginInfos.password.length !== 0){
                    this.isDisabled = false
                }else{
                    this.isDisabled = true
                }
            },
            isAlert(){
                this.warningText = '';
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
         background-color: red;
         height: 100vh;
         display: flex;
         align-items: center;
         justify-content: center;
         flex-direction: column;
         background-color: var(--main-color);
        .login-box{
            position: relative;
            background-color: #fff;
            height: 23rem;
            width: 30rem;
            padding:30px 15px;
            border-radius: 10px;
            box-shadow: 9px 9px 13px -5px rgba(0,0,0,0.34);
            .input-container{
                width: 100%;
                height: 55%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                input{
                    font-size: 1rem;
                    width: 75%;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    padding: 3px 6px;
                    height: 35px;                  
                    outline: none;
                    letter-spacing: 0.5px;
                }
            }
            .btn-container{
                width: 100%;
                height: 45%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around ;
                a{
                    color: #000000;
                }
                #register-btn{
                    cursor: pointer;
                    color: #fff;
                    letter-spacing: 2px;
                    font-size: 20px;
                    background-color: var(--second-color);
                    width: 35%;
                    border-radius: 5px;
                    height: 35px;
                    border: none;
                    transition-duration: 0.5s;
                    &:hover{
                        font-size: 17px;
                        width: 36%;
                        -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
                        box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
                    }
                    &:active{
                        box-shadow: none;
                    }
                }
            }
        }
    }
    #guest-mode-text{
        position: absolute;
        bottom: 4%;
        cursor: pointer;
    }
    @media screen and (max-width:576px){
        .container{
            background-color: #fff;
            .login-box{
                box-shadow: none;
                width: 22rem;
                .input-container{
                    input{
                        width:85% !important;
                    }
                }
            }
        }
    }
</style>