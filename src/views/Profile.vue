<template>
    <div class="container">
    <loading :active='isLoading' :is-full-page="fullPage" :loader='loader' />
    <AlertBox :warningText="warningText" @isAlert="removeAlertBox"/>
        <section class="upside">
            <div class="user-profile">
                <img src="../assets/user.png" id="user-avatar" alt="userprofile">
                <h2 id="user-name">{{name}}</h2>
                <h5 id="role">Role : {{role}}</h5>
            </div>
            <div class="bread">
                <div v-if="role==='Admin'" class="userlist" @click="goControlPanel"><font-awesome-icon id="controlPanel" icon="screwdriver-wrench"/></div>
                <div v-else class="mycontent">My Contents</div>
                <div class="editor-btn" @click="goEditor"><font-awesome-icon id="file-pen" icon="file-pen"/></div>
                <div class="setting-btn" @click="goSetting"><font-awesome-icon id="gear" icon="gear"/></div>
            </div>
        </section>
        <section class="downside">
            <div class="content-container">
                <ContentBox v-for="content in myContentsArr" @deletecontent="deletecontent" :like="content.likedUsers.includes(this.userId)" :reactedCount="content.likedUsers.length" :admin="true" :member="true" permission="public" :id="content._id" :key="content._id" :imgUrl="content.image.public_id" :title="content.header" :paragraph="content.contentBody" :author="content.author" :genre="content.contentType"/>
            </div>
        </section>
        <div class="home-btn" @click="goHome"><font-awesome-icon icon="home"/></div>
    </div>
</template>

<script>
    import ProfileServices from '../../services/profileServices.js'
    import AlertBox from '../components/alertbox.vue';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import ContentBox from '../components/contentbox.vue'
    export default {
         components: {
            Loading,
            AlertBox,
            ContentBox
        },
        data() {
            return {
                warningText:'',
                isLoading: false,
                fullPage: true,
                loader: 'bars',
                name: "Username",
                role: "Guest",
                myContentsArr: [],
                userId:null
            }
        },
        methods: {
            goHome() {
                this.$router.push('/home');
            },
            goSetting(){
                this.$router.push('/myprofile/setting')
            },
            goEditor(){
                this.$router.push('/member/editorboard')
            },
            goControlPanel(){
                this.$router.push('/admin/controlpanel')
            },
            async deletecontent(v){
                this.isLoading = true;
                let res = await ProfileServices.deleteContent(v)
                if(res.data.error){
                    this.isLoading = false;
                    return this.warningText = res.data.error;
                }
                let refetchedMyContent = await ProfileServices.getAllContents()
                const {allContentsByMe} = refetchedMyContent.data;
                this.myContentsArr = allContentsByMe;
                this.isLoading = false;
                this.warningText = 'successfully deleted'
            },
            removeAlertBox(){
                this.warningText = ''
            },
        },
        async mounted () {
            this.isLoading = true;
            let res = await ProfileServices.getAllContents()
            if(res.data.error){
                this.isLoading = false;
                this.warningText = res.data.error;
            }
            const {name='Username', admin, member, userId, allContentsByMe} = res.data;
            this.userId = userId;
            this.name = name;
            if(admin && member){
                this.role = 'Admin';
            }else if(member){
                this.role = 'Member'
            }else{
                this.role = 'Guest'
            }
            this.myContentsArr = allContentsByMe;
            this.isLoading = false;
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        .upside{
            box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px inset;
            min-height: 40vh;
            background-color: var(--main-color);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .user-profile{
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                #user-avatar{
                    width: 8rem;
                }
                #user-name{
                    margin-top: 1rem;
                }
                #role{
                    margin-top: .5rem;
                }
            }
            .bread{
                display: flex;
                margin-bottom: 1rem;
                .mycontent, .setting-btn, .editor-btn, .userlist{
                    cursor: pointer;
                    width: 8rem;
                    height: 3rem;
                    border-radius: 5px;
                    background-color: var(--main-color);
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    margin-left: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
            }
        }
        .downside{
            min-height: 65vh;
            background-color: var(--main-color);
            .content-container{
                margin-top: 1rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: flex-end;
            }
        }
    }
    .home-btn{
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
    @media screen and (max-width:992px){
        .container{
            .upside{
                min-height: 37vh;
            }
        }
    }

    @media screen and (max-width:576px){
        .container{
            .upside{
                min-height: 35vh;
                .user-profile{
                    #user-name{
                        margin-top: .5rem;
                    }
                }
                .bread{
                    justify-content: space-around;
                    .mycontent,.setting-btn,.editor-btn, .userlist{
                        width: 7rem;
                        height: 2.5rem;
                        margin-left: 0;
                        font-size: 1rem;
                    }
                }
            }
            .downside{
                min-height: 65vh;
            }
        }
    }
    @media only screen and (max-width: 380px) {
        .container{
            .upside{
                min-height: 45vh;
                .bread{
                    .mycontent,.editor-btn, .setting-btn, .userlist{
                        width:6rem;
                        height: 3rem;
                    }
                }
            }
            .downside{
                min-height: 55vh;
            }
        }
    }

    @media only screen and (max-height: 450px){
        .container{
            .upside{
                min-height: 75vh;
                .user-profile{
                    margin-top: 0.5rem;
                }
            }
        }
    }
</style>