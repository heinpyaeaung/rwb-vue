<template>
    <AlertBox :warningText="warningText" @isAlert="warningText=''"/>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <div class="container">
        <h2>Account Setting</h2>
        <div class="logout-container">
            <h5>Log out your account</h5>
            <button @click="logOut">Log out</button>
       </div>
       <div class="delete-container">
            <h5>Delete your account permanently <p>( Warning : this will also delete all of your infos related with this account )</p></h5>
            <button @click="delAcc">Delete</button>
       </div>
       <div class="pwd-container">
           <h3>Change your password</h3>
           <div>
                <p>Current password:</p>
                <input v-model="changedInfos.currentpwd" type="text">
           </div>
           <div>
                <p>New password:</p>
                <input v-model="changedInfos.newpwd" type="text">
           </div>
           <div>
               <button @click="changePwd">Change</button>
           </div>
       </div>
       <div class="backward-btn" @click="goBack"><font-awesome-icon icon="arrow-left"/></div>
    </div>
</template>

<script>
    import AuthServices from '../../services/authServices.js'
    import AlertBox from '../components/alertbox.vue';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        components: {
            Loading,
            AlertBox,
        },
        data() {
            return {
                warningText: '',
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                changedInfos: {
                    currentpwd: '',
                    newpwd: ''
                }
            }
        },
        methods: {
            async logOut(){
                this.isLoading = true;
                let res = await AuthServices.logout();
                if(res.data.error){
                    this.isLoading = false;
                    return this.warningText = res.data.error;
                }
                this.isLoading = false;
                this.$router.push('/')
            },
            async delAcc(){
                this.isLoading = true;
                let res = await AuthServices.delUserAcc();
                if(res.data.error){
                    this.isLoading = false;
                    return this.warningText = res.data.error;
                }
                this.isLoading = false;
                this.$router.push('/')
            },
            async changePwd(){
                this.isLoading = true;
                let res = await AuthServices.changePwd(this.changedInfos)
                if(res.data.error){
                    this.isLoading = false;
                    this.changedInfos = {};
                    return this.warningText = res.data.error;
                }
                this.isLoading = false;
                this.warningText = res.data.message;
                this.changedInfos = {};
            },
            goBack() {
                this.$router.go(-1)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        padding: 5px 10px;
        .logout-container{
            margin-top: 15px;
            button{
                margin-top: 8px;
                width: 3rem;
                padding: 2px 4px;
            }
        }
        .delete-container{
            margin-top: 15px;
            button{
                margin-top: 8px;
                width: 3rem;
                padding: 2px 4px;
            }
        }
        .pwd-container{
            padding: 10px 0;
            margin-top: 15px;
            border-top: 0.5px solid black;
            div{
                margin-top: 8px;
                p{
                    margin-bottom: 5px;
                }
                input{
                    padding: 3px;
                    width: 10rem;
                    letter-spacing: 0.5px;
                    border-radius: 3px;
                }
                button{
                    margin-top: 5px;
                    width: 3rem;
                    padding: 2px 4px;
                }
            }
        }
        .backward-btn{
            cursor: pointer;
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            bottom: 2%;
            right: 2%;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background-color: #fdfdfd;
            box-shadow: rgba(99, 99, 99, 0.404) 0px 2px 8px 0px;
            transition: all 0.1s ease;
            &:hover{
                transform: scale(1.05);
            }
        }
    }
</style>