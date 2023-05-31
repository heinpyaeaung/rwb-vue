<template>
    <Alertbox :warningText="warningText" @isAlert="warningText=''"></Alertbox>
    <div class="container">
        <header class="title">{{title.toUpperCase()}}</header>
        <div class="image" v-if="image" v-html="image"></div>
        <span class="author">Writer : {{author}}</span>
        <div class="content-box" v-html="contentBody"></div>
        <div class="roll-up-container">
            <div class="roll-up" @click="rollUp"><font-awesome-icon icon="arrow-up"/></div>
        </div>
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
                this.image = cl.imageTag(imgUrl,{height,width,crop: "mfit"}).toHtml();
            },
            fetchImgFromDbWithRation(screenWidth,img){
                if(screenWidth < 1900 && screenWidth > 1500){
                    this.fetchImg("v1655924486/"+img.public_id,500, 768)
                }else if(screenWidth < 1500 && screenWidth > 1200){
                    this.fetchImg("v1655924486/"+img.public_id,500, 768)
                }else if(screenWidth < 1200 && screenWidth > 768){
                    this.fetchImg("v1655924486/"+img.public_id,500, 768)
                }else if(screenWidth < 768 && screenWidth > 576){
                    this.fetchImg("v1655924486/"+img.public_id,600, window.innerWidth)
                }else if(screenWidth < 576){
                    this.fetchImg("v1655924486/"+img.public_id,400, window.innerWidth)
                }else{
                    this.fetchImg("v1655924486/"+img.public_id,500, 768)
                }
            },
            rollUp(){
                window.scroll({
                    top: 0, 
                    left: 0, 
                    behavior: 'smooth'
                });
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
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem 0rem;
        text-align: center;
        .title{
            font-size: 3rem;
            font-weight: 700;
            letter-spacing: 0.2rem;
        }
        .author{
            text-align: start;
            width: 768px;
        }
        .image{
            margin: 1rem 0;
            padding: 0;
        }
        .content-box{
            text-align: start;
            width: 768px;
            font-size: 1rem;
            margin-top: 2rem;
            line-height: 23px;
        }
        span{
            font-size: 2rem;
        }
        .roll-up-container{
            display: flex;
            justify-content: flex-end;
            width: 98%;
            position: sticky;
            bottom: 12px;
            .roll-up{
                display: flex;
                cursor: pointer;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #fff;
                box-shadow: rgba(214, 210, 210, 0.651) 0px 2px 8px 0px;
                transition: all 0.5s ease;
                &:hover{
                   transform: scale(1.05);
                }
            }
        }
    }
    
    @media screen and (max-width:768px){
        .container{
            margin-top: 0.5rem;
            .title{
                text-align: center;
            }
            .content-box, .author{
                width: 100%;
                padding: 0 20px;
            }
        }
    }
</style>