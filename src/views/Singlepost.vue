<template>
    <Alertbox :warningText="warningText" @isAlert="warningText=''"></Alertbox>
    <div class="container">
        <header class="title">{{title.toUpperCase()}}</header>
        <div class="image" v-if="image" v-html="image"></div>
        <span>Author : {{author}}</span>
        <div class="content-box" v-html="contentBody"></div>
    </div>
</template>

<script>
    import Alertbox from '../components/alertbox'
    import UserContentServices from '../../services/userContentServices.js'
    import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
    import {Cloudinary, CloudinaryImage} from "cloudinary-core"
    import Loading from 'vue-loading-overlay';      
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        components: { Alertbox,  Loading },
        props:['id'],
        data() {
            return {
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                warningText: '',
                title:'',
                image:'',
                contentBody:'',
                author:''
            }
        },
        methods: {
            changeDeltaToText(content) {
                const cfg = {};
                const converter = new QuillDeltaToHtmlConverter(content, cfg);
                this.contentBody = converter.convert()     
            },
            fetchImg(imgUrl,height,width){
                const cl = new Cloudinary({cloud_name: "drtoeefis"});
                this.image = cl.imageTag(imgUrl,{width, height, gravity:"faces", crop: "thumb"}).toHtml();
            },
            fetchImgFromDbWithRation(screenWidth,img){
                if(screenWidth < 1900 && screenWidth > 1500){
                    this.fetchImg("v1655924486/"+img.public_id,400,400)
                }else if(screenWidth < 1500 && screenWidth > 1200){
                    this.fetchImg("v1655924486/"+img.public_id,400,400)
                }else if(screenWidth < 1200 && screenWidth > 768){
                    this.fetchImg("v1655924486/"+img.public_id,400,400)
                }else if(screenWidth < 768 && screenWidth > 576){
                    this.fetchImg("v1655924486/"+img.public_id,400,400)
                }else if(screenWidth < 576){
                    this.fetchImg("v1655924486/"+img.public_id,400,350)
                }else{
                    this.fetchImg("v1655924486/"+img.public_id,400,350)
                }
            }
        },
        async mounted() {
           try{
                this.isLoading = true;
                let res = await UserContentServices.getSingleDetailsPost(this.id)
                let {header, author, image, contentBody} = res.data.content;
                if(res.data.error){
                    this.warningText = res.data.error;
                }else{
                    this.title = header;
                    this.author = author;
                    this.fetchImgFromDbWithRation(window.outerWidth,image)
                    this.changeDeltaToText(contentBody);
                    this.isLoading = false;
                }
           }catch(err){
               this.warningText = err.message
               this.isLoading = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        padding: 1rem 2rem;
        .title{
            font-size: 4rem;
            font-weight: 700;
            letter-spacing: 0.2rem;
        }
        .image{
            margin: 1rem 0;
        }
        .content-box{
            font-size: 1.5rem;
            margin-top: 1rem;
        }
        span{
            font-size: 2rem;
        }
    }
</style>