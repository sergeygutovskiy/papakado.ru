<template>
    <div class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="mb-0"> Добавить баннер </h1>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <form class="card-body" @submit.prevent="on_submit">
                    <image-form-field v-on:image-changed="image_changed" />

                    <div class="mt-3">
                        <label class="form-label"> Порядок </label>
                        <input type="number" class="form-control" min="1" v-model="order" required>
                    </div>

                    <button class="btn btn-success mt-5"> 
                        Добавить баннер
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../store";

import * as BannerModule from '../../../store/modules/banner';
import * as AppModule from '../../../store/modules/app';

import ImageFormField from "../../components/form-fields/Image.vue";
import Toast from "../../../classes/Toast";

export default defineComponent({
    setup() {
        const store = useStore();

        const add = (data: FormData) => store.dispatch(
            namespace(ModuleTypes.BANNER, BannerModule.ATypes.STORE_ITEM), data
        );  

        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            add,
            add_toast,
        }
    },

    components: {
        ImageFormField
    },

    data() {
        return {
            image: null,
            order: 1,
        } as {
            image: File | null,
            order: number,
        }
    },

    methods: {
        image_changed(payload: File) { this.image = payload; },

        async on_submit () {            
            const form_data = new FormData();
            form_data.append('image', this.image as Blob);
            form_data.append('order', this.order.toString());

            console.log(this.order);

            await this.add(form_data);
            
            this.add_toast(new Toast({
                text: `Баннер добавлен`,
                style: 'bg-success' 
            }));

            this.$router.push({ name: 'banners-index' });
        },
    },
});
</script>