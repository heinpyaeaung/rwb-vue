import {createApp, h} from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import mitt from 'mitt'

const emitter = mitt();

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faXmark, faExclamationCircle, faArrowUpFromBracket, faCircleCheck, faGear, faCircleXmark, faMagnifyingGlass, faChevronCircleUp, faBars, faLock, faTrash, faBook, faUsers, faCloudArrowUp, faHome, faArrowLeft, faArrowUp, faScrewdriverWrench, faThumbsUp, faFaceFrown, faFilePen, faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faPhone, faXmark, faExclamationCircle, faArrowUpFromBracket, faCircleCheck, faGear, faCircleXmark, faMagnifyingGlass, faChevronCircleUp, faBars, faLock, faTrash, faBook, faUsers, faCloudArrowUp, faHome, faArrowLeft, faArrowUp, faScrewdriverWrench, faThumbsUp, faFaceFrown, faFilePen, faHeart]);

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(VueCookies, {secure: true});

app.config.globalProperties.emitter = emitter;
app.mount('#app')


