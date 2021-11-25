<template>
    <div 
        class="navigation active" 
        :class="{ 
            'locked': is_modal_open,
            'menu-opened': is_menu_open    
        }">
        <div class="navigation__content container">
            <button class="navigation__menu-button" @click="toggle_menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <router-link class="navigation__logo" :to="{ name: 'home' }">
                <img src="/images/icons/logo-green.svg">
            </router-link>
            <nav class="navigation__links">
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'sushi' } }" 
                    class="navigation__link"> 
                    Суши
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'rolly' } }" 
                    class="navigation__link"> 
                    Роллы
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'sety' } }" 
                    class="navigation__link"> 
                    Сеты
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'sashimi' } }" 
                    class="navigation__link"> 
                    Сашими 
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'poke' } }" 
                    class="navigation__link"> 
                    Поке 
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'calaty' } }" 
                    class="navigation__link"> 
                    Cалаты 
                </router-link> 
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'supy' } }" 
                    class="navigation__link"> 
                    Супы 
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'goryachee' } }" 
                    class="navigation__link"> 
                    Горячее 
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'deserty' } }" 
                    class="navigation__link"> 
                    Десерты 
                </router-link>
                <router-link 
                    :to="{ name: 'menu-category', params: { slug: 'napitki' } }" 
                    class="navigation__link"> 
                    Напитки 
                </router-link>
            </nav>
            <cart />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Cart from './Cart';

export default {
    components: {
        Cart
    },

    data() {
        return {
            is_menu_open: false
        }
    },

    watch: {
        $route: function () { this.is_menu_open = false; }
    },

    computed: {
        ...mapGetters({
            is_modal_open: 'modal/is_open'
        })
    },

    methods: {
        toggle_menu() { this.is_menu_open = !this.is_menu_open; }
    }
}
</script>