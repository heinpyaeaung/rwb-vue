<template>
    <div>
        <header>ADMIN PANEL</header>
        <div class="container">
            <div class="item">
                <router-link id="anchor" to="/admin/dashboard">Add Content</router-link>
            </div>
             <div class="item">
                <router-link id="anchor" to="/admin/userslist">User Control</router-link>
            </div>
             <div class="item">
                <router-link id="anchor" to="/admin/dashboard">Add Content</router-link>
            </div>
             <div class="item">
                <router-link id="anchor" to="/admin/dashboard">Add Content</router-link>
            </div>
             <div class="item">
                <router-link id="anchor" to="/admin/userslist">User Control</router-link>
            </div>
             <div class="item">
                <router-link id="anchor" to="/admin/dashboard">Add Content</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    header{
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: bolder;
        letter-spacing: 3px;
        text-align: center;
    }
    .container{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .item{
            background-color: #242038;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            height: 20vh;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
            #anchor{
                font-size: 30px;
                color: #fff;
                text-decoration: none;
                letter-spacing: 1px;
            }
        }
    }
    @media screen and (max-width: 576px){
        .container{
            display: flex;
            flex-direction: column;
            padding: 0 10px;
            .item{
                width: 100%;
                margin: 0.5rem 0;
            }
        }
    }
</style>