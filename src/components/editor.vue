<template>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <Alertbox :warningText="warningText" @isAlert=" warningText = '' "/>
    <form @submit.prevent="sendInfos" ref="form" enctype="multipart/form-data">
        <div class="container">
            <div>
                <h5>Content's header :</h5>
                <input v-model="header" type="text" id="header">
            </div>

            <div>
                    <h5>Author :</h5>
                    <input v-model="author" type="text" id="author">
            </div>

            <div>
                <label for="content_image" id="content-image">
                    <span>
                        <font-awesome-icon id="arrow-up-from-bracket" icon="arrow-up-from-bracket"/>
                    </span>
                    <span v-if="image">Photo Selected</span>
                    <span v-else>Choose Photo</span>
                </label>
                <input id="content_image" @change="fileChange($event)" ref="contentImage" type="file" accept="image/*" name="content_image_file">
            </div>

            <div>
                <select v-model="contentType" name="contentType" id="contentType" ref="contentType">
                    <option value="" selected>Select Type</option>
                    <option value="romance">Romance</option>
                    <option value="horror">Horror</option>
                    <option value="comedy">Comedy</option>
                    <option value="thriller">thriller</option>
                </select>   
            </div>

            <div>
                <select v-model="permission" name="permission" id="permission" ref="permission">
                    <option value="" selected>Select permission</option>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                </select>   
            </div>
            <QuillEditor id="myQuillEditor" ref="myQuillEditor" :options="options" v-model:content="content"/>
            <button id="addContent-btn">Add</button>
        </div>
    </form>
   
</template>

<script>  
    import { Delta, QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import AdminContentServices from '../../services/adminContentServices';
    import Alertbox from './alertbox.vue';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
   
    export default {
        name: "editor",
        components: {
            QuillEditor,
            Alertbox,
            Loading
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                content:'',
                warningText:'',
                options: {
                    modules: {
                        toolbar:[
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                        ]
                    },
                    placeholder: 'Compose an epic...',
                    readOnly: false,
                    theme: 'snow',
                    content: 'delta',
                    contentType: 'delta',
                },                      
                header: '',
                author: '',
                image: '',
                contentType: '',
                permission: '',
            }
        },
        methods: {
            async sendInfos() {
                const formData = new FormData();
                this.isLoading = true;
                try{
                    let deltaOps = await this.$refs.myQuillEditor.getContents().ops;                
                    formData.set('header', this.header);
                    formData.set('author', this.author);
                    formData.set('image', this.image);
                    formData.set('contentType', this.contentType);
                    formData.set('permission', this.permission);
                    formData.set('contentBody', JSON.stringify(deltaOps));
                    let response = await AdminContentServices.postContent(formData); 
                    if(response.data.error){
                        this.warningText = response.data.error;
                    }   
                }catch(err){
                    this.warningText = err.message;    
                }
                this.formReset(formData);
                this.isLoading = false;         
                // let cfg = {};
                // let converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

                // let context = converter.convert(); 
                // this.contentCollectionsArr.push(context);
                // this.isLoading = false;
            },
            fileChange(e){
                e.preventDefault();
                console.log(e.target.files)
                this.image = e.target.files[0]
            },
            formReset(formData){
                this.$refs.myQuillEditor.setContents([]);
                formData.delete('header');
                formData.delete('author');
                formData.delete('image');
                formData.delete('contentType');
                formData.delete('permission');
                formData.delete('contentBody');
                this.header = '';
                this.author = '';
                this.contentType = '';
                this.permission = '';
                this.image = '';
            }
        },
    }
</script>

<style lang="scss" scoped>
input[type="file"] { display: none; }
    .container{
        padding: 10px 20px;
        #header,#author{
            width: 20%;
            height: 30px;
            padding: 2px 5px;
            margin-top: 5px;
            margin-bottom: 10px;
        }
        #contentType,#permission{
            width: 80px;
            height: 30px;
            margin: 10px 0 10px 0;
        }
        #addContent-btn{
            margin-top: 10px;
            width: 50px;
            height: 25px;
            cursor: pointer;
            color: #fff;
            letter-spacing: 2px;
            font-size: 15px;
            background-color: var(--second-color);
            border: none;
        }
        #content-image{
            background-color: rgba(228, 230, 228, 0.856);
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            width: 80px;
            align-items: center;
            span{
                margin-bottom: 5px;
                font-size: 0.5rem;
            }
        }
    }

    @media screen and (max-width:992px){
       
    }
    @media only screen and (max-width:576px){
      .container{
            #header,#author{
                width: 40%;
            }
      }
    } 
</style>