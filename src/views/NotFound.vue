<template>
    <div class="container">
        <header>404</header>
        <span>Not Found</span>
        <p>The resource request could not be found on this server</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .container{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        header{
            font-size: 10rem;
        }
        span{
            font-size: 3rem;
        }
        p{
            margin-top: 2rem;
            font-size: 1rem;
            letter-spacing: 1px;
        }
    }
</style>