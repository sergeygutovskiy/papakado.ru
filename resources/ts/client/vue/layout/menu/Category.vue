<template>
    <div class="menu-category" v-if="category">
        <div class="menu-category__nav">
            <h1 class="menu-category__name">
                {{ category.name }}
            </h1>
        </div>
        <div class="menu-category__products">
            <product-card 
                v-for="product in products" 
                :key="product.id" 
                :product="product" 
                />
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { defineComponent } from '@vue/runtime-core';

import { namespace, ModuleTypes } from '../../../store';
import * as AppModule from '../../../store/modules/app';
import * as CategoryModule from '../../../store/modules/category';

import ProductCard from '../../components/product/Card.vue';
import Category from '../../../classes/Category';

export default defineComponent({
    props: {
        slug: {
            type: String,
            required: true,
        }
    },

    setup() {
        const store = useStore();

        const categories : AppModule.Getter<AppModule.GTypes.CATEGORIES> = computed( 
            () => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.CATEGORIES) ] 
        );
        const get_category_by_slug : AppModule.Getter<AppModule.GTypes.CATEGORY_BY_SLUG> = computed( 
            () => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.CATEGORY_BY_SLUG) ]
        );
        const products : CategoryModule.Getter<CategoryModule.GTypes.PRODUCTS> = computed(
            () => store.getters[ namespace(ModuleTypes.CATEGORY, CategoryModule.GTypes.PRODUCTS) ]
        );
        
        const request_categories = () => 
            store.dispatch( namespace(ModuleTypes.APP, AppModule.ATypes.REQUEST_CATEGORIES) );
        const request_products = (category: Category) => 
            store.dispatch( namespace(ModuleTypes.CATEGORY, CategoryModule.ATypes.REQUEST_PRODUCTS), category );
    
        return {
            categories,
            get_category_by_slug,
            products,

            request_categories,
            request_products,
        }
    },

    components: {
        ProductCard,
    },

    data() {
        return {
            category: null
        } as {
            category: Category | null
        }
    },

    async created() {
        if ( !this.categories.length )await this.request_categories();
    
        const found_category : Category | undefined = this.get_category_by_slug(this.slug);
        if ( found_category === undefined ) return;

        this.category = found_category;        
        this.request_products(this.category);
  
        // 

        document.title = 'Papakado — Меню — ' + this.category.name;
    },
});
</script>