<template>
    <div>
        <Editor/>
        <div class="backward-btn" @click="goBack"><font-awesome-icon icon="arrow-left"/></div>
    </div>
</template>

<script>
    import Editor from '../components/editor.vue'
    export default {
        name:"Dashboard",
        components: {
            Editor
        },
        methods: {
            goBack() {
                this.$router.push('/admin/controlpanel')
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