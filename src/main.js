import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import mitt from 'mitt'
import Cloudinary, { CldImage, CldVideo, CldTransformation, CldContext } from "cloudinary-vue";
const emitter = mitt();

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faXmark, faExclamationCircle, faArrowUpFromBracket, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faPhone, faXmark, faExclamationCircle, faArrowUpFromBracket, faCircleCheck, faCircleXmark]);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(Cloudinary, {
    configuration: {cloudName: "drtoeefis"},
    components:{
       CldImage,
       CldTransformation,
       CldContext
    }
})
app.use(router);
app.use(VueCookies, {secure: true});
app.config.globalProperties.emitter = emitter;
app.mount('#app');

