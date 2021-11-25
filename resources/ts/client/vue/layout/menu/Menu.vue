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

<script lang="ts">
import { Navigation, Pagination } from 'swiper';

import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';

import { namespace, ModuleTypes } from '../../../store';
import * as AppModule from '../../../store/modules/app';

import SkeletonImage from '../../components/skeleton-image/SkeletonImage.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    setup() {
        const store = useStore();

        const banners = computed( () => store.getters[ namespace(ModuleTypes.APP, AppModule.GTypes.BANNERS) ] );
        const request_banners = () => store.dispatch( namespace(ModuleTypes.APP, AppModule.ATypes.REQUEST_BANNERS) );
    
        return {
            banners,
            request_banners,

            modules: [
                Navigation, 
                Pagination
            ],
        }
    },

    components: {
        SkeletonImage,
        Swiper,
        SwiperSlide
    },

    created() {
        this.request_banners();
    },
});
</script>