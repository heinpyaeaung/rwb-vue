<template>
    <div class="navbar-container">
        <h3>𝙍&𝙒𝘽</h3>
        <div :class="{'items-container': true, 'show-menu': showMenu}" ref="items_container">
            <div class="options-container">
                <input @click="triggerDropDown" type="text" id="input-box" placeholder="Select Genres" readonly>
                <div v-show="showDropDown" class="options-box">
                    <div>Romance</div>
                    <div>Thriller & Horror</div>
                    <div>Action & War</div>
                    <div>Comedy</div>
                    <div>Fantasy</div>
                    <div>Historical</div>
                    <div>Mystery</div>
                </div>
                <span @click="triggerDropDown" :class="{active: showDropDown}" id="options-arrow-icon"></span>
            </div>
            <div class="profile">Profile</div>
            <div class="contact-us">Contact Us</div>
        </div>
        <div class="searchbox-container">
            <input type="text" placeholder="Search a content">
            <font-awesome-icon id="magnifying-glass" icon="magnifying-glass"/>
        </div>
        <div class="hamburger-container">   
            <font-awesome-icon @click="menuTrigger" v-if="showMenu" id="cross-icon" icon="xmark"/>   
            <font-awesome-icon @click="menuTrigger" v-else  id="bars-icon" icon="bars"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showMenu: false,
                showDropDown: false,
            }
        },
        methods: {
            triggerDropDown() {
                this.showDropDown = !this.showDropDown
            },
            menuTrigger() {
                console.log('trigger work')
                this.showMenu = !this.showMenu
            }
        },
    }
</script>

<style lang="scss" scoped>
    .navbar-container{
        width: 100%;
        padding: 25px 20px;
        background-color: #fff;
        display: flex;
        align-items: center;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        h3{
            width: 10%;
            font-size: 2rem;
        }
        .items-container{
            width: 30%;
            position: relative;
            display: flex;
            // justify-content: space-evenly;
            .profile{
                margin-left: 5%;
                cursor: pointer;
            }
            .contact-us{
                margin-left: 5%;
                cursor: pointer;
            }
            #input-box{
                font-size: 15px;
                outline: none;
                border: none;
                font-weight: 600;
                cursor: pointer;
                &::placeholder{
                    color: #000;
                    letter-spacing: 1px;
                }
            }
            .options-box{
                width: 80%;
                background-color: #fff;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                border-radius: 10px;
                position: absolute;
                top: 30px;
                left: 0;
                font-size: 20px;
                outline: none;
                border: none;
                div{
                    margin: 10px 0 10px 15px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    &:hover{
                        padding-left: 2px;
                    }
                }
            }
            #options-arrow-icon{
                cursor: pointer;
                width: 7px;    
                height: 7px;
                border: 2px solid #000;
                border-top: 2px solid #fff;
                border-right: 2px solid #fff;
                position: absolute;
                margin-left: -30px;
                bottom: 38%;
                transform: rotate(-45deg);
                transition: 0.2s;
            }
            .cross-icon-container{
                display: none;
            }
        }
        .searchbox-container{
            width: 60%;
            text-align: end;
            input{
                font-size: 1rem;
                width: 40%;
                border-top: none;
                border-left: none;
                border-right: none;
                padding: 3px 25px 3px 10px;
                height: 35px;                  
                outline: none;
            }
            #magnifying-glass{
                margin-left: -20px;
                font-size: 15px;
                cursor: pointer;
            }
        }
        .hamburger-container{
            display: none;
        }
    }
    .active{
        transition: 0.2s;
        transform: rotate(135deg) !important;
        bottom: 13% !important;
    }
    //x-large
    @media screen and (max-width:1200px){
       .navbar-container{
           h3{
               width: 13%;
           }
           .searchbox-container{
               width: 55%;
           }
       }
    }
    //large
    @media screen and (max-width:992px){
       .navbar-container{
           h3{
               width: 15%;
           }
           .items-container{
               width: 40%;
           }
           .searchbox-container{
               width: 45%;
               input{
                   width: 80%;
               }
           }
       }
    }
    //medium
    @media screen and (max-width:768px){
       .navbar-container{
            h3{
                display: none;
            }
            .items-container{
                #input-box{
                    &::placeholder{
                        text-align: center;
                        letter-spacing: 0;
                    }
                }
                .options-container{
                    position: relative;
                    .options-box{
                        position: relative;
                        width: 100%;
                        top: 1%;
                        left: 0;
                        box-shadow: none;
                        div{
                            text-align: center;
                            font-size: 1rem;
                            margin: 15px 0;
                            transition: all 0.1s ease-out;
                            &:hover{
                                font-size: 1.1rem;
                            }
                        }
                    }
                    #options-arrow-icon{
                        display: none;
                    }
                }
                .profile{
                    margin-left: 0;
                    font-weight: bold;
                }
                .contact-us{
                    margin-left: 0;
                    font-weight: bold;
                }
                position: absolute;
                height: 100vh;
                top: 0;
                left: 0;
                width: 80%;
                flex-direction: column;
                background-color: #fff;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                align-items: center;
                transform: translateX(-1000px);
                transition: all 0.6s ease;
                div{
                    margin-top: 8%;
                }
            }
            .show-menu{
                transform: translateX(0px) !important;
            }
            .searchbox-container{
                width: 80%;
                input{
                    width: 100%;
                }
            }
            .hamburger-container{
                display: block;
                width: 20%;
                text-align: end;  
                #bars-icon{
                    font-size: 2.5rem;
                    cursor: pointer;
                }   
                #cross-icon{
                    font-size: 2.5rem;
                    cursor: pointer;
                }           
            }
       }
    }
    //small 
    @media only screen and (max-width: 576px) {
      
    }
    @media only screen and (max-width: 300px) {
        .navbar-container{
            .searchbox-container{
                width: 70%;
                input{
                    width: 100%;
                }
            }
            .hamburger-container{
                width: 30%;
                #cross-icon{
                    font-size: 30px;
                }
                #bars-icon{
                    font-size: 30px;
                }
            }
        }
    }
</style>