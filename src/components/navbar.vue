<template>
    <div class="navbar-container">
        <h3>RWB</h3>
        <div class="searchbox-container">
            <input type="text" placeholder="Search a content">
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .navbar-container{
        width: 100%;
        padding: 25px 15px;
        background-color: var(--second-color);
        display: flex;
        h3{
            width: 20%;
            font-size: 2rem;
        }
        .searchbox-container{
            width: 80%;
            text-align: end;
            input{
                width: 20rem;
                height: 30px;
                border-radius: 5px;
                padding: 15px 5px;
            }
        }
    }
    @media only screen and (max-width: 576px) {
        .navbar-container{
            flex-wrap: wrap;
            h3{
                width: 100%;
                text-align: center;
            }
            .searchbox-container{
                width: 100%;
                text-align: center;
                margin-top: 10px;
                position: absolute;
            }
        }
    }
</style>