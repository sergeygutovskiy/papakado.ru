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

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductCard from '@-c-vue/components/product/Card';

export default {
    components: {
        productCard: ProductCard
    },

    props: [
        'slug'
    ],

    data() {
        return {
            category: null
        }
    },

    computed: {
        ...mapGetters({
            categories: 'app/categories',
            category_by_slug: 'app/category_by_slug',
            
            products: 'category/products',
        })
    },

    methods: {
        ...mapActions({
            get_categories: 'app/get_categories',
            get_products: 'category/get_products'
        })
    },

    async created() {
        if ( !this.categories.length ) await this.get_categories();
        
        this.category = this.category_by_slug(this.slug);

        await this.get_products(this.category.id);
    }
}
</script>