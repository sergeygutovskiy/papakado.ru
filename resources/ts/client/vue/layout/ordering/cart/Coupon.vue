<template>
    <div class="ordering-cart-coupon ordering-block">
        <h2 class="ordering-block__title"> Промокод </h2>
        <input 
            class="input" 
            type="text" 
            placeholder="Введите промокод" 
            v-model="coupon_value" 
            :disabled="disabled"
            >
        <button class="button" @click="check_coupon" :disabled="disabled || !coupon_value">
            <template v-if="!coupon">
                Применить
            </template>
            <template v-else>
                Применен
            </template>
        </button>
        <p class="ordering-cart-coupon__message" v-if="error_message">
            {{ error_message }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import * as CartModule from '../../../../store/modules/cart'; 

import Coupon from "../../../../classes/Coupon";
import { ModuleTypes, namespace } from "../../../../store";
import { computed } from "vue";
import axios from "axios";
import Currency from "../../../../../classes/Currency";

export default defineComponent({
    props: {
        total: {
            type: Currency,
            required: true,
        }
    },
    
    setup() {
        const store = useStore();

        const update_coupon = (coupon: Coupon) => store.commit(
            namespace(ModuleTypes.CART, CartModule.MTypes.UPDATE_COUPON), coupon
        );

        const coupon : CartModule.Getter<CartModule.GTypes.COUPON> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.COUPON) ]
        );

        return {
            update_coupon,
            coupon,
        }
    },

    data() {
        return {
            coupon_value: '',
            disabled: false,
            error_message: null,
        } as {
            coupon_value: string,
            disabled: boolean,
            error_message: string | null,
        }
    },

    created() {
        if ( this.coupon ) {
            this.coupon_value = this.coupon.value; 
            this.disabled = true;
        }
    },

    methods: {
        async check_coupon() {
            this.disabled = true;
            this.error_message = null;

            const response = await axios.get(`/api/client/coupons/${this.coupon_value}/check`);
            const coupon_data = response.data.data;

            if (coupon_data !== null) {
                const coupon = new Coupon(coupon_data);

                if ( coupon.is_valid(this.total.value) ) 
                {
                    this.update_coupon(coupon);
                    return;
                } 
                else 
                {
                    this.error_message = coupon.get_error_message(this.total.value);
                }
            } else {
                this.error_message = 'Купон не найден';
            }

            this.disabled = false;
        }
    }
});
</script>