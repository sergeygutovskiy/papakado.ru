<template>
    <section class="ordering">
        <header class="ordering-header main-section__header">
            <h1 class="main-section__title ordering-header__title">
                {{ title }}
            </h1>
            <div class="ordering-nav">
                <div class="ordering-nav__item" :class="this.$route.name == 'ordering-cart' ? 'active' : ''">
                    <div>1</div>
                    <span> Корзина </span>
                </div>
                <div class="ordering-nav__item" :class="this.$route.name == 'ordering-checkout' ? 'active' : ''">
                    <div>2</div>
                    <span> Оформление заказа </span>
                </div>
                <div class="ordering-nav__item" :class="this.$route.name == 'ordering-confirmation' ? 'active' : ''">
                    <div>3</div>
                    <span> Подтверждение </span>
                </div>
            </div>
        </header>
        <router-view :key="$route.path"></router-view>
    </section>    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            title: 'ordering/title'
        })
    }
}
</script>