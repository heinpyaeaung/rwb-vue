<template>
    <div class="container">
        <h1>{{ warningText }}</h1>
        <router-link to="/login"><a href="#">>> Go To Login Page</a></router-link>
    </div>
</template>

<script>
    import AuthServices from '../../services/authServices.js'
    export default {
        props: ['token'],
        data() {
            return {
                warningText: ''
            }
        },
        async mounted () {
           let response = await AuthServices.userVerify(this.token)
           if(response.data.error){
               this.warningText = response.data.error;
           }else{
               this.warningText = response.data.message;
           }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        h1{
            text-align: center;
            margin-bottom: 25px;
        }
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--main-color);
    }
</style>