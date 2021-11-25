<template>
    <div class="product-quantity-buttons">
        <button @click="decrease_quantity(product)"></button>
        <span> {{ quantity(product) }} </span>
        <button @click="increase_quantity(product)"></button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: [
        'product'
    ],

    computed: {
        ...mapGetters({
            quantity: 'cart/product_item_quantity'
        })
    },

    methods: {
        ...mapActions({
            increase_quantity: 'cart/increase_product_item_quantity',
            decrease_quantity: 'cart/decrease_product_item_quantity'
        })
    }
}
</script>