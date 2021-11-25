<template>
    <article class="product-compact-card">
        <button class="product-compact-card__remove-btn" @click="remove(product)"></button>
        <button class="product-compact-card__image-wrapper" @click="open_modal(product)">
            <img class="product-compact-card__image" :src="product.image_path">
        </button>
        <span class="product-compact-card__name"> {{ product.name }} </span>
        <span class="product-compact-card__weight"> {{ product.weight }} </span>
        
        <footer class="product-compact-card__footer">
            <quantity-buttons v-if="is_isset_in_cart(product)" :product="product" />
            
            <div class="product-compact-card__prices">
                <span class="product-compact-card__price"> 
                    {{ product.get_real_price.get_formatted }} 
                </span>
                <span v-if="product.is_have_discount" class="product-compact-card__old-price">
                    {{ product.price.get_formatted }}
                </span>
            </div>
        </footer>
    </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import QuantityButtons from './QuantityButtons';

export default {
    props: [
        'product'
    ],

    components: {
        QuantityButtons
    },

    computed: {
        ...mapGetters({
            is_isset_in_cart: 'cart/is_contains_product_item'
        })
    },

    methods: {
        ...mapActions({
            remove: 'cart/remove_product_item',
            open_modal: 'modal/open'
        })
    }
}
</script>