<template>
    <div class="container">
        <Alertbox :warningText="warningText" @isAlert="isAlert"></Alertbox>
        <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
        <div class="register-box">
            <div class="input-container">
                <input @keyup="check" type="text" v-model="registerInfos.username" id="username-tag" placeholder="Username">
                <input @keyup="check" type="email" v-model="registerInfos.email" id="email-tag" placeholder="Email">
                <input @keyup="check" type="password" v-model="registerInfos.password" id="pwd-tag" placeholder="Password">
            </div>
            <div class="btn-container" ref="btnBox">
                <button @click="register" :disabled="isDisabled" id="register-btn" type="submit">Register</button>
                <router-link to="/"><a href="#">Already have an account? Log in here</a></router-link>
            </div>
        </div>     
    </div>
</template>

<script>
    import AuthServices from '../../services/authServices';
    import Alertbox from '../components/alertbox.vue';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        components: {
            Loading,
            Alertbox,
        },
        data() {
            return {
                    warningText:'',
                    isLoading: false,
                    fullPage: true,
                    loader: 'bars',
                    isDisabled: true,
                    registerInfos:{
                        username: '',
                        email: '',
                        password: '',
                    }
            }
        },
        methods: {
            async register() {
                this.isLoading = true;
                try{
                    let response = await AuthServices.postRegisterInfos(this.registerInfos);
                    if(response.data.error){
                        this.isLoading = false; //request failed
                        this.warningText = response.data.error
                    }else{
                        this.isLoading = false; //request success
                        this.warningText = response.data.message;
                        this.registerInfos = {};
                    }
                }catch(err){
                    this.isLoading = false;
                    this.warningText = err.message;
                }
            },
            check(){
                if(this.registerInfos.email.length !== 0 && this.registerInfos.password.length !== 0 && this.registerInfos.username.length !== 0){
                    this.isDisabled = false
                }else{
                    this.isDisabled = true
                }
            },
            isAlert(){
                console.log('register model work box')
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
         background-color: var(--main-color);
        .register-box{
            position: relative;
            background-color: #fff;
            height: 23rem;
            width: 30rem;
            padding:30px 15px;
            border-radius: 10px;
            box-shadow: 9px 9px 13px -5px rgba(0,0,0,0.34);
            .input-container{
                width: 100%;
                height: 60%;
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
                height: 40%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around ;
                a{
                    color: #000000;
                }
                button{
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

    @media only screen and (max-width:576px){
        .container{
            background-color: #fff;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            .register-box{
                width: 22rem;
                box-shadow: none;
                .input-container{
                    input{
                        width:85% !important;
                    }
                }
            }
        }
    }
</style>