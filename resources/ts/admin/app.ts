import { createApp } from "@vue/runtime-dom";

import store from "./store";
import router from "./routing";

import AppVue from './vue/App.vue';

createApp(AppVue)
    .use(store)
    .use(router)
    .mount('#app')
    ;