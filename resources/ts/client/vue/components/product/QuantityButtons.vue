<template>
    <div class="product-quantity-buttons">
        <button @click="decrease(product)"></button>
        <span > {{ cart_item(product)?.quantity }} </span>
        <button @click="increase(product)"></button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import { namespace, ModuleTypes } from '../../../store';
import * as CartModule from '../../../store/modules/cart';

import Product from '../../../classes/Product';

export default defineComponent({
    props: {
        product: {
            type: Product,
            required: true,
        }
    },
    
    setup() {
        const store = useStore();

        const increase = (product: Product) => {
            return store.dispatch( namespace(ModuleTypes.CART, CartModule.ATypes.INCREASE_PRODUCT_ITEM_QUANTITY), product )
        };
        const decrease = (product: Product) => {
            return store.dispatch( namespace(ModuleTypes.CART, CartModule.ATypes.DECREASE_PRODUCT_ITEM_QUANTITY), product)
        };
        const cart_item: CartModule.Getter<CartModule.GTypes.PRODUCT_ITEM> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.PRODUCT_ITEM) ]
        );

        return {
            increase,
            decrease,
            cart_item,
        }
    },
})
</script>
