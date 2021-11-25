<template>
    <article class="card w-100">
        <img 
            :src="product.image_path"
            style="height: 200px; object-fit: cover;"
            >
        <div class="card-body">
            <h4 class="card-title mb-0">
                {{ product.name }}
            </h4>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Категория </div>
                    {{ product.category.name }}
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Стоимость </div>
                    {{ product.price.formatted }}
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Скидка </div>
                    <template v-if="product.is_has_discount">
                        {{ product.real_price.formatted }}
                    </template>
                    <template v-else> нет </template>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Кол-во продаж </div>
                    {{ product.sales }}
                </div>
            </li>
        </ul>
        <div class="card-footer d-flex">
            <router-link 
                :to="{ name: 'products-update', params: { id: product.id } }"
                class="btn btn-primary ms-auto"
                >
                Обновить
            </router-link>
            <button
                @click="on_delete_product(product.id)"
                class="btn btn-danger ms-2"
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
import * as ProductModule from '../../../store/modules/product'; 
import * as AppModule from '../../../store/modules/app';

import Product from "../../../classes/Product";
import Toast from "../../../classes/Toast";

export default defineComponent({
    props: {
        product: {
            type: Product,
            required: true,
        }
    },

    setup() {
        const store = useStore();

        const delete_product = (id: number) => store.dispatch(
            namespace(ModuleTypes.PRODUCT, ProductModule.ATypes.DELETE_ITEM), id
        );

        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            delete_product,
            add_toast,
        }
    },   
    
    methods: {
        async on_delete_product(id: number) {
            await this.delete_product(id);
        
            this.add_toast(new Toast({
                text: `Товар <b>${this.product.name}</b> удален`,
                style: 'bg-danger' 
            }));
        }
    },
});
</script>