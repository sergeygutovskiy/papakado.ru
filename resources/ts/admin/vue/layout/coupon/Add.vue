<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="mb-0"> Добавить купон </h1>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <form class="card-body" @submit.prevent="on_submit">

                    <div class="mt-3">
                        <label class="form-label"> Название </label>
                        <input type="text" class="form-control" required v-model="name">
                    </div>

                    <div class="mt-3">
                        <label class="form-label"> Код </label>
                        <input type="text" class="form-control" required v-model="value">
                    </div>

                    <div class="mt-3">
                        <label class="form-label"> Мин. стоиомсть заказа </label>
                        <div class="input-group">
                            <input 
                                type="number" 
                                class="form-control" 
                                min="1" 
                                required v-model="min_order_cost"
                                :disabled="min_order_cost == null"
                                >
                            <select class="form-control" required v-model="is_min_order_cost">
                                <option :value="true">Есть</option>
                                <option :value="false">Нет</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-3">
                        <label class="form-label"> Скидка </label>
                        <div class="input-group">
                            <input type="number" class="form-control" min="0" required v-model="discount">
                            <select class="form-control" required v-model="is_percentage">
                                <option :value="false">₽</option>
                                <option :value="true">%</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-3">
                        <label class="form-label"> Активен? </label>
                        <select class="form-control" v-model="is_active">
                            <option :value="true">Да</option>
                            <option :value="false">Нет</option>
                        </select>
                    </div>

                    <button class="btn btn-success mt-5"> 
                        Добавить купон
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import { ModuleTypes, namespace } from "../../../store";
import * as CouponrModule from '../../../store/modules/coupon';
import * as AppModule from '../../../store/modules/app';

import Toast from "../../../classes/Toast";
import { useStore } from "vuex";

export default defineComponent({
    setup() {
        const store = useStore();

        const add = (data: FormData) => store.dispatch(
            namespace(ModuleTypes.COUPON, CouponrModule.ATypes.STORE_ITEM), data
        );  

        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            add,
            add_toast,
        }
    },

    data() {
        return {
            name: '',
            value: '',
            
            min_order_cost: null,
            is_min_order_cost: false,

            discount: 0,
            is_percentage: false,

            is_active: true
        } as {
            name: string,
            value: string,

            min_order_cost: number | null,
            is_min_order_cost: boolean,

            discount: number,
            is_percentage: boolean,

            is_active: boolean
        }
    },

    methods: {
        async on_submit () {            
            const form_data = new FormData();

            form_data.append('name', this.name);
            form_data.append('value', this.value);
            form_data.append('discount', this.discount.toString() );
            form_data.append('is_percentage', String(this.is_percentage) );
            form_data.append('min_order_cost', String(this.min_order_cost) );
            form_data.append('is_active', String(this.is_active) );

            await this.add(form_data);
            
            this.add_toast(new Toast({ 
                text: `Купон <b>${this.name}</b> добавлен`,
                style: 'bg-success' 
            }));
            
            this.$router.push({ name: 'coupons-index' });
        }
    },

    watch: {
        is_min_order_cost: function(val) {
            if (val) this.min_order_cost = 0;
            else this.min_order_cost = null;
        }
    },
});
</script>
