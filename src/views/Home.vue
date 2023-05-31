<template>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <Navbar @home="customLimitation" @getByType="getByType" @searchContentByName="searchContentByName"/>
    <AlertBox :warningText="warningText" @isAlert="warningText=''"/>
    <div v-if="arrContents.length > 0" class="content-container">
        <ContentBox v-for="content in arrContents" @deletecontent="deletecontent" :like="content.likedUsers.includes(this.userId)" :reactedCount="content.likedUsers.length" :authorEmail="content.reserved_author" :admin="admin" :member="member" :permission="content.permission" :id="content._id" :key="content._id" :imgUrl="content.image.public_id" :title="content.header" :paragraph="content.contentBody" :author="content.author" :genre="content.contentType"/>
    </div>
    <div v-else class="warning-text"><h2>No Content Found</h2></div>
    <div class="paginate-container">
        <Paginate @pagechanged="onPageChange" :max-visible-button="3" :total-pages="totalPages" :per-page="limit" :current-page="currentPage"></Paginate>
    </div>
    <div v-if="admin" class="controlpanel-btn" @click="goControlPanel"><font-awesome-icon icon="screwdriver-wrench"/></div>
</template>

<script>
    import Paginate from '../components/paginate'
    import Loading from 'vue-loading-overlay';      
    import 'vue-loading-overlay/dist/vue-loading.css';
    import AlertBox from '../components/alertbox.vue'
    import Navbar from '../components/navbar.vue'
    import ContentBox from '../components/contentbox.vue'
    import userContentServices from '../../services/userContentServices.js'
    import AdminContentServices from '../../services/adminContentServices'
    import AuthServices from '../../services/authServices'
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
                member: false,
                admin: false,
                userId: null
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
                    return this.warningText = response.data.error;
                }
                this.member = response.data.member || false;
                this.admin = response.data.admin;
                this.userId = response.data.userId;
                let total = response.data.totalContents;            
                this.totalPages = Math.ceil(total/limit);
                this.arrContents = response.data.allContents;
                this.isLoading = false;  
            },
            customLimitation() {
                window.outerWidth > 576 ? this.limit = 20 : this.limit = 10;
                this.limitation(1, this.limit);
            },
            onPageChange(page){
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
                    this.isLoading = true;
                    this.currentPage = Number(page || 1);
                    let res = await userContentServices.gettingByType(v, page, this.limit);
                    this.action = 'type';
                    this.storeEmitValue = v;
                    if(res.data.error){
                        this.arrContents = [];
                        this.isLoading = false;
                        return this.warningText = res.data.error;
                    }else if(res.data.filteredContents.length === 0){
                        this.arrContents = [];
                        this.isLoading = false;
                        return this.warningText = 'type not found' 
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
                        this.arrContents = [];
                        this.isLoading = false;
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
            },
            async deletecontent(v){
                this.isLoading = true;
                let res = await AdminContentServices.deleteContent(v)
                if(res.data.error){
                    this.isLoading = false;
                    return this.warningText = res.data.error;
                }
                this.customLimitation();
                this.isLoading = false;
            },
            goControlPanel(){
                this.$router.push('/admin/controlpanel')
            }
        },
        async mounted(){
            this.customLimitation()
            // window.addEventListener('resize', this.customLimitation)
        },
    }
</script>

<style lang="scss" scoped>
    .content-container{
        margin-top: 6.5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-end;
    }
    .warning-text{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        h2{
            letter-spacing: 1.5px;
        }
    }
    .paginate-container{
        position: fixed;
        bottom: 0.5rem;
        width: 100%;
    }
    .controlpanel-btn{
        cursor: pointer;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 2%;
        right: 2%;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: #fdfdfd;
        box-shadow: rgba(99, 99, 99, 0.404) 0px 2px 8px 0px;
        transition: all 0.1s ease;
        &:hover{
            transform: scale(1.05);
        }
    }
</style>