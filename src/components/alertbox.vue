<template>
   <transition name="model">
        <div v-if="warningText" class="dropbox" @click="isAlert">  
            <div class="alert-box" ref="alert_box">
                <h3>{{warningText}}</h3>
                <!-- <p id="cross-icon"><font-awesome-icon icon="xmark" @click="isAlert" /></p> -->
            </div>        
        </div>
   </transition>
</template>

<script>
    export default {
        props:['warningText'],
        methods: {
            isAlert() {
                this.$emit("isAlert")
            }
        },
    }
</script>

<style lang="scss" scoped>
    .model-enter-from{
        opacity: 0;
    }
    .model-enter-to{
        opacity: 1;
    }
    .model-enter-active{
        transition: all 0.5s ease;
    }
    .model-leave-from{
        opacity: 1;
    }
    .model-leave-to{
        opacity: 0;
    }
    .model-leave-active{
        transition: all 0.5s ease;
    }
    .dropbox{
        position: fixed;
        top:0;
        width: 100%;
        height: 100%;
        background: rgba(240, 238, 238, 0.5);
        z-index: 3000;
    }
    .alert-box{
        position: absolute;
        top: 5%;
        left: 35%;
        right: 35%;
        text-align: center;
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 0 15px 0 0;
        justify-content: space-between;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        h3{
            letter-spacing: 1px;
            padding: 20px;
            position: relative;
            #cross-icon{
                height: 100%;
                position: absolute;
                right: 5%;
                top: 37%;
                cursor: pointer;
            }
        }
    }
    @media screen and (max-width:992px){
        .alert-box{
            left: 30%;
            right: 30%;
        }
    }
    @media only screen and (max-width:576px){
        .alert-box{
            left: 5%;
            right: 5%;
        }
    }
</style>