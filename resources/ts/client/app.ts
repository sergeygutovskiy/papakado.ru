import { createApp } from "@vue/runtime-dom";

import store from "./store";
import router from "./routing";

import App from './vue/App.vue';

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
    ;