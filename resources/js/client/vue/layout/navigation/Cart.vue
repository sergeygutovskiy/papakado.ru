<template>
    <router-link :to="{ name: 'ordering-cart' }" class="navigation-cart">
        <span class="navigation-cart__icon"></span>
        <span class="navigation-cart__total"> {{ total.get_formatted }} </span>
        <span class="navigation-cart__amount"> {{ quantity }} </span>
    </router-link>            
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            total: 'cart/total_with_discount_and_coupon',
            quantity: 'cart/quantity_formatted'
        })
    }
}
</script>