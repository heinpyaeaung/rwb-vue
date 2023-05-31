<template>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <div>
        <Alertbox :warning-text="warningText" @isAlert="warningText=''"></Alertbox>
        <Editor></Editor>
        <div class="backward-btn" @click="goBack"><font-awesome-icon icon="arrow-left"/></div>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';      
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Alertbox from '../components/alertbox'
    import Editor from '../components/editor'
    export default {
        components: {Alertbox, Editor, Loading },
        data() {
            return {
                warningText: '',
                isLoading: false,
                fullPage: true,
                loader: 'bars',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        },
        
    }
</script>

<style lang="scss" scoped>
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
</style>