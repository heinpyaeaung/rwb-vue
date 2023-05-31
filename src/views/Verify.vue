<template>
    <div class="container">      
        <section>
            <div class="thumbs-container">
                <font-awesome-icon v-if="successText" id="thumbs" icon="thumbs-up"/>
                <font-awesome-icon v-else id="thumbs" icon="face-frown"/>
            </div>
            <h2 v-if="successText">{{successText}}</h2>
            <h2 v-if="warningText">{{warningText}}</h2>
            <p v-if="successText">
                Thank you for your support. we have successfully verified your rwb account.
                Please go back to your login page and you can now proceed to login.
            </p>
        </section>
    </div>
</template>

<script>
    import AuthServices from '../../services/authServices.js'
    export default {
        props: ['token'],
        data() {
            return {
                warningText: '',
                successText:''
            }
        },
        async mounted() {
           let response = await AuthServices.userVerify(this.token)
           if(response.data.error){
               this.successText = '';
               this.warningText = response.data.error;
           }else{
               this.warningText = '';
               this.successText = response.data.message;
           }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
        section{
            min-height: 40vh;
            width: 40%;
            box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            p{
                width: 70%;
                text-align: center;
            }
            .thumbs-container{
                box-shadow: rgba(245, 242, 242, 0.3) 0px 2px 8px 0px;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgb(87, 194, 66);
                border-radius: 50%;
                margin-top: -5rem;
                #thumbs{
                    font-size: 5rem;
                    color: rgb(226, 226, 225);
                }
            }
        }
    }
    @media screen and (max-width:768px){
        .container{
            section{
                min-height: 30vh;
                width: 80%;
                .thumbs-container{
                    #thumbs{
                        font-size: 3rem;
                    }
                }
            }
        }
    }
</style>