<template>
    <Navbar/>
    <div>
        <h1>Home Page</h1>
        <cld-image cloudName="drtoeefis" publicId="https://res.cloudinary.com/drtoeefis/image/upload/v1655924486/rwb_content_image/emumjjhdxbnwkjf2yuio.png">
            <cld-transformation crop="scale" width="200" angle="10" />
        </cld-image>
    </div>
</template>

<script>
    import Navbar from '../components/navbar.vue'
    export default {
        components: {
            Navbar,
        },
    }
</script>

<style lang="scss" scoped>

</style>