<template>
    <section>
        <keep-alive>
            <div class="menu-banners" v-show="banners.length">
                <swiper
                    class="menu-banners-slider"
                    :slides-per-view="'auto'"
                    :breakpoints="{
                        601: {
                            slidesPerView: 2
                        },
                        769: {
                            slidesPerView: 3
                        }
                    }"
                    :modules="modules"
                    :navigation="{
                        nextEl: '.menu-banners__btn_next',
                        prevEl: '.menu-banners__btn_prev'
                    }"
                    >
                    <swiper-slide 
                        class="menu-banner"
                        v-for="banner in banners"
                        :key="banner.id"
                        >
                        <skeleton-image 
                            class="menu-banner__image-wrapper"
                            :image_path="banner.image_path" 
                            />
                    </swiper-slide>
                </swiper>
                <button class="menu-banners__btn menu-banners__btn_prev"></button>
                <button class="menu-banners__btn menu-banners__btn_next"></button>
            </div>
        </keep-alive>

        <router-view />
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
import { mapActions, mapGetters } from 'vuex';

import SkeletonImage from '@-c-vue/components/skeleton-image/SkeletonImage';

export default {
    components: {
        Swiper,
        SwiperSlide,
        SkeletonImage
    },

    setup() {
        return {
            modules: [
                Navigation, 
                Pagination
            ]
        }
    },

    computed: {
        ...mapGetters({
            banners: 'app/banners'
        })
    },

    methods: {
        ...mapActions({
            get_banners: 'app/get_banners'
        })
    },

    created() {
        if ( !this.banners.length ) this.get_banners();
    }
}
</script>