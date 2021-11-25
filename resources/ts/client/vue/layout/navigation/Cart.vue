<template>
    <router-link :to="{ name: 'ordering-cart' }" class="navigation-cart">
        <span class="navigation-cart__icon"></span>
        <span class="navigation-cart__total"> {{ total.formatted }} </span>
        <span class="navigation-cart__amount"> {{ quantity_formatted }} </span>
    </router-link>            
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import { ModuleTypes, namespace } from "../../../store";
import * as CartModule from '../../../store/modules/cart';

export default defineComponent({
    setup() {
        const store = useStore();

        const total : CartModule.Getter<CartModule.GTypes.TOTAL> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.TOTAL) ]
        );
        const quantity_formatted : CartModule.Getter<CartModule.GTypes.QUANTITY_FORMATTED> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.QUANTITY_FORMATTED) ]
        );

        return {
            total,
            quantity_formatted,
        }
    }
});
</script>