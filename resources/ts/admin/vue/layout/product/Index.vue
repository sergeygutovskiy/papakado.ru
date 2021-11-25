<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Товары </h1>
                    <router-link
                        :to="{ name: 'products-add' }"
                        class="btn btn-success"
                        >
                        Добавить
                    </router-link>
                </div>
            </div>
        </div>

        <div class="col-3">
            <div class="list-group">
                <button 
                    class="list-group-item list-group-item-action"
                    @click="get_all_products"
                    >
                    Все
                </button>

                <button
                    v-for="category in all_categories"
                    :key="category.id"
                    class="list-group-item list-group-item-action"
                    @click="get_category_products(category.id)"
                >
                    {{ category.name }}
                </button>
            </div>
        </div>

        <div class="col-9" v-if="products.length">
            <sorting-list :products="products" />
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import { ModuleTypes, namespace } from "../../../store";

import * as ProductModule from '../../../store/modules/product'; 
import * as CategoryModule from '../../../store/modules/category';

import SortingList from "../../components/product/SortingList.vue";
import Product from "../../../classes/Product";

export default defineComponent({
    setup() {
        const store = useStore();

        const all_products: ProductModule.Getter<ProductModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.PRODUCT, ProductModule.GTypes.ITEMS) ]
        );

        const all_categories: CategoryModule.Getter<CategoryModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.CATEGORY, CategoryModule.GTypes.ITEMS) ]
        );

        const request_products = () => store.dispatch(
            namespace(ModuleTypes.PRODUCT, ProductModule.ATypes.REQUEST_ITEMS)
        );

        const request_category_products = (id: number) => store.dispatch(
            namespace(ModuleTypes.CATEGORY, CategoryModule.ATypes.REQUEST_ITEM_PRODUCTS), id
        );

        return {
            all_products,
            request_products,
        
            all_categories,
            request_category_products,
        }
    },

    data() {
        return {
            products: [],
        } as {
            products: Product[],
        }
    },

    components: {
        SortingList
    },

    methods: {
        async get_category_products(id: number) {
            this.products = await this.request_category_products(id);
        },

        async get_all_products() {
            await this.request_products();
            this.products = this.all_products;
        },
    },

    created() {    
        this.get_all_products();
    },
});
</script>