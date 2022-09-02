<template>
    <div class="container">
        <div class="locked-bar">
            <span>Locked</span>
        </div>
        <div v-html="image"></div>
        <div class="badges">
            <span ref="badge_genre">
                {{genre}}
            </span>
        </div>
        <div class="text-section">
            <h3>{{title.toUpperCase()}}</h3>
            <div>
                <p v-html="ModelContentBody"></p>
            </div>
            <button id="readMore-btn" @click="fetchSinglePost(id)">Read More ...</button>
        </div>
        <div id="divider">
            <div></div>
        </div>
        <div class="infos-section">
            <span>By {{author.toUpperCase()}}</span>
            <span>{{updatedTime}}</span>
        </div>
    </div>
</template>

<script>
    import {Cloudinary, CloudinaryImage} from "cloudinary-core"
    import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
    
    export default {
        props:['id','title','paragraph','author','genre','imgUrl','permission'],
        data() {
            return {
                image: '',
                contentBody:'',
                modelContentBody:'',
            }
        },
        computed: {
            ModelContentBody(){
                return this.contentBody.length > 50 ? this.contentBody.substr(0,50)+'...' : this.contentBody
            },
            updatedTime(){
                // console.log(this.id)
                let timestamp = this.id.toString().substring(0,8) //changin time by mongoId
                let createdTime = new Date(parseInt(timestamp, 16) * 1000).getDate();
                let createdMonth = new Date(parseInt(timestamp, 16) * 1000).getMonth();
                let months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','nov','oct','dec']
                return months[createdMonth] +'-'+ createdTime;
            }
        },
        methods: {
            fetchImgDataFromDb(screenWidth) {
                if(screenWidth < 1900 && screenWidth > 1500){
                    this.image = this.getImg("v1655924486/"+ this.imgUrl, 300, 400)
                }else if(screenWidth < 1500 && screenWidth > 1200){
                    this.image = this.getImg("v1655924486/"+ this.imgUrl, 250, 350)
                }else if(screenWidth < 1200 && screenWidth > 768){
                    this.image = this.getImg("v1655924486/"+ this.imgUrl, 250, 300)
                }else if(screenWidth < 768 && screenWidth > 576){
                    this.image = this.getImg("v1655924486/"+ this.imgUrl, 250, 400)
                }else if(screenWidth < 576){
                    this.image = this.getImg("v1655924486/"+ this.imgUrl, 250, 500)
                }else{
                    this.image = this.getImg("v1655924486/"+ this.imgUrl, 300, 500)
                }
                
                if(this.genre === 'war' || this.genre === 'horror'){
                    this.$refs.badge_genre.style.backgroundColor = '#e41749'
                }else if(this.genre === 'comedy' || this.genre === 'fantasy'){
                    this.$refs.badge_genre.style.backgroundColor = 'rgba(0, 255, 34, 0.815)'
                }else if(this.genre === 'romance'){
                    this.$refs.badge_genre.style.backgroundColor = '#f9ff21'
                }else if(this.genre === 'mystery'){
                    this.$refs.badge_genre.style.backgroundColor = 'rgba(255, 145, 0, 0.815)'
                }else if(this.genre === 'historical'){
                    this.$refs.badge_genre.style.backgroundColor = '#ff8a5c'
                }else if(this.genre === 'action'){
                    this.$refs.badge_genre.style.backgroundColor = '#28c7fa'
                }else{
                    this.$refs.badge_genre.style.backgroundColor = '#000'
                }
            },
            getImg(imgUrl,height,width){
                const cl = new Cloudinary({cloud_name: "drtoeefis"})
                return cl.imageTag(imgUrl,{width, height, gravity:"faces", crop: "thumb"},{border: "4px_solid_green"}).toHtml()
            },
            changeDeltaToContent(content){
                const cfg = {};
                const converter = new QuillDeltaToHtmlConverter(content, cfg);
                this.contentBody = converter.convert()
            },
            fetchSinglePost(id){
                console.log(this.permission)
                if(this.permission !== 'public'){
                    return console.log('Not Allowed')
                }
                if(this.permission === 'private'){
                    this.$router.push(`/content/${id}`)
                }
            }
        },
        mounted () {
            this.fetchImgDataFromDb(window.outerWidth)
            this.changeDeltaToContent(this.paragraph)
            // window.addEventListener('resize', this.fetchImgDataFromDb(window.outerWidth))
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 23%;
        height: 36rem;
        margin: 10px;
        box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;
        overflow: hidden;
        transition: all 0.1s ease;
        cursor: pointer;
        background-color: #fff;
        border-radius: 3px;
        position: relative;
        .locked-bar{
            width: 100%;
            height: 100%;
            background-color: rgb(255, 255, 255);
            opacity: 0.4;
            position: absolute;
            z-index: 2300;
        }
        &:hover{
            transform: scale(1.01);
        }
        .badges{
            padding: 15px 0 5px 15px;
            span{           
                padding: 5px;
                color: #eff;
                border-radius: 3px;
            }
        }
        .text-section{
            padding: 5px 15px;
            h3{
                font-size: 1.5rem;
                margin-top: 3px;
            }
            p{
                margin: 15px 0;
                height: 10%;
            }
            #readMore-btn{
                font-size: 1.1rem;
                margin-top: 10px;
                outline: none;
                border: none;
                background-color: #fff;
                cursor: pointer;
            }
        }
        #divider{
            width: 100%;
            padding: 15px;
            div{
                width: 100%;
                height: 0.5px;
                background-color: rgb(170, 170, 170);
            }
        }
        .infos-section{
            padding: 15px 15px;
            display: flex;
            justify-content: space-between;
        }
    }
    //large
    @media screen and (max-width: 992px){
       .container{
           width: 30%;
       } 
    }
    //medium
    @media only screen and (max-width: 768px) {
        .container{
            width: 45%;
        } 
    }
    //small
    @media only screen and (max-width: 576px) {
       .container{
           width: 85%;
       } 
    }
</style>