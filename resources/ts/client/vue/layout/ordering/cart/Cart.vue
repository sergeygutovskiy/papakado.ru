<template>
    <div class="ordering-cart">
        <div class="ordering-cart-products">
            <transition-group name="ordering-cart-products-animation">
                <cart-card
                    v-for="item in cart_product_items"
                    :key="item.product.id"
                    :product_item="item"
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

        <coupon-vue :total="total" />

        <div class="ordering-block">
            <h2 class="ordering-block__title"> Оформление заказа </h2>
            
            <div class="ordering-cart-checkout">
                <dl class="ordering-cart-checkout__list list">
                    <dt class="ordering-cart-checkout__name list__item-name"> Сумма </dt>
                    <dd class="ordering-cart-checkout__value list__item-value"> 
                        {{ sum.formatted }} 
                    </dd>

                    <template v-if="products_discount.value > 0">
                        <dt class="list__item-name"> Скидка </dt>
                        <dd class="list__item-value"> 
                            -{{ products_discount.formatted }} 
                        </dd>
                    </template>

                    <template v-if="coupon">
                        <dt class="list__item-name"> 
                            Промокод {{ coupon.value }} 
                        </dt>
                        <dd class="list__item-value">
                            -{{ coupon.discount.formatted }}
                        </dd>
                    </template>

                    <dt class="list__item-name list__item-name_big"> 
                        К оплате 
                    </dt>
                    <dd class="list__item-value list__item-value_big"> 
                        {{ total.formatted }} 
                    </dd>
                </dl>
                <router-link 
                    v-if="is_shop_open"
                    :disabled="!is_valid"
                    :to="{ name: 'ordering-checkout' }" 
                    class="ordering-cart-checkout__btn button"
                    >
                    Оформить заказ
                </router-link>
                <button 
                    v-else
                    disabled
                    class="ordering-cart-checkout__btn button"
                    >
                    Магазин откроется в {{ setting('shop_open_at') }}
                </button>
            </div>
            
            <p class="ordering-cart-checkout__info-text">
                Минимальная сумма заказа для доставки: 800 ₽
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useStore } from 'vuex';
import { ModuleTypes, namespace } from '../../../../store';

import * as OrderingModule from '../../../../store/modules/ordering'; 
import * as CartModule from '../../../../store/modules/cart'; 
import * as AppModule from '../../../../store/modules/app';

import CartCard from '../../../components/product/CartCard.vue';
import CouponVue from './Coupon.vue';

export default defineComponent({
    setup() {
        const store = useStore();

        const update_title = (title: string) => store.commit(
            namespace(ModuleTypes.ORDERING, OrderingModule.MTypes.UPDATE_TITLE), title
        );

        const cart_product_items : CartModule.Getter<CartModule.GTypes.PRODUCT_ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.PRODUCT_ITEMS) ]
        );
        const persons_quantity : CartModule.Getter<CartModule.GTypes.PERSONS_QUANTITY> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.PERSONS_QUANTITY) ]
        );

        const sum : CartModule.Getter<CartModule.GTypes.PRODUCTS_SUM> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.PRODUCTS_SUM) ]
        );
        const total : CartModule.Getter<CartModule.GTypes.TOTAL> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.TOTAL) ]
        );
        const products_discount : CartModule.Getter<CartModule.GTypes.PRODUCTS_DISCOUNT> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.PRODUCTS_DISCOUNT) ]
        );

        const coupon : CartModule.Getter<CartModule.GTypes.COUPON> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.COUPON) ]
        );

        const is_valid : CartModule.Getter<CartModule.GTypes.IS_VALID> = computed(
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.IS_VALID) ]
        );

        const increase_persons_quantity = () => store.dispatch(
            namespace(ModuleTypes.CART, CartModule.ATypes.INCREASE_PERSONS_QUANTITY)
        );
        const decrease_persons_quantity = () => store.dispatch(
            namespace(ModuleTypes.CART, CartModule.ATypes.DECREASE_PERSONS_QUANTITY)
        );

        const setting : AppModule.Getter<AppModule.GTypes.SETTING_BY_SLUG> = computed(
            (slug: string) => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.SETTING_BY_SLUG) ]
        );

        return {
            update_title,

            cart_product_items,
            persons_quantity,

            sum,
            total,
            products_discount,

            coupon,

            is_valid,

            increase_persons_quantity,
            decrease_persons_quantity,

            setting,
        }
    },

    components: {
        CartCard,
        CouponVue,
    },

    computed: {
        is_shop_open: function() : boolean {
            const current_date = new Date();

            const current_hours = current_date.getHours();
            const current_minutes = current_date.getMinutes();

            const max_time = this.setting('ordering_max_time');
            const max_time_weekends = this.setting('ordering_weekends_max_time');
            const min_time = this.setting('shop_open_at');

            if ( !max_time || !min_time || !max_time_weekends ) return false;

            // 

            const [ min_hours, min_minutes ] = min_time.split(':').map(i => parseInt(i));
            const less_then_min_time = 
                current_hours < min_hours
                || current_hours === min_hours && current_minutes < min_minutes
                ;

            if ( less_then_min_time ) return false;

            // 

            if ( 
                current_date.getUTCDay() === 5 
                || current_date.getUTCDay() === 6 
                || current_date.getUTCDay() === 0
                ) //  пт - вск
            {
                const [ max_hours, max_minutes ] = max_time_weekends.split(':').map(i => parseInt(i)); 

                const more_then_max_time = 
                    current_hours > max_hours 
                    || current_hours === max_hours && current_minutes > max_minutes
                    ;

                if ( more_then_max_time ) return false;
            }

            // 

            const [ max_hours, max_minutes ] = max_time.split(':').map(i => parseInt(i)); 

            const more_then_max_time = 
                current_hours > max_hours 
                || current_hours === max_hours && current_minutes > max_minutes
                ;

            return !more_then_max_time;
        },
    },

    created() {
        const title : any = this.$route.meta.title;
        
        if ( title ) document.title = 'Papakado — ' + title;
        else document.title = 'Papakado';

        // 

        this.update_title('Корзина');
    },
})
</script>
