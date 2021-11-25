<template>
    <section class="ordering">
        <header class="ordering-header main-section__header">
            <h1 class="main-section__title ordering-header__title">
                {{ title }}
            </h1>
            <div class="ordering-nav">
                <div class="ordering-nav__item" :class="$route.name == 'ordering-cart' ? 'active' : ''">
                    <div>1</div>
                    <span> Корзина </span>
                </div>
                <div class="ordering-nav__item" :class="$route.name == 'ordering-checkout' ? 'active' : ''">
                    <div>2</div>
                    <span> Оформление заказа </span>
                </div>
                <div class="ordering-nav__item" :class="$route.name == 'ordering-confirmation' ? 'active' : ''">
                    <div>3</div>
                    <span> Подтверждение </span>
                </div>
            </div>
        </header>
        <router-view :key="$route.path"></router-view>
    </section>    
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core"
import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as OrderingModule from '../../../store/modules/ordering';

export default defineComponent({
    setup() {
        const store = useStore();

        const title : OrderingModule.Getter<OrderingModule.GTypes.TITLE> = computed(
            () => store.getters[ namespace(ModuleTypes.ORDERING, OrderingModule.GTypes.TITLE) ]
        );

        return {
            title,
        }
    },
});
</script>