<template>
    <div>
        <Alertbox :warning-text="warningText"></Alertbox>
        <header>CONTROL PANEL</header>
        <div class="container">
            <section class="up-section">
                <div class="today-upload-box">
                    <div class="icon"><span> <font-awesome-icon icon="cloud-arrow-up"/> </span></div>
                    <div> <span>Today Upload</span><span class="counter">{{totalTodayContens}}</span> </div>
                </div>
                <div class="total-users-box">
                    <div class="icon"><span> <font-awesome-icon icon="users"/> </span></div>
                    <div> <span>Total Users</span><span class="counter">{{totalUsers}}</span>  </div>
                </div>
                <div class="total-contents-box">
                    <div class="icon"> <span> <font-awesome-icon icon="book"/></span> </div>
                    <div> <span>Total Contents</span><span class="counter">{{totalContents}}</span> </div>
                </div>
            </section>
            <section class="below-section">
                <div class="dashboard-card">
                    <div class="img-container">
                        <img src="../assets/dashboard.png" alt="dashboard">
                    </div>
                    <div class="router-container">
                        <router-link id="anchor" to="/admin/dashboard">Add Content</router-link>
                    </div>
                </div>
                <div class="usercontrol-card">
                     <div class="img-container">
                        <img src="../assets/userslist.png" alt="userlist">
                    </div>
                    <div class="router-container">
                        <router-link id="anchor" to="/admin/userslist">User Control</router-link>
                    </div>           
                </div>
            </section>
            <div class="home-btn" @click="goHome"><font-awesome-icon icon="home"/></div>
        </div>
    </div>
</template>

<script>
    import Alertbox from '../components/alertbox'
    import UserContentServices from '../../services/userContentServices'

    export default {
        components: { Alertbox },
        data() {
            return {
                warningText: "",
                totalContents: 0,
                totalUsers: 0,
                totalTodayContens:0
            }
        },
        methods: {
            goHome() {
                this.$router.push('/home')
            }
        },
        async mounted () {
            let numberOfContens = await UserContentServices.getAllContents()
            let numberOfUsers = await UserContentServices.getAllUsers()
            let numberOfTodayContents = await UserContentServices.getTodayContents()
            if(numberOfContens.data.error || numberOfUsers.data.error || numberOfTodayContents.data.error){
                this.warningText = numberOfContens.data.error || numberOfUsers.data.error || numberOfTodayContents.data.error;
            }
            this.totalContents = numberOfContens.data.totalContents;
            this.totalUsers = numberOfUsers.data.totalLengthOfUsers;
            this.totalTodayContens = numberOfTodayContents.data.today_contents_number;
        },
    }
</script>

<style lang="scss" scoped>
    header{
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: bolder;
        letter-spacing: 3px;
        text-align: center;
    }
    .container{
        .up-section{
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            margin-top: 2rem;
            .today-upload-box,.total-users-box,.total-contents-box{
                background-color: #fdfdfd;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                border-radius: 10px;  
                transition: all 0.1s ease;
                &:hover{
                    box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
                    transform: scale(1.01);
                } 
                .icon{
                    border-right: 1px solid rgba(128, 128, 128, 0.466); 
                }
            }
            div{
                width: 30%;              
                display: flex;
                text-align: center;
                :first-child{
                    width: 30%;
                    align-items: center;
                    justify-content: center;
                    span{
                        font-size: 2rem;
                    }
                }
                :last-child{
                    width:70%;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 10px 0;
                    // border-left: 1px solid black;
                    span{
                        font-size: 1.5rem;
                        width: 100%;
                    }
                    .counter{
                        margin-top: 15px;
                        font-size: 2rem;
                        font-weight: 800;
                    }
                }
            }
        }
        .below-section{
            margin-top: 3rem;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            
            .dashboard-card,.usercontrol-card{
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                background-color: #fdfdfd;
                padding: 10px;
                border-radius: 10px;
                width: 40%;
                overflow: hidden;
                transition: all 0.1s ease;
                &:hover{
                    box-shadow: rgba(99, 99, 99, 0.6) 0px 2px 8px 0px;
                    transform: scale(1.01);
                }
                .img-container{
                    border-bottom: 1px solid rgba(128, 128, 128, 0.466);
                    img{
                        width: 100%;
                    }
                }
                .router-container{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 4rem;
                    #anchor{
                        text-decoration: none;
                        font-size: 1.5rem;
                        color: black;
                    }
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
    }
    @media screen and (max-width: 576px){
        .container{
           .up-section{
               flex-direction: column;
               align-items: center;
               .today-upload-box,.total-users-box,.total-contents-box{
                   width: 95%;
                   margin-bottom: 15px;
               }
           }
           .below-section{
               flex-direction: column;
               align-items: center;
               .dashboard-card,.usercontrol-card{
                    margin-bottom: 15px;
                    width: 90%;
                   .router-container{
                       #anchor{
                           font-size: 1.3rem;
                       }
                   }
               }
           }
        }
    }
</style>