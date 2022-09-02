<template>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <Navbar @home="customLimitation" @getByType="getByType" @searchContentByName="searchContentByName"/>
    <AlertBox :warningText="warningText" @isAlert="warningText=''"/>
    <div class="content-container">
        <ContentBox v-for="content in arrContents" :permission="content.permission" :id="content._id" :key="content._id" :imgUrl="content.image.public_id" :title="content.header" :paragraph="content.contentBody" :author="content.author" :genre="content.contentType"/>
    </div>
    <div class="paginate-container">
        <Paginate @pagechanged="onPageChange" :max-visible-button="3" :total-pages="totalPages" :per-page="limit" :current-page="currentPage"></Paginate>
    </div>
</template>

<script>
    import Paginate from '../components/paginate'
    import Loading from 'vue-loading-overlay';      
    import 'vue-loading-overlay/dist/vue-loading.css';
    import AlertBox from '../components/alertbox.vue'
    import Navbar from '../components/navbar.vue'
    import ContentBox from '../components/contentbox.vue'
    import userContentServices from '../../services/userContentServices.js'
    import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
    export default {  
        components: {
            Paginate,
            Navbar,
            ContentBox,
            AlertBox,
            Loading
        },
        data() {
            return {
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                arrContents: [],
                paragraph:'',
                warningText:'',
                currentPage:1,
                limit:1,
                totalPages:5,
                action:'',
                storeEmitValue:'',
            }
        },
        watch: {
            arrContents() {
                this.totalPages = this.totalPages
            }
        },
        methods: {
            async limitation(page,limit) {
                this.isLoading = true;
                this.currentPage = Number(page);
               
                let response = await userContentServices.getAllContents(page,limit) 
                if(response.data.error){
                    this.isLoading = false;
                    return this.warningText = response.data.error
                }
                let total = response.data.totalContents;
                
                this.totalPages = Math.ceil(total/limit);

                this.arrContents = response.data.allContents
                this.isLoading = false;  
            },
            customLimitation() {
                window.outerWidth > 576 ? this.limit = 10 : this.limit = 2;
                this.limitation(1, this.limit);
            },
            onPageChange(page){
                console.log(page)
                if(this.action === 'name'){
                    this.searchContentByName(this.storeEmitValue, page, this.limit)
                }else if(this.action === 'type'){
                    this.getByType(this.storeEmitValue, page, this.limit)
                }else{
                    this.limitation(page, this.limit)
                }
            },
            async getByType(v, page){
                try{
                    console.log(v)
                    this.isLoading = true;
                    this.currentPage = Number(page || 1);
                    let res = await userContentServices.gettingByType(v, page, this.limit);
                    this.action = 'type';
                    this.storeEmitValue = v;
                    if(res.data.error){
                        return this.warningText = res.data.error;
                    }else if(res.data.filteredContents.length === 0){
                       return this.warningText = 'Contents Not Found' 
                    }
                    let total = res.data.totalContents;
                    this.totalPages = Math.ceil(total/this.limit);

                    this.arrContents = res.data.filteredContents;
                    this.isLoading = false;
                }catch(err){
                    this.warningText = err.message;
                    this.isLoading = false;
                }
            },
            async searchContentByName(v, page){
                try{
                    this.isLoading = true;
                    this.currentPage = Number(page || 1);
                    let res = await userContentServices.searchingByName(v, page, this.limit);
                    this.action = 'name';
                    this.storeEmitValue = v;
                    if(res.data.error){
                        return this.warningText = res.data.error;
                    }
                    let total = res.data.filteredContentsLength;
                    this.totalPages = Math.ceil(total/10);

                    this.arrContents = res.data.filteredContents;
                    this.isLoading = false;
                }catch(err){
                    this.warningText = err.message;
                    this.isLoading = false;
                }
            }
        },
        async mounted(){
            this.customLimitation()
            window.addEventListener('resize', this.customLimitation)
        },
    }
</script>

<style lang="scss" scoped>
    .content-container{
        margin-top: 6.5rem;
        display: flex;
        flex-wrap: wrap;
        // align-items: center;
        justify-content: center;
        align-items: flex-end;
    }
    .paginate-container{
        position: fixed;
        bottom: 0.5rem;
        width: 100%;
    }
</style>