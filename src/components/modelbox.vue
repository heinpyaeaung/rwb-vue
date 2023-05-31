<template>
    <div class="model-container">
        <div class="model-text"><span>{{modeltext}}</span></div>
        <div class="model-btn">
            <span id="yes-btn">Yes</span>
            <span id="no-btn">No</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['modeltext']
    }
</script>

<style lang="scss" scoped>
.model-container{
    z-index: 4000;
    position: fixed;
    top: 20rem;
    left: 27%;
    width: 10rem;
    height: 4rem;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    .model-text{
        width: 100%;
        text-align: center;

    }
    .model-btn{
        width: 100%;
        text-align: center;
        #yes-btn,#no-btn{
            border: 1px solid grey;
            border-bottom: none;
            display: inline-block;
            width: 50%;
            padding: 5px;
        }

    }
}
</style>