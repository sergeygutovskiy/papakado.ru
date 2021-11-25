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
                    <span class="product-card__price"> {{ product.real_price.formatted }} </span>
                    <span class="product-card__weight"> {{ product.weight }} </span>
                </div>
                <div class="product-card__action-wrapper">
                    <button 
                        v-if="!is_in_cart(product)"
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

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { namespace, ModuleTypes } from '../../../store';
import * as CartModule from '../../../store/modules/cart'; 
import * as ModalModule from '../../../store/modules/modal';

import Product from '../../../classes/Product';

import SkeletonImage from '../skeleton-image/SkeletonImage.vue';
import QuantityButtons from './QuantityButtons.vue';

export default defineComponent({
    props: { 
        product: {
            type: Product,
            required: true,
        }
    },

    setup() {
        const store = useStore();

        const is_in_cart : CartModule.Getter<CartModule.GTypes.IS_CONTAINS_PRODUCT_ITEM> = computed( 
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.IS_CONTAINS_PRODUCT_ITEM) ]
        );
        const add_to_cart = (product: Product) => store.dispatch(
            namespace(ModuleTypes.CART, CartModule.ATypes.ADD_PRODUCT_ITEM), product
        );

        const open_modal = (product: Product) => store.dispatch( 
            namespace(ModuleTypes.MODAL, ModalModule.ATypes.OPEN), product 
        );

        return {
            is_in_cart,
            add_to_cart,

            open_modal,
        }
    },

    components: {
        SkeletonImage,
        QuantityButtons
    },
});
</script>