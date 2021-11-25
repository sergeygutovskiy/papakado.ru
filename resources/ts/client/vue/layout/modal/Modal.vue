<template>
    <div>
        <transition name="product-modal-animation">
            <div v-if="is_modal_open && product" class="product-modal-wrapper">
                <div class="product-modal container">
                    <div class="product-modal__nav">
                        <button class="product-modal__close" @click="close_modal"></button>
                    </div>
                    <div class="product-modal__content">
                        <div class="product-modal__header">
                            <div v-if="product.meta.spicy" class="product-modal__meta-spicy">
                                <img 
                                    src="/images/icons/spicy.svg" 
                                    v-for="i in product.meta.spicy"
                                    :key="i"
                                    >
                                <span> Осторожно, острое! </span>
                            </div>
                            <div>
                                <span class="product-modal__name"> {{ product.name }} </span>
                                <span class="product-modal__weight"> {{ product.weight }} </span>
                            </div>
                        </div>
                        
                        <p class="product-modal__description">
                            {{ product.description }}
                        </p>
                        
                        <dl class="product-modal__meta-nutritional" v-if="product.meta.nutritional_value">
                            <dt> ккал </dt>
                            <dd> {{ product.meta.nutritional_value.calories }} </dd>
                            <dt> белки </dt>
                            <dd> {{ product.meta.nutritional_value.carbohydrates }} </dd>
                            <dt> жиры </dt>
                            <dd> {{ product.meta.nutritional_value.fats }} </dd>
                            <dt> углеводы </dt>
                            <dd> {{ product.meta.nutritional_value.proteins }} </dd>
                        </dl>

                        <div class="product-modal__footer">
                            <span class="product-modal__price"> 
                                {{ product.real_price.formatted }} 
                            </span>
                            <span v-if="product.is_has_discount" class="product-modal__old-price"> 
                                {{ product.price.formatted }} 
                            </span>
                            <quantity-buttons 
                                v-if="is_product_in_cart(product)" 
                                :product="product" 
                                class="product-modal__quantity-buttons"
                                />
                        </div>
                        <button
                            class="product-modal__action button" 
                            :disabled="is_product_in_cart(product)"
                            @click="add_product_to_cart(product)"
                            >
                            <template v-if="!is_product_in_cart(product)">
                                Добавить в корзину
                            </template>
                            <template v-else>
                                Добавлено в корзину
                            </template>
                        </button>
                        <div class="product-modal__image-wrapper">
                            <img class="product-modal__image" :src="product.image_path">
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { ModuleTypes, namespace } from '../../../store';
import * as ModalModule from '../../../store/modules/modal';
import * as CartModule from '../../../store/modules/cart';

import Product from '../../../classes/Product';

import QuantityButtons from '../../components/product/QuantityButtons.vue';

export default defineComponent({
    setup() {
        const store = useStore();

        const is_modal_open : ModalModule.Getter<ModalModule.GTypes.IS_OPEN> = computed(
            () => store.getters[ namespace(ModuleTypes.MODAL, ModalModule.GTypes.IS_OPEN) ]
        );
        const product : ModalModule.Getter<ModalModule.GTypes.PRODUCT> = computed(
            () => store.getters[ namespace(ModuleTypes.MODAL, ModalModule.GTypes.PRODUCT) ]
        );
        const close_modal = () => store.dispatch( namespace(ModuleTypes.MODAL, ModalModule.ATypes.CLOSE) );


        const is_product_in_cart : CartModule.Getter<CartModule.GTypes.IS_CONTAINS_PRODUCT_ITEM> = computed( 
            () => store.getters[ namespace(ModuleTypes.CART, CartModule.GTypes.IS_CONTAINS_PRODUCT_ITEM) ]
        );
        const add_product_to_cart = (product: Product) => store.dispatch(
            namespace(ModuleTypes.CART, CartModule.ATypes.ADD_PRODUCT_ITEM), product
        );

        return {
            is_modal_open,
            product,
            close_modal,

            is_product_in_cart,
            add_product_to_cart,
        }
    },

    components: {
        QuantityButtons
    },

    // computed: {
    //     ...mapGetters({
    //         is_open: 'modal/is_open',
    //         product: 'modal/product',
    //         is_contains_product: 'cart/is_contains_product_item'
    //     })
    // },

    // methods: {
    //     ...mapActions({
    //         close: 'modal/close',
    //         add_product: 'cart/add_product_item'
    //     })
    // },

    // watch: {
    //     is_open: value => document.body.classList.toggle('locked')
    // }
});
</script>