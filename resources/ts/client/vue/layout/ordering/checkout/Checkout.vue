<template>
    <div class="ordering-checkout">
        <div class="ordering-checkout-delivery ordering-block">
            <h2 class="ordering-block__title"> Доставка </h2>
            <div class="ordering-checkout-nav">
                <nav-button
                    v-for="(delivery, index) in deliveries"
                    :key="index"
                    :is_active="index === active_delivery"
                    @click="active_delivery = index"
                    >
                    {{ delivery.label }}
                </nav-button>
            </div>
            <div class="ordering-checkout-delivery__content">
                <component 
                    :is="deliveries[active_delivery].component" 
                    @form-input="get_delivery_fields" 
                    />
            </div>

            <div class="ordering-checkout-payment ordering-block">
                <h2 class="ordering-block__title"> Оплата </h2>
                <div class="ordering-checkout-nav">
                    <nav-button
                        v-for="(payment, index) in payments"
                        :key="index"
                        :is_active="index == active_payment"
                        v-show="is_payment_allowed(index)"
                        @click="active_payment = index"
                        >
                        {{ payment.label }}
                    </nav-button>
                </div>
                <div class="ordering-checkout-payment__content">
                    <component :is="payments[active_payment].component" />
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
                    :disabled="!valid"
                    @click="go_to_confirmation"
                    >
                    К подтверждению
                </button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';

import _store from '../../../../store';

import DeliveryEnum from '../../../../../enums/Delivery';
import PaymentEnum from '../../../../../enums/Payment';

import { ModuleTypes, namespace } from '../../../../store';
import * as OrderingModule from '../../../../store/modules/ordering';
import * as CartModule from '../../../../store/modules/cart';

import DeliveryCourierVue from './delivery/DeliveryCourier.vue';
import DeliveryPickupVue from './delivery/DeliveryPickup.vue';
import NavButtonVue from './NavButton.vue';

import PaymentOnlineVue from './payment/PaymentOnline.vue';
import PaymentCourierCardVue from './payment/PaymentCourierCard.vue';
import PaymentCourierCashVue from './payment/PaymentCourierCash.vue';
import PaymentInPlaceVue from './payment/PaymentInPlace.vue';

import FormField from '../../../../classes/FormField';

import Delivery from '../../../../classes/delivery/Delivery';
import CourierDelivery, { Address } from '../../../../classes/delivery/CourierDelivery';
import PickupDelivery from '../../../../classes/delivery/PickupDelivery';

import Payment from '../../../../classes/payment/Payment';
import OnlinePayment from '../../../../classes/payment/OnlinePayment';
import CourierCardPayment from '../../../../classes/payment/CourierCardPayment';
import CourierCashPayment from '../../../../classes/payment/CourierCashPayment';
import InPlacePayment from '../../../../classes/payment/InPlacePayment';

const _deliveries = {
    [DeliveryEnum.COURIER]: {
        label: 'Курьером',
        component: DeliveryCourierVue,
    },
    [DeliveryEnum.PICKUP]: {
        label: 'Самовывоз',
        component: DeliveryPickupVue
    }
};

const _payments = {
    [PaymentEnum.ONLINE]: {
        label: 'Онлайн',
        component: PaymentOnlineVue
    },
    [PaymentEnum.COURIER_CARD]: {
        label: 'Курьеру по карте',
        component: PaymentCourierCardVue
    },
    [PaymentEnum.COURIER_CASH]: {
        label: 'Курьеру наличными',
        component: PaymentCourierCashVue
    },
    [PaymentEnum.IN_PLACE]: {
        label: 'В ресторане',
        component: PaymentInPlaceVue
    },
}

export default defineComponent({
    beforeRouteEnter(to, from, next) {
        if ( _store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.IS_VALID) ] ) next();
        else next({ name: 'ordering-cart' });
    },
    
    setup() {
        const store = useStore();

        const update_title = (title: string) => store.commit(
            namespace(ModuleTypes.ORDERING, OrderingModule.MTypes.UPDATE_TITLE), title
        );
        const update_delivery = (delivery: Delivery) => store.commit(
            namespace(ModuleTypes.ORDERING, OrderingModule.MTypes.UPDATE_DELIVERY), delivery
        );
        const update_payment = (payment: Payment) => store.commit(
            namespace(ModuleTypes.ORDERING, OrderingModule.MTypes.UPDATE_PAYMENT), payment
        );

        const deliveries = computed(() => _deliveries);
        const payments = computed(() => _payments);

        return {
            update_title,
            update_delivery,
            update_payment,

            deliveries,
            payments,
        }
    },

    components: {
        'nav-button': NavButtonVue,
    },

    data() {
        return {
            active_delivery: DeliveryEnum.COURIER,
            active_payment: CourierDelivery.alowed_payments[0],

            fields: {},
        } as {
            active_delivery: DeliveryEnum,
            active_payment: PaymentEnum,

            fields: any
        }
    },

    computed: {
        valid(): boolean {
            const fields_array : FormField[] = Object.values(this.fields);
            return fields_array.reduce( (acc: boolean, field) => field.valid && acc, true );
        }
    },

    methods: {
        get_delivery_fields(fields: Object) : void {
            this.fields = fields;
        },

        is_payment_allowed(payment: PaymentEnum) : boolean {
            if ( this.active_delivery === DeliveryEnum.COURIER )
                return CourierDelivery.alowed_payments.indexOf(payment) !== -1;

            return PickupDelivery.alowed_payments.indexOf(payment) !== -1;
        },

        go_to_confirmation() : void {            
            let delivery = null;

            const delivery_primary_fields = {
                name: this.fields.name.value,
                phone: this.fields.phone.value,
                comment: this.fields.comment.value,
            };

            if ( this.active_delivery === DeliveryEnum.COURIER ) {
                const address = new Address({
                    street: this.fields.street.value,
                    house: this.fields.house.value,
                    floor: this.fields.floor.value,
                    room: this.fields.room.value,
                    entrance: this.fields.entrance.value,
                    intercom: this.fields.intercom.value,
                });

                delivery = new CourierDelivery(delivery_primary_fields, address);
            }
            else {
                delivery = new PickupDelivery(delivery_primary_fields);
            }

            let payment = null;

            if ( this.active_payment === PaymentEnum.ONLINE) payment = new OnlinePayment();
            else if ( this.active_payment === PaymentEnum.COURIER_CARD ) payment = new CourierCardPayment();
            else if ( this.active_payment === PaymentEnum.COURIER_CASH ) payment = new CourierCashPayment();
            else payment = new InPlacePayment();

            this.update_delivery(delivery);
            this.update_payment(payment);

            this.$router.push({ name: 'ordering-confirmation' });
        }
    },

    watch: {
        active_delivery: function(value) {
            if ( this.is_payment_allowed(this.active_payment) ) return;

            if ( this.active_delivery === DeliveryEnum.COURIER )
                this.active_payment = CourierDelivery.alowed_payments[0];
            else
                this.active_payment = PickupDelivery.alowed_payments[0];
        }
    },

    created() {
        const title : any = this.$route.meta.title;
        
        if ( title ) document.title = 'Papakado — ' + title;
        else document.title = 'Papakado';

        // 

        this.update_title('Оформление заказа');
    },
})
</script>
