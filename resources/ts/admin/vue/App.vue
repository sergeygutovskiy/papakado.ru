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
                        <button 
                            type="button" 
                            class="btn-close btn-close-white" 
                            @click="delete_toast(toast)"
                            ></button>
                    </div>
                    <div class="toast-body" v-html="toast.text"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';

import Category from '../classes/Category';
import Toast from '../classes/Toast';

import { ModuleTypes, namespace } from '../store';

import * as AppModule from '../store/modules/app';
import * as CategoryModule from '../store/modules/category'

export default defineComponent({
    setup() {
        const store = useStore();

        const toasts : AppModule.Getter<AppModule.GTypes.TOASTS> = computed(
            () => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.TOASTS) ]
        );

        const delete_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.DELETE_TOAST), toast
        );
        const request_categories : () => Promise<Category[]> = () => store.dispatch(
            namespace(ModuleTypes.CATEGORY, CategoryModule.ATypes.REQUEST_ITEMS)
        );

        return {
            toasts,

            delete_toast,
            request_categories,
        }
    },

    created() {
        this.request_categories();
    },
})
</script>
