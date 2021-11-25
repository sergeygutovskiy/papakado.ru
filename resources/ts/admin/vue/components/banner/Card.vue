<template>
    <article class="card w-100">
        <img 
            :src="banner.image_path" 
            style="height: 200px; object-fit: cover;"
            >
        <div class="card-body">
            <div>
                <strong> Порядок: </strong> {{ banner.order }}
            </div>
        </div>
        <div class="card-footer d-flex">
            <button
                @click="on_delete_banner(banner.id)"
                class="btn btn-danger ms-auto"
                >
                Удалить
            </button>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

import { ModuleTypes, namespace } from "../../../store";
import * as BannerModule from '../../../store/modules/banner'; 
import * as AppModule from '../../../store/modules/app';

import Banner from "../../../classes/Banner";
import Toast from "../../../classes/Toast";

export default defineComponent({
    props: {
        banner: {
            type: Banner,
            required: true,
        }
    },

    setup() {
        const store = useStore();

        const delete_banner = (id: number) => store.dispatch(
            namespace(ModuleTypes.BANNER, BannerModule.ATypes.DELETE_ITEM), id
        );

        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            delete_banner,
            add_toast,
        }
    },
    
    methods: {
        async on_delete_banner(id: number) {
            await this.delete_banner(id);
        
            this.add_toast(new Toast({
                text: `Баннер удален`,
                style: 'bg-danger' 
            }));
        }
    },
});
</script>