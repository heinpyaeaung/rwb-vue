<template>
    <div class="container">
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
        <p>If you forgot your password, you can reset new password with your email address.We'll send reset token to verify you</p>
        <div>
            <span v-show="warningText" id="warning-text"><font-awesome-icon id="exclamation-circle" icon="exclamation-circle"/>{{warningText}}</span>
             <span v-show="successText" id="success-text">{{successText}}</span>
        </div>
        <input type="email" v-model="infos.email" @keyup="check" placeholder="Search your email">
        <button @click="searchEmail" :disabled="isDisabled">Search</button>
    </div>
</template>

<script>
    import AuthServices from '../../services/authServices'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        components: {
            Loading,
        },
        data() {
            return {
                infos:{
                    email: ''
                },
                warningText: '',
                successText:'',
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                isDisabled: true
            }
        },
        methods: {
            async searchEmail() {
                this.isLoading = true;
                let response =  await AuthServices.postForgotInfos(this.infos)
                if(response.data.error){
                    this.isLoading = false;
                    this.warningText = response.data.error;
                }else{
                    this.isLoading = false;
                    this.$router.push('/reset')
                }        
            },
            check(){
                if(this.infos.email.length !== 0){
                    this.isDisabled = false;
                }else{
                    this.isDisabled = true
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 100%;
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        p{
            margin-bottom: 15px;
            letter-spacing: 0.5px;
            line-height: 25px;
        }
        div{
           margin-bottom: 10px;
           #success-text{
                border-radius: 3px;
                border: 2px solid rgba(47, 233, 0, 0.979);
                // letter-spacing: 1px;
                padding: 3px 8px;
                width: 250px;
                background-color: rgba(8, 253, 41, 0.658) ;
                margin-bottom: 10px;
           }
            #warning-text{
                border-radius: 3px;
                border: 2px solid rgba(233, 27, 0, 0.979);
                letter-spacing: 1px;
                padding: 3px 8px;
                background-color: rgba(253, 37, 8, 0.658) ;
                #exclamation-circle{
                    font-size: 13px;
                    margin-right: 5px;
                }
           }
        }
        input{
            padding: 5px;
            margin-right: 10px;
            outline: none;
        }
        button{
            cursor: pointer;
            padding: 5px 10px;
            background-color: #000000;
            color: #fff;
            letter-spacing: 1px;
            outline: none;
        }
    }
</style>