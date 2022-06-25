<template>
    <AlertBox :warningText="warningText" @isAlert="isAlert"></AlertBox>
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <div class="container">
        <div class="search-box-container">
            <input @keypress.enter="searchingEmail" type="text" v-model="email" placeholder="Search a user...">
            <button @click="searchingEmail" class="search-btn">Search</button>
        </div>
        <table>
            <tr>
                <th>Email</th>
                <th>Admin</th>
                <th>Member</th>
                <th>Verified</th>
            </tr>
            <tbody>
                <tr v-for="user in paginatedResult" :key="user._id">
                    <td>
                        {{user.email}}
                    </td>
                    <td>
                        <!-- {{user.admin}} -->
                        <font-awesome-icon @click="changePermission(user._id,'changeadmin','admin')" v-if="user.admin" id="circle-check" :class="{check: user.admin}" icon="circle-check"/>
                        <font-awesome-icon @click="changePermission(user._id,'changeadmin','admin')" v-else id="circle-xmark" :class="{check: user.admin}" icon="circle-xmark"/>
                    </td>
                    <td>
                        <!-- {{user.member}} -->
                        <font-awesome-icon  @click="changePermission(user._id,'changemember','member')" v-if="user.member" id="circle-check" :class="{check: user.member}" icon="circle-check"/>
                        <font-awesome-icon  @click="changePermission(user._id, 'changemember','member')" v-else id="circle-xmark" :class="{check: user.member}" icon="circle-xmark"/>
                    </td>
                    <td>
                        <!-- {{user.isVerified}} -->
                        <font-awesome-icon  @click="changePermission(user._id, 'changeverify','isVerified')" v-if="user.isVerified" id="circle-check" :class="{check: user.isVerified}" icon="circle-check"/>
                        <font-awesome-icon  @click="changePermission(user._id, 'changeverify','isVerified')" v-else id="circle-xmark" :class="{check: user.isVerified}" icon="circle-xmark"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-container" v-show="triggerPaginatedContainer">
            <Paginate :maxVisibleButton="3" :totalPages="totalPages" :perPage="limit" :currentPage="currentPage" @pagechanged="onPageChange"/>
        </div>
    </div>
</template>

<script>
    import AlertBox from '../components/alertbox.vue'
    import AdminUserServices from '../../services/adminUserServices'
    import Paginate from '../components/paginate.vue'
    import Loading from 'vue-loading-overlay'
    import 'vue-loading-overlay/dist/vue-loading.css'
    export default {
        components: {
           Paginate,
           AlertBox,
           Loading
        },
        data() {
            return {
                warningText:'',
                totalPages: 5,
                currentPage: 1,
                limit: 2,
                paginatedResult: [],
                email:'',
                triggerPaginatedContainer: true,
                isLoading: false,
                fullPage: true,
                loader: 'bars',
            }
        },
        methods: {
            async limitaion(page,limit){
                this.isLoading = true;
                this.currentPage = page;
                this.triggerPaginatedContainer = true;
                try{
                    let response = await AdminUserServices.getAllUsers(page, limit);
                    if(response.data.error){
                        this.isLoading = false;
                        this.warningText = response.data.error;
                    }else{
                        this.isLoading = false;
                        let total = response.data.totalLengthOfUsers;
                        this.totalPages = Math.ceil(total / limit);
                        this.warningText = '';
                        this.paginatedResult = response.data.paginatedUsers;
                    }
                }catch(err){
                    this.isLoading = false;
                    this.warningText = err.message;
                }
            },
            async changePermission(userId, action, type){
                try{
                    this.isLoading = true;
                    await AdminUserServices.changePermission(userId, action)
                    this.paginatedResult.forEach(el => {
                       if(el._id === userId){
                           if(type === 'admin'){
                               el.admin = !el.admin
                           }
                           if(type === 'member'){
                               el.member = !el.member
                           }
                           if(type === 'isVerified'){
                               el.isVerified = !el.isVerified
                           }
                       }
                    })
                    this.isLoading = false;
                }catch(err){
                    this.isLoading = false;
                    this.warningText = err.message;
                }
            },
            onPageChange(page) {
              this.limitaion(page, this.limit)
            },
            customLimitation() {
                window.outerWidth > 576 ? this.limit = 7 : this.limit = 2;
                this.limitaion(1, this.limit);
            },
            isAlert(){
                this.warningText = '';
            },
            async searchingEmail(){
                try{
                    this.isLoading = true;
                    let response = await AdminUserServices.searchAnEmail(this.email);
                    this.triggerPaginatedContainer = false;
                    if(response.data.error){
                        this.isLoading = false;
                        this.paginatedResult.length = 0;
                        // this.paginatedResult = []
                        this.warningText = response.data.error;
                    }else{
                        this.isLoading = false;
                        let total = response.data.totalLengthOfUsers;
                        this.totalPages = Math.ceil(total / this.limit);
                        this.warningText = '';
                        this.paginatedResult = response.data.filteredUsers;
                    }
                }catch(err){ this.warningText = err.message }
            }
        },
        mounted () {
            this.customLimitation()
            window.addEventListener('resize', this.customLimitation)
        }
    }
</script>

<style lang="scss" scoped>
    .pagination-container{
        width: 100%;
        position: fixed;
        bottom: 2%;
    }
    .container{
        padding: 10px;
        background-color:var(--main-color);
        min-height: 100vh;
        .search-box-container{
            display: flex;
            justify-content: flex-end;
            margin-bottom: 0.5rem;
            input{
                margin-right: 1rem;
                height: 30px;
                width: 15rem;
                padding: 2px 4px;
            }
            .search-btn{
                width: 3rem;
                background-color: #000;
                color: #fff;
                cursor: pointer;
            }
        }
    }
    table, th, td {
        text-align: start;
	    border: 1px rgb(252, 247, 247) solid;
        padding: 10px;
    }
    table{
        width: 100%;
        border-collapse: collapse;
        border-spacing: 10px 10px;
    }
    th{
        background-color: #000;
        color:#fff;
    }
    td{
        overflow-x: hidden;
    }
    tr:nth-child(even) {
	    background-color: #fff;
    }
    #circle-xmark,#circle-check{
        cursor: pointer;
        color: red;
    }
    .check{
        color: green !important;
    }
    // @media screen and (max-width:992px){
    //     .pagination-container{
    //         left: 30%;
    //         right: 30%;
    //     }
    // }

    @media screen and (max-width:576px){
        .container{
            .search-box-container{
                input{
                    width: 100%;
                }
            }
        }
    }
</style>