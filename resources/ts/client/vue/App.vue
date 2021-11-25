<template>
    <div class="app-content">
        <template v-if="settings.length">
            <app-navigation />

            <main class="container"> 
                <router-view :key="$route.path" />
            </main>

            <app-modal />
            <app-footer />
        </template>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import { ModuleTypes, namespace } from "../store";
import * as AppModule from "../store/modules/app";

import AppNavigation from './layout/navigation/Navigation.vue';
import AppModal from './layout/modal/Modal.vue';
import AppFooter from './layout/footer/Footer.vue'; 

export default defineComponent({
    setup() {
        const store = useStore();

        const settings = computed( () => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.SETTINGS) ] );
        const request_settings = () => store.dispatch( namespace(ModuleTypes.APP, AppModule.ATypes.REQUEST_SETTINGS) );
    
        return {
            settings,
            request_settings,
        }
    },
    
    components: {
        AppNavigation,
        AppModal,
        AppFooter,
    },

    created() {
        this.request_settings();
    },
});
</script>