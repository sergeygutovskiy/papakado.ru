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
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapGetters } from 'vuex';

import Coupon from '@-c/classes/Coupon';

export default {
    data() {
        return {
            coupon_value: '',
            disabled: false
        }
    },

    created() {
        if ( this.coupon ) {
            this.coupon_value = this.coupon.value; 
            this.disabled = true;
        }
    },

    computed: {
        ...mapGetters({
            coupon: 'cart/coupon'
        })
    },

    methods: {
        ...mapMutations({
            update_coupon: 'cart/UPDATE_COUPON'
        }),

        async check_coupon() {
            this.disabled = true;

            const response = await axios.get(`/api/client/coupons/${this.coupon_value}/check`);
            const coupon = response.data.data;

            if (coupon !== null) {
                this.update_coupon(new Coupon(coupon));
                return;
            }

            this.disabled = false;
        }
    }
}
</script>