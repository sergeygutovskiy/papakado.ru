<template>
    <article class="product-card">
        <skeleton-image
            class="product-card__image-wrapper"
            :image_path="product.image_path"
            @click="open_modal(product)"
        />

        <div class="product-card__content">
            <span class="product-card__name"> {{ product.name }}  </span>
            <p class="product-card__description">
                {{ product.description }}
            </p>
            <footer class="product-card__footer">
                <div class="product-card__numbers">
                    <span class="product-card__price"> {{ product.get_real_price.get_formatted }} </span>
                    <span class="product-card__weight"> {{ product.weight }} </span>
                </div>
                <div class="product-card__action-wrapper">
                    <button 
                        v-if="!is_isset_in_cart(product)"
                        class="product-card__action"
                        @click="add_to_cart(product)"
                        ></button>
                    <div v-else class="product-card-buttons">
                        <quantity-buttons :product="product"></quantity-buttons>
                        <router-link :to="{ name: 'ordering-cart' }" class="product-card-buttons__cart"></router-link>
                    </div>
                </div>
            </footer>
        </div>
    </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import QuantityButtons from './QuantityButtons';
import SkeletonImage from '@-c-vue/components/skeleton-image/SkeletonImage';

export default {
    props: [
        'product'
    ],

    components: {
        QuantityButtons,
        SkeletonImage
    },

    computed: {
        ...mapGetters({
            is_isset_in_cart: 'cart/is_contains_product_item'
        })
    },

    methods: {
        ...mapActions({
            add_to_cart: 'cart/add_product_item',
            open_modal: 'modal/open'
        })
    }
}
</script>