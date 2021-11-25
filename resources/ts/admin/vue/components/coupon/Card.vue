<template>
    <article class="card w-100">
        <ul class="list-group list-group-flush">
            <li 
                class="list-group-item d-flex justify-content-between align-items-start"
                :class="{ 
                    'bg-success': coupon.is_active,
                    'bg-danger': !coupon.is_active, 
                }">
                <h4 class="text-white mb-0"> {{ coupon.name }} </h4>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Код </div>
                    {{ coupon.value }}
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Скидка </div>
                    {{ coupon.discount.formatted }}
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Мин. стоимость заказа </div>
                    <template v-if="coupon.is_has_min_order_cost"> {{ coupon.min_order_cost?.formatted }} </template>
                    <template v-else> нет </template>
                </div>
            </li>
        </ul>
        <div class="card-footer d-flex">
            <button 
                class="btn btn-danger ms-auto"
                @click="on_delete_coupon(coupon.id)"
                >
                Удалить
            </button>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import { ModuleTypes, namespace } from "../../../store";
import * as CouponModule from '../../../store/modules/coupon'; 
import * as AppModule from '../../../store/modules/app';

import Coupon from "../../../classes/Coupon";
import Toast from "../../../classes/Toast";

export default defineComponent({
    props: {
        coupon: {
            type: Coupon,
            required: true,
        }
    },

    setup() {
        const store = useStore();

        const delete_coupon = (id: number) => store.dispatch(
            namespace(ModuleTypes.COUPON, CouponModule.ATypes.DELETE_ITEM), id
        );

        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            delete_coupon,
            add_toast,
        }
    },

    methods: {
        async on_delete_coupon(id: number) {
            await this.delete_coupon(id);
        
            this.add_toast(new Toast({
                text: `Купон <b>${this.coupon.name}</b> удален`,
                style: 'bg-danger' 
            }));
        }
    },
});
</script>