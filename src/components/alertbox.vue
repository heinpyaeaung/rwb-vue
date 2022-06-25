<template>
     <div v-if="warningText" class="alert-box" ref="alert_box">
        <h3>{{warningText}}</h3>
        <p  id="cross-icon"><font-awesome-icon @click="isAlert" icon="xmark" /></p>
    </div>
</template>

<script>
    export default {
        props:['warningText'],
        methods: {
            isAlert() {
                this.$emit('isAlert')
            }
        },
    }
</script>

<style lang="scss" scoped>
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