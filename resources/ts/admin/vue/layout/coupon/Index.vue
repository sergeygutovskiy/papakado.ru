<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Купоны </h1>
                    <router-link
                        :to="{ name: 'coupons-add' }"
                        class="btn btn-success"
                        >
                        Добавить
                    </router-link>
                </div>
            </div>
        </div>

        <div 
            class="col-4 d-flex align-items-stretch mb-4"
            v-for="coupon in coupons"
            :key="coupon.id"
            >
            <card :coupon="coupon" />
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as CouponModule from '../../../store/modules/coupon'; 

import Card from "../../components/coupon/Card.vue";

export default defineComponent({
    setup() {
        const store = useStore();

        const coupons: CouponModule.Getter<CouponModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.COUPON, CouponModule.GTypes.ITEMS) ]
        );

        const request_coupons = () => store.dispatch(
            namespace(ModuleTypes.COUPON, CouponModule.ATypes.REQUEST_ITEMS)
        );

        return {
            coupons,
            request_coupons,
        }
    },

    components: {
        Card
    },

    created() {
        if ( !this.coupons.length ) this.request_coupons();
    },
});
</script>