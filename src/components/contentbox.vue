<template>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <AlertBox :warningText="warningText" @isAlert="warningText=''"/>
    <div class="container">
        <div :class="{'locked-bar': isPrivate}">
            <div v-if="isPrivate">
                <span>
                    <font-awesome-icon icon="lock"/>  
                </span>
                <span>Member Only</span>
            </div>
        </div>
        <div v-html="image"></div>
        <div class="badges">
            <span class="react-counter-container">
                <span id="badge_genre" ref="badge_genre">
                    {{genre}}
                </span>
                <span id="react-counter">{{likedUsersTotal}}</span>
                <font-awesome-icon v-if="!likedPost" @click="reactedContent" id="unlike-heart-icon" icon="heart"/>
                <font-awesome-icon v-else @click="reactedContent" id="like-heart-icon" icon="heart"/>
            </span>
            <span v-if="admin">
                <font-awesome-icon @click="deleteContent" id="trash-icon" icon="trash"/>
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
            <span v-if="admin">{{authorEmail}}</span>
            <span v-else>By {{author.toUpperCase()}}</span>
            <span>{{updatedTime}}</span>
        </div>
    </div>
</template>

<script>
    import {Cloudinary, CloudinaryImage} from "cloudinary-core"
    import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
    import AlertBox from '../components/alertbox.vue'
    import UserContentServices from '../../services/userContentServices'
    import Paginate from '../components/paginate'
    import Loading from 'vue-loading-overlay';      
    import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
          components: {
            AlertBox,
            Loading
        },
        props:['id','authorEmail','title','paragraph','author','genre','imgUrl','member','permission', 'admin', 'reactedCount', 'like'],
        data() {
            return {
                warningText:'',
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                image: '',
                contentBody:'',
                modelContentBody:'',
                isPrivate:false,
                counter:0,
                likedPost: this.like,
                likedUsersTotal: this.reactedCount
            }
        },
        computed: {
            ModelContentBody(){
                return this.contentBody.length > 50 ? this.contentBody.substr(0,50)+'...' : this.contentBody;
            },
            updatedTime(){
                // console.log(this.id)
                let timestamp = this.id.toString().substring(0,8) //changin time by mongoId
                let createdTime = new Date(parseInt(timestamp, 16) * 1000).getDate();
                let createdMonth = new Date(parseInt(timestamp, 16) * 1000).getMonth();
                let months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
                return months[createdMonth] +'-'+ createdTime;
            }
        },
        methods: {
            fetchImgDataFromDb(screenWidth) {
                if(!this.member){
                    this.permission === 'private' ? this.isPrivate = true : this.isPrivate = false;
                }
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
                
                if(this.genre === 'history'){
                    this.$refs.badge_genre.style.backgroundColor = '#e41749'
                }else if(this.genre === 'health' || this.genre === 'sport'){
                    this.$refs.badge_genre.style.backgroundColor = '#10F72F'
                }else if(this.genre === 'business'){
                    this.$refs.badge_genre.style.backgroundColor = '#8616F5'
                }else if(this.genre === 'tourism'){
                    this.$refs.badge_genre.style.backgroundColor = '#BED500'
                }else if(this.genre === 'science'){
                    this.$refs.badge_genre.style.backgroundColor = '#ff8a5c'
                }else if(this.genre === 'programming'){
                    this.$refs.badge_genre.style.backgroundColor = '#28c7fa'
                }else if(this.genre === 'technology'){
                    this.$refs.badge_genre.style.backgroundColor = '#206DFC'
                }else if(this.genre === 'crypto'){
                    this.$refs.badge_genre.style.backgroundColor = '#FEFA22'
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
                if(!this.member){
                    if(this.permission === 'private'){
                        alert('for member only')                   
                    }else{
                        this.$router.push(`/content/${id}`)
                    }               
                }

                if(this.member){
                    this.$router.push(`/content/${id}`);
                }
            },
            async reactedContent(){
                if(this.likedPost){
                    let res = await UserContentServices.reactedPost('unlike', this.id);
                    if(res.data.error){                  
                        return this.warningText = res.data.error
                    }
                    this.likedUsersTotal = res.data.content;
                    this.likedPost = false;          
                }else{
                    let res = await UserContentServices.reactedPost('like', this.id);
                    if(res.data.error){                     
                        return this.warningText = res.data.error;
                    }
                    this.likedUsersTotal = res.data.content;
                    this.likedPost = true;
                }
            },
            deleteContent(){
                this.$emit('deletecontent', this.id)
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
    .locked-bar{
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        opacity: 0.6;
        position: absolute;
        z-index: 2300;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        div{
            span{
                margin: 0 5px;
            }
        }
    }
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
        &:hover{
            transform: scale(1.01);
        }
        .badges{
            height: 40px;
            padding: 0px 7px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            span{           
                padding: 5px;
                border-radius: 3px;
            }
            .react-counter-container{
                #badge_genre{
                    margin-right: 5px;
                }
                display: flex;
                align-items: center;
                #react-counter{
                    color: #000;
                    font-size: 15px;
                }
                #unlike-heart-icon{
                    color: rgb(10, 10, 10);
                    font-size: 20px;
                }
                #like-heart-icon{
                    color: rgb(240, 9, 9);
                    font-size: 20px;
                }
            }
            #trash-icon{
                color: #000
            }
        }
        .text-section{
            padding: 5px 15px;
            user-select: none;
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
            .text-section{
                height: 12rem;
            }
       } 
    }
    //medium
    @media only screen and (max-width: 768px) {
        .container{
            width: 45%;
            .text-section{
                height: 9rem;
            }
        } 
    }
    //small
    @media only screen and (max-width: 576px) {
       .container{
            width: 85%;
            .text-section{
                height: 12rem;
            }
       } 
    }
</style>