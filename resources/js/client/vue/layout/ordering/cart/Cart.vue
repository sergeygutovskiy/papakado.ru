<template>
    <div class="ordering-cart">
        <div class="ordering-cart-products">
            <transition-group name="ordering-cart-products-animation">
                <compact-card
                    v-for="item in product_items"
                    :key="item.product.id"
                    :product="item.product"
                />
            </transition-group>

            <article class="product-compact-card">
                <div></div>
                <div class="product-compact-card__image-wrapper">
                    <img class="product-compact-card__image" src="/images/cart-persons-quantity.png">
                </div>
                <span class="product-compact-card__name"> Количество персон </span>
                <span class="product-compact-card__weight"> Палочки для суши, соевый соус, васаби </span>
                
                <footer class="product-compact-card__footer">
                    <div class="product-quantity-buttons">
                        <button @click="decrease_persons_quantity"></button>
                        <span> {{ persons_quantity }} </span>
                        <button @click="increase_persons_quantity"></button>
                    </div>
                    
                    <div class="product-compact-card__prices">
                        <span class="product-compact-card__price"> Бесплатно </span>
                    </div>
                </footer>
            </article>
        </div>

        <cart-coupon />

        <div class="ordering-block">
            <h2 class="ordering-block__title"> Оформление заказа </h2>
            
            <div class="ordering-cart-checkout">
                <dl class="ordering-cart-checkout__list list">
                    <dt class="ordering-cart-checkout__name list__item-name"> Сумма </dt>
                    <dd class="ordering-cart-checkout__value list__item-value"> 
                        {{ total.get_formatted }} 
                    </dd>

                    <template v-if="discount > 0">
                        <dt class="list__item-name"> Скидка </dt>
                        <dd class="list__item-value"> 
                            -{{ discount.get_formatted }} 
                        </dd>
                    </template>

                    <template v-if="coupon_valid">
                        <dt class="list__item-name"> 
                            Промокод {{ coupon.get_value }} 
                        </dt>
                        <dd class="list__item-value">
                            -{{ coupon.get_formatted_discount }}
                        </dd>
                    </template>

                    <dt class="list__item-name list__item-name_big"> 
                        К оплате 
                    </dt>
                    <dd class="list__item-value list__item-value_big"> 
                        {{ total_with_discount_and_coupon.get_formatted }} 
                    </dd>
                </dl>
                <router-link 
                    :to="{ name: 'ordering-checkout' }" 
                    class="ordering-cart-checkout__btn button"
                    :disabled="!is_valid"
                    >
                    Оформить заказ
                </router-link>
            </div>
            
            <p class="ordering-cart-checkout__info-text">
                Минимальная сумма заказа для доставки: 800 ₽
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import CompactCard from '@-c-vue/components/product/CompactCard';
import CartCoupon from './Coupon';

export default {
    components: {
        CompactCard, CartCoupon
    },

    created() {
        this.update_ordering_title('Корзина');
    },

    computed: {
        ...mapGetters({
            product_items: 'cart/product_items',
            quantity: 'cart/quantity',

            total: 'cart/total',
            total_with_discount: 'cart/total_with_discount',
            total_with_discount_and_coupon: 'cart/total_with_discount_and_coupon',
            discount: 'cart/discount',

            coupon: 'cart/coupon',
            coupon_valid: 'cart/coupon_valid',

            persons_quantity: 'cart/persons_quantity',

            is_valid: 'cart/is_valid'
        })
    },

    methods: {
        ...mapMutations({
            update_ordering_title: 'ordering/UPDATE_TITLE'
        }),

        ...mapActions({
            increase_persons_quantity: 'cart/increase_persons_quantity',
            decrease_persons_quantity: 'cart/decrease_persons_quantity'
        })
    }
}
</script>