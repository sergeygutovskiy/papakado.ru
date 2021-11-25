<template>
    <div class="app-content">
        <template v-if="settings.length">
            <app-navigation />

            <main class="container"> 
                <router-view :key="$route.path" />
            </main>

            <product-modal />
            <app-footer />
        </template>
    </div>
</template>

<script>
import Navigation from './layout/navigation/Navigation.vue';
import Footer from './layout/footer/Footer.vue';
import ProductModal from './layout/modal/Modal.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        appNavigation: Navigation, 
        appFooter: Footer,
        productModal: ProductModal
    },

    computed: {
        ...mapGetters({
            settings: 'app/settings'
        })
    },

    methods: {
        ...mapActions({
            get_settings: 'app/get_settings'
        })
    },

    created() {
        if (!this.settings.length) this.get_settings();
    },
}
</script>