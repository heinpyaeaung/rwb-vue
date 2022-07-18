import {createApp, h} from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import mitt from 'mitt'
import Cloudinary from "cloudinary-vue";

const emitter = mitt();

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faXmark, faExclamationCircle, faArrowUpFromBracket, faCircleCheck, faCircleXmark, faMagnifyingGlass, faChevronCircleUp, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faPhone, faXmark, faExclamationCircle, faArrowUpFromBracket, faCircleCheck, faCircleXmark, faMagnifyingGlass, faChevronCircleUp, faBars]);

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VueCookies, {secure: true});
app.use(Cloudinary)
app.config.globalProperties.emitter = emitter;
app.mount('#app')


