<template>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <div class="container">
        <span v-if="warningText" id="warning-text"><font-awesome-icon id="exclamation-circle" icon="exclamation-circle"/>{{warningText}}</span>
        <span v-if="successText" id="success-text">{{successText}}</span>
        <input v-model="infos.resetpwd" type="password" placeholder="Reset Password">
        <input v-model="infos.newpwd"  @keyup="check" type="password" placeholder="New Password">
        <input v-model="infos.repwd" @keyup="check" type="password" placeholder="Re-Type Password">
        <button @click="save" :disabled="disabled">Save</button>
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
                warningText:'',
                successText:'',
                isLoading: false,
                loader: 'bars',
                fullPage: true,
                isWarning: false,
                disabled: true,
                infos:{
                    resetpwd:'',
                    newpwd:'',
                    repwd:''
                }
            }
        },
        methods: {
            async save() {
                this.isLoading = true;
                let response = await AuthServices.postResetInfos(this.infos);
                this.isLoading = false;
                if(response.data.error){
                     this.successText = '';
                    this.warningText = response.data.error;
                }else{
                    this.warningText = '';
                    this.successText= response.data.message;
                }
            },
            check(){
                if(this.infos.newpwd !== this.infos.repwd){
                    this.warningText = 'didn\'t match password'
                    this.disabled = true
                }else{
                    this.warningText = ''
                    this.disabled = false
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
        display: flex;
        flex-direction: column;
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
            #exclamation-circle{
                margin-right: 5px;
                font-size: 13px;
            }
            border-radius: 3px;
            border: 2px solid rgba(233, 27, 0, 0.979);
            letter-spacing: 1px;
            padding: 3px 8px;
            width: 250px;
            background-color: rgba(253, 37, 8, 0.658) ;
            margin-bottom: 10px;
        }
        input{
            width: 250px;
            letter-spacing: 2px;
            padding: 5px;
            margin-right: 10px;
            outline: none;
            margin-bottom: 15px;
        }
        button{
            cursor: pointer;
            width: 100px;
            padding: 5px 10px;
            background-color: #000000;
            color: #fff;
            letter-spacing: 1px;
            outline: none;
        }
    }
</style>