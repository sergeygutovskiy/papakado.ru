<template>
    <div class="ordering-confirmation">
        <dl class="ordering-confirmation-info list">
            <!-- Name -->
            <dt class="list__item-name"> Имя </dt>
            <dd class="list__item-value"> {{ delivery.fields.name.value }} </dd>

            <!-- Phone -->
            <dt class="list__item-name"> Телефон </dt>
            <dd class="list__item-value"> {{ delivery.fields.phone.value }} </dd>
            
            <!-- Address -->
            <template v-if="delivery.slug == DeliveryEnum.COURIER.slug">
                <dt class="list__item-name"> Адрес </dt>
                <dd class="list__item-value"> {{ delivery_street }} </dd>
            </template>

            <!-- Payment -->
            <dt class="list__item-name"> Оплата </dt>
            <dd class="list__item-value"> 
                {{ Object.values(PaymentEnum).find(i => i.slug = delivery.slug).label }}
            </dd>

            <!-- Persons quantity -->
            <dt class="list__item-name"> Кол-во персон </dt>
            <dd class="list__item-value"> {{ persons_quantity }} </dd>

            <!-- Comment -->
            <template v-if="delivery.fields.comment.value.length">
                <dt class="list__item-name"> Комментарий </dt>
                <dd class="list__item-value"> {{ delivery.fields.comment.value }} </dd>
            </template>
        </dl>

        <dl class="ordering-confirmation-products list">
            <!-- products -->
            <template 
                v-for="item in product_items" 
                :key="item.product.id"
                >
                <dt class="list__item-name"> 
                    {{ item.product.name }} 
                    <span class="ordering-confirmation-products__quantity"> (x{{ item.quantity }}) </span>
                </dt>
                <dd class="list__item-value"> 
                    {{ item.get_total_with_discount.get_formatted }} 
                </dd>
            </template>

            <!-- total -->
            <dt class="list__item-name"> Сумма </dt>
            <dd class="list__item-value"> {{ total.get_formatted }} </dd>

            <!-- discount -->
            <template v-if="discount > 0">
                <dt class="list__item-name"> Скидка </dt>
                <dd class="list__item-value"> -{{ discount.get_formatted }} </dd>
            </template>

            <!-- coupon -->
            <template v-if="coupon_valid">
                <dt class="list__item-name"> Промокод {{ coupon.value }} </dt>
                <dd class="list__item-value"> -{{ coupon.get_formatted_discount }} </dd>
            </template>

            <!-- total with discount -->
            <dt class="list__item-name list__item-name_big"> К оплате </dt>
            <dd class="list__item-value list__item-value_big"> {{ total_with_discount_and_coupon.get_formatted }} </dd>
        </dl>

        <footer class="ordering-footer ordering-block">
            <router-link 
                class="button button_transparent" 
                :to="{ name: 'ordering-checkout' }"
                >
                Назад к оформлению
            </router-link>
            <button 
                class="button" 
                @click="finish_ordering"
                >
                Заказать
            </button>
        </footer>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import store from '@-c/store';
import DeliveryEnum from '@/enums/Delivery';
import PaymentEnum from '@/enums/Payment';

export default {
    beforeRouteEnter(to, from, next) {
        if ( store.getters['ordering/is_valid'] ) next();
        else next({ name: 'ordering-checkout' });
    },

    created() {
        this.update_ordering_title('Подтверждение заказа');
    },

    computed: {
        ...mapGetters({
            delivery: 'ordering/delivery',
            delivery_street: 'ordering/delivery_street',
            
            payment: 'ordering/payment',
            
            product_items: 'cart/product_items',

            total: 'cart/total',
            total_with_discount: 'cart/total_with_discount',
            total_with_discount_and_coupon: 'cart/total_with_discount_and_coupon',
            
            discount: 'cart/discount',

            coupon: 'cart/coupon',
            coupon_valid: 'cart/coupon_valid',

            persons_quantity: 'cart/persons_quantity'
        }),

        DeliveryEnum() { return DeliveryEnum; },
        PaymentEnum() { return PaymentEnum; }
    },

    methods: {
        ...mapMutations({
            update_ordering_title: 'ordering/UPDATE_TITLE'
        }),

        ...mapActions({
            submit_order: 'ordering/submit'
        }),

        async finish_ordering() {
            const { redirect_url, external } = await this.submit_order();
            
            if (external) document.location.href = redirect_url;
            else this.$router.push({ path: redirect_url });
        }
    }
}
</script>