<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Заказы </h1>
                </div>
            </div>
        </div>

        <div 
            v-for="order in orders"
            :key="order.id"
            class="col-xl-8 mb-4"
            >
            <card :order="order" />
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";

import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as OrderModule from '../../../store/modules/order';

import Card from "../../components/order/Card.vue";

export default defineComponent({
    setup() {
        const store = useStore();

        const orders : OrderModule.Getter<OrderModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.ORDER, OrderModule.GTypes.ITEMS) ]
        );

        const request_orders = () => store.dispatch(
            namespace(ModuleTypes.ORDER, OrderModule.ATypes.REQUEST_ITEMS)
        );

        return {
            orders,
            request_orders,
        }
    },

    components: {
        Card,
    },

    created() {
        if ( !this.orders.length ) this.request_orders();
    }
})
</script>
