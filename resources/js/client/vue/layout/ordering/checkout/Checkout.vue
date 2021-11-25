<template>
    <div class="ordering-checkout">
        <div class="ordering-checkout-delivery ordering-block">
            <h2 class="ordering-block__title"> Доставка </h2>
            <div class="ordering-checkout-nav">
                <nav-button
                    v-for="(value, index) in deliveries"
                    :key="index"
                    :is_active="index == active_delivery"
                    @click="active_delivery = index"
                    >
                    {{ value.label }}
                </nav-button>
            </div>
            <div class="ordering-checkout-delivery__content">
                <component 
                    :is="delivery_component" 
                    @form-input="get_delivery_fields" 
                    />
            </div>
        </div>

        <div class="ordering-checkout-payment ordering-block">
            <h2 class="ordering-block__title"> Оплата </h2>
            <div class="ordering-checkout-nav">
                <nav-button
                    v-for="(value, index) in payments"
                    :key="index"
                    :is_active="index == active_payment"
                    v-show="is_payment_allowed(index)"
                    @click="active_payment = index"
                    >
                    {{ value.label }}
                </nav-button>
            </div>
            <div class="ordering-checkout-payment__content">
                <component :is="payment_component" />
            </div>
        </div>

        <footer class="ordering-footer ordering-block">
            <router-link 
                class="button button_transparent" 
                :to="{ name: 'ordering-cart' }"
                >
                Назад к корзине
            </router-link>
            <button 
                class="button" 
                :disabled="!is_valid"
                @click="continue_ordering"
                >
                К подтверждению
            </button>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Courier from './delivery/Courier';
import Pickup from './delivery/Pickup';

import CardCourier from './payment/CardCourier';
import CashCourier from './payment/CashCourier';
import Online from './payment/Online';
import InPlace from './payment/InPlace';

import NavButton from './NavButton';

import DeliveryEnum from '@/enums/Delivery';
import PaymentEnum from '@/enums/Payment';

import store from '@/client/store';

const checkout = {
    deliveries: {
        [DeliveryEnum.COURIER.slug]: {
            component: Courier,
            label: 'Курьером',
            allowed_payments: [
                PaymentEnum.ONLINE.slug, 
                PaymentEnum.COURIER_CARD.slug, 
                PaymentEnum.COURIER_CASH.slug
            ]
        },
        [DeliveryEnum.PICKUP.slug]: {
            component: Pickup,
            label: 'Самовывоз',
            allowed_payments: [
                PaymentEnum.ONLINE.slug, 
                PaymentEnum.IN_PLACE.slug
            ]
        },
    },

    payments: {
        [PaymentEnum.ONLINE.slug]: { component: Online, label: PaymentEnum.ONLINE.label },
        [PaymentEnum.COURIER_CARD.slug]: { component: CardCourier, label: PaymentEnum.COURIER_CARD.label },
        [PaymentEnum.COURIER_CASH.slug]: { component: CashCourier, label: PaymentEnum.COURIER_CASH.label },
        [PaymentEnum.IN_PLACE.slug]: { component: InPlace, label: PaymentEnum.IN_PLACE.label }
    }
}

export default {
    beforeRouteEnter(to, from, next) {
        if ( store.getters['cart/is_valid'] ) next();
        else next({ name: 'ordering-cart' });
    },

    components: {
        NavButton
    },
    
    data() {
        return {
            active_delivery: DeliveryEnum.COURIER.slug,
            active_payment: PaymentEnum.ONLINE.slug,

            delivery_fields: null,
        }
    },

    computed: {
        ...mapGetters({
            delivery: 'ordering/delivery',
            payment: 'ordering/payment'
        }),

        deliveries() { return checkout.deliveries; },
        payments() { return checkout.payments; },

        delivery_component() { return checkout.deliveries[this.active_delivery].component; },
        payment_component() { return checkout.payments[this.active_payment].component; },
    
        is_valid() {
            return this.delivery_fields && Object
                .values(this.delivery_fields)
                .reduce( (acc, field) => field.is_valid && acc, true );
        }
    },

    methods: {
        ...mapMutations({
            update_ordering_title: 'ordering/UPDATE_TITLE',

            update_delivery: 'ordering/UPDATE_DELIVERY',
            update_payment: 'ordering/UPDATE_PAYMENT'
        }),
            
        get_delivery_fields(fields) { this.delivery_fields = fields; },

        continue_ordering() {
            this.update_delivery({
                slug: this.active_delivery,
                fields: this.delivery_fields 
            });

            this.update_payment({ slug: this.active_payment });
            this.$router.push({ name: 'ordering-confirmation' });
        },

        is_payment_allowed(payment) { 
            return !!checkout.deliveries[this.active_delivery].allowed_payments.find(p => p === payment);
        }
    },

    watch: {
        active_delivery: function(val) {
            if ( !this.is_payment_allowed(this.active_payment) )
                this.active_payment = Object.keys(this.payments)[0];
        }
    },

    created() {
        this.update_ordering_title('Оформление заказа');

        if ( this.payment ) this.active_payment = this.payment.slug;
        if ( this.delivery ) this.active_delivery = this.delivery.slug;
    }
}
</script>