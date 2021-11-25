<template>
    <div class="ordering-confirmation" v-if="delivery && payment">
        <dl class="ordering-confirmation-info list">
            <!-- Name -->
            <dt class="list__item-name"> Имя </dt>
            <dd class="list__item-value"> {{ delivery.name }} </dd>

            <!-- Phone -->
            <dt class="list__item-name"> Телефон </dt>
            <dd class="list__item-value"> {{ delivery.phone }} </dd>
            
            <!-- Address -->
            <template v-if="delivery.slug === DeliveryEnum.COURIER">
                <dt class="list__item-name"> Адрес </dt>
                <dd class="list__item-value"> {{ delivery.address.formatted }} </dd>
            </template>

            <!-- Payment -->
            <dt class="list__item-name"> Оплата </dt>
            <dd class="list__item-value"> 
                {{ payment.label }}
            </dd>

            <!-- Persons quantity -->
            <dt class="list__item-name"> Кол-во персон </dt>
            <dd class="list__item-value"> {{ persons_quantity }} </dd>

            <!-- Comment -->
            <template v-if="delivery.comment.length > 0">
                <dt class="list__item-name"> Комментарий </dt>
                <dd class="list__item-value"> {{ delivery.comment }} </dd>
            </template>
        </dl>

        <dl class="ordering-confirmation-products list">
            <!-- products -->
            <template 
                v-for="item in cart_product_items" 
                :key="item.product.id"
                >
                <dt class="list__item-name"> 
                    {{ item.product.name }} 
                    <span class="ordering-confirmation-products__quantity"> (x{{ item.quantity }}) </span>
                </dt>
                <dd class="list__item-value"> 
                    {{ item.total.formatted }} 
                </dd>
            </template>

            <!-- sum -->
            <dt class="list__item-name list__item-name_extra_margin"> Сумма </dt>
            <dd class="list__item-value list__item-value_extra_margin"> {{ sum.formatted }} </dd>

            <!-- products discount -->
            <template v-if="products_discount.value > 0">
                <dt class="list__item-name"> Скидка </dt>
                <dd class="list__item-value"> -{{ products_discount.formatted }} </dd>
            </template>

            <!-- coupon discount -->
            <template v-if="coupon">
                <dt class="list__item-name"> Промокод {{ coupon.value }} </dt>
                <dd class="list__item-value"> -{{ coupon.discount.formatted }} </dd>
            </template>

            <!-- total -->
            <dt class="list__item-name list__item-name_big"> К оплате </dt>
            <dd class="list__item-value list__item-value_big"> {{ total.formatted }} </dd>
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
                @click="submit"
                >
                <template v-if="payment.slug === PaymentEnum.ONLINE">
                    Оплатить
                </template>
                <template v-else> 
                    Заказать
                </template>
            </button>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { computed } from "vue";

import _store from "../../../../store";

import { ModuleTypes, namespace } from "../../../../store";
import * as OrderingModule from '../../../../store/modules/ordering'; 
import * as CartModule from '../../../../store/modules/cart'; 

import DeliveryEnum from "../../../../../enums/Delivery";
import PaymentEnum from "../../../../../enums/Payment";

export default defineComponent({
    beforeRouteEnter(to, from, next) {
        if ( _store.getters[ namespace(ModuleTypes.ORDERING, OrderingModule.GTypes.IS_VALID) ] ) next();
        else next({ name: 'ordering-cart' });
    },
    
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

        const delivery = computed(
            () => store.getters[ namespace(ModuleTypes.ORDERING, OrderingModule.GTypes.DELIVERY) ]
        );
        const payment = computed(
            () => store.getters[ namespace(ModuleTypes.ORDERING, OrderingModule.GTypes.PAYMENT) ]
        );

        const submit_order = () => store.dispatch(
            namespace(ModuleTypes.ORDERING, OrderingModule.ATypes.SUBMIT)
        );

        return {
            update_title,

            cart_product_items,
            persons_quantity,

            sum,
            total,
            products_discount,

            coupon,

            delivery,
            payment,

            submit_order,
        }
    },
    
    computed: {
        DeliveryEnum: () => DeliveryEnum,
        PaymentEnum: () => PaymentEnum,
    },

    methods: {
        async submit() {
            const { redirect_url, external } = await this.submit_order();
            
            if (external) document.location.href = redirect_url;
            else this.$router.push({ path: redirect_url });
        }
    },

    created() {
        const title : any = this.$route.meta.title;
        
        if ( title ) document.title = 'Papakado — ' + title;
        else document.title = 'Papakado';
    
        // 

        this.update_title('Подтверждение заказа');
    },
})
</script>
