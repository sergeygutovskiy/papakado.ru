<template>
    <div 
        class="navigation active" 
        :class="{ 
            'locked': is_modal_open,
            'menu-opened': is_menu_open    
        }">
        <div class="navigation__content container">
            <button class="navigation__menu-button" @click="is_menu_open = !is_menu_open">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <router-link class="navigation__logo" :to="{ name: 'home' }">
                <img src="/images/icons/logo-green.svg">
            </router-link>
            <nav class="navigation__links">
                <router-link 
                    v-for="(link, index) of links"
                    :key="index"
                    :to="{ name: 'menu-category', params: { slug: link.slug } }" 
                    class="navigation__link"> 
                    {{ link.label }}
                </router-link>
            </nav>
            <cart />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { ModuleTypes, namespace } from '../../../store';
import * as ModalModule from '../../../store/modules/modal';

import Cart from './Cart.vue';

export default defineComponent({
    setup() {
        const store = useStore();

        const is_modal_open : ModalModule.Getter<ModalModule.GTypes.IS_OPEN> = computed(
            () => store.getters[ namespace(ModuleTypes.MODAL, ModalModule.GTypes.IS_OPEN) ]
        );

        return {
            is_modal_open
        }
    },

    components: {
        Cart
    },

    data() {
        return {
            links: [
                {
                    slug: 'sushi',
                    label: 'Суши',
                },
                {
                    slug: 'rolly',
                    label: 'Роллы',
                },
                {
                    slug: 'sety',
                    label: 'Сеты',
                },
                {
                    slug: 'sashimi',
                    label: 'Сашими',
                },
                {
                    slug: 'poke',
                    label: 'Поке',
                },
                {
                    slug: 'calaty',
                    label: 'Cалаты',
                },
                {
                    slug: 'supy',
                    label: 'Супы',
                },
                {
                    slug: 'goryachee',
                    label: 'Горячее',
                },
                {
                    slug: 'deserty',
                    label: 'Десерты',
                },
                {
                    slug: 'napitki',
                    label: 'Напитки',
                },
            ],

            is_menu_open: false,
        }
    },

    watch: {
        $route: function () { this.is_menu_open = false; }
    },
});
</script>