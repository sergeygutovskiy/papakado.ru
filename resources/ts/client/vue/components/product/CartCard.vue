<template>
    <article class="product-compact-card">
        <button class="product-compact-card__remove-btn" @click="remove_from_cart(product_item)"></button>
        <button class="product-compact-card__image-wrapper" @click="open_modal(product_item.product)">
            <img class="product-compact-card__image" :src="product_item.product.image_path">
        </button>
        <span class="product-compact-card__name"> {{ product_item.product.name }} </span>
        <span class="product-compact-card__weight"> {{ product_item.product.weight }} </span>
        
        <footer class="product-compact-card__footer">
            <quantity-buttons :product="product_item.product" />
            
            <div class="product-compact-card__prices">
                <span class="product-compact-card__price"> 
                    {{ product_item.product.real_price.formatted }} 
                </span>
                <span v-if="product_item.product.is_has_discount" class="product-compact-card__old-price">
                    {{ product_item.product.price.formatted }}
                </span>
            </div>
        </footer>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import { ModuleTypes, namespace } from "../../../store";
import * as CartModule from '../../../store/modules/cart';
import * as ModalModule from '../../../store/modules/modal';

import CartItem from "../../../classes/CartItem";
import Product from "../../../classes/Product";

import QuantityButtons from "./QuantityButtons.vue";

export default defineComponent({
    props: {
        product_item: {
            type: CartItem,
            required: true,
        }
    },
    
    setup() {
        const store = useStore();

        const remove_from_cart = (item: CartItem) => store.dispatch(
            namespace(ModuleTypes.CART, CartModule.ATypes.REMOVE_PRODUCT_ITEM), item
        );

        const open_modal = (product: Product) => store.dispatch(
            namespace(ModuleTypes.MODAL, ModalModule.ATypes.OPEN), product
        );

        return {
            remove_from_cart,
            open_modal,
        }
    },

    components: {
        QuantityButtons
    }
});
</script>