<template>
    <Navbar/>
    <!-- <div v-html="image"></div> -->
</template>

<script>
    import Navbar from '../components/navbar.vue'
    import {Cloudinary} from "cloudinary-core"
    export default {  
        components: {
          Navbar,
        },
        data() {
            return {
                image: ''
            }
        },
        mounted () {
            const cl = new Cloudinary({cloud_name: "drtoeefis"});
            // https://res.cloudinary.com/drtoeefis/image/upload/v1657736839/rwb_content_image/eu3fou8l6xgzq45nzgef.jpg
            this.image = cl.imageTag("v1655924486/rwb_content_image/eu3fou8l6xgzq45nzgef.jpg", { width: 100, height: 250, crop: "pad"}).toHtml()
           
        },
    }
</script>

<style lang="scss" scoped>
    
</style>