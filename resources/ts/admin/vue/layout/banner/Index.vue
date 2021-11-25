<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Баннеры </h1>
                    <router-link
                        :to="{ name: 'banners-add' }"
                        class="btn btn-success"
                        >
                        Добавить
                    </router-link>
                </div>
            </div>
        </div>

        <div 
            class="col-4 d-flex align-items-stretch mb-4"
            v-for="banner in banners"
            :key="banner.id"
            >
            <card :banner="banner" />
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as BannerModule from '../../../store/modules/banner'; 

import Card from "../../components/banner/Card.vue";

export default defineComponent({
    setup() {
        const store = useStore();

        const banners: BannerModule.Getter<BannerModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.BANNER, BannerModule.GTypes.ITEMS) ]
        );

        const request_banners = () => store.dispatch(
            namespace(ModuleTypes.BANNER, BannerModule.ATypes.REQUEST_ITEMS)
        );

        return {
            banners,
            request_banners,
        }
    },

    components: {
        Card
    },

    created() {
        if ( !this.banners.length ) this.request_banners();
    },
});
</script>