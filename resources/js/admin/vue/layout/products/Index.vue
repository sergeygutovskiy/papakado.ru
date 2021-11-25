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

        <div 
            class="col-4 d-flex align-items-stretch mb-4"
            v-for="product in products"
            :key="product.id"
            >
            <card :product="product" />
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from './Card';

export default {
    components: {
        card: Card
    },
    
    computed: {
        ...mapGetters({
            products: 'product/items'
        })
    },

    methods: {
        ...mapActions({
            get_products: 'product/get_items'
        })
    },

    created() {
        if ( !this.products.length ) this.get_products();
    }
}
</script>