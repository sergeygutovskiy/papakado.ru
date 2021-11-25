<template>
    <div>
        <transition name="product-modal-animation">
            <div v-if="is_open && product" class="product-modal-wrapper">
                <div class="product-modal container">
                    <div class="product-modal__nav">
                        <button class="product-modal__close" @click="close"></button>
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
                                {{ product.get_real_price.get_formatted }} 
                            </span>
                            <span v-if="product.have_discount" class="product-modal__old-price"> 
                                {{ product.price.get_formatted }} 
                            </span>
                            <quantity-buttons 
                                v-if="is_contains_product(product)" 
                                :product="product" 
                                class="product-modal__quantity-buttons"
                                />
                        </div>
                        <button
                            class="product-modal__action button" 
                            :disabled="is_contains_product(product)"
                            @click="add_product(product)"
                            >
                            <template v-if="!is_contains_product(product)">
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

<script>
import { mapActions, mapGetters } from 'vuex'
import QuantityButtons from '@-c-vue/components/product/QuantityButtons';

export default {
    components: {
        QuantityButtons
    },

    computed: {
        ...mapGetters({
            is_open: 'modal/is_open',
            product: 'modal/product',
            is_contains_product: 'cart/is_contains_product_item'
        })
    },

    methods: {
        ...mapActions({
            close: 'modal/close',
            add_product: 'cart/add_product_item'
        })
    },

    watch: {
        is_open: value => document.body.classList.toggle('locked')
    }
}
</script>