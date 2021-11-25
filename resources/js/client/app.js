import { createApp } from 'vue';

import router from './routing';
import store from './store';

import App from './vue/App';


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
    ;