<template>
    <main class="container my-5">
        <div class="row mb-5">
            <div class="col-12">
                <nav class="list-group list-group-horizontal">
                    <a 
                        class="list-group-item list-group-item-action"
                        href="/"
                        >
                        На сайт
                    </a>
                    <router-link 
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'products-index' }"
                        >
                        Товары
                    </router-link>
                    <router-link 
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'banners-index' }"
                        >
                        Баннеры
                    </router-link>
                    <router-link 
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'coupons-index' }"
                        >
                        Купоны
                    </router-link>
                    <router-link 
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'settings-index' }"
                        >
                        Настройки
                    </router-link>
                    <router-link 
                        class="list-group-item list-group-item-action"
                        :to="{ name: 'orders-index' }"
                        >
                        Заказы
                    </router-link>
                </nav>
            </div>
        </div>

        <router-view :key="$route.path" />

        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div class="toast-container">        
                <div class="toast show" v-for="toast in toasts" :key="toast.key">
                    <div class="toast-header text-white" :class="toast.style">
                        <strong class="me-auto"> Оповещение </strong>
                        <button type="button" class="btn-close btn-close-white" @click="delete_toast(toast)"></button>
                    </div>
                    <div class="toast-body" v-html="toast.text"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            toasts: 'app/toasts'
        })
    },
    
    methods: {
        ...mapActions({
            get_categories: 'category/get_items',
            delete_toast: 'app/delete_toast'
        })
    },

    created() {
        this.get_categories();
    }
}
</script>