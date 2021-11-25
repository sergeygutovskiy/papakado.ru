<template>
    <section class="row" v-if="order">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Заказ #{{ order.id }}</h1>
                    <router-link :to="{ name: 'orders-index' }" class="btn btn-success">
                        Назад ко всем заказам 
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-12">
            <card :order="order" :opened="true" />
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";

import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as OrderModule from '../../../store/modules/order';

import Order from "../../../classes/Order";

import Card from "../../components/order/Card.vue";

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    
    components: { 
        Card 
    },

    setup() {
        const store = useStore();
        
        const request_order : (id: string) => Promise<Order> = (id) => store.dispatch(
            namespace(ModuleTypes.ORDER, OrderModule.ATypes.REQUEST_ITEM), id
        );

        return {
            request_order,
        }
    },

    data() {
        return {
            order: null,
        } as {
            order: Order | null,
        }
    },

    async created() {
        this.order = await this.request_order(this.id);
    }
});
</script>