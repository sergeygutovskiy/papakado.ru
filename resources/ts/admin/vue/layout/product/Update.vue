<template>
    <div class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="mb-0"> Обновить товар </h1>
                </div>
            </div>
        </div>

        <div class="col-12 mb-4" v-if="loaded">
            <div class="card">
                <form class="card-body" @submit.prevent="on_image_submit">
                    <image-field v-on:image-changed="image_changed" />

                    <button class="btn btn-success mt-3"> 
                        Обновить
                    </button>
                </form>
            </div>
        </div>

        <div class="col-12" v-if="loaded">
            <div class="card">
                <form class="card-body" @submit.prevent="on_submit">

                    <name-field :name="name" v-on:name-changed="name_changed" />
                    <weight-field :weight="weight" v-on:weight-changed="weight_changed" />
                    <price-field :price="price" :discount="price_discount ? price_discount : undefined" v-on:price-changed="price_changed" />
                    <description-field :description="description" v-on:description-changed="description_changed" />
                    <category-field :category_id="category_id ? category_id : undefined" v-on:category-changed="category_id_changed" />

                    <meta-spicy-field :spicy="meta.spicy ? meta.spicy : undefined" v-on:meta-spicy-changed="spicy_meta_changed" />
                    <meta-nut-value :nut="meta.nutritional_value ? meta.nutritional_value : undefined" v-on:meta-nut-changed="nut_value_meta_changed"/>

                    <button class="btn btn-success mt-5"> 
                        Обновить товар
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
import * as ProductModule from '../../../store/modules/product';
import * as AppModule from '../../../store/modules/app';

import NameVue from "./form-fields/Name.vue";
import PriceVue from "./form-fields/Price.vue";
import DescriptionVue from "./form-fields/Description.vue";
import WeightVue from "./form-fields/Weight.vue";
import ImageVue from "../../components/form-fields/Image.vue";
import CategoryVue from "./form-fields/Category.vue";

import SpicyVue from "./form-fields/meta/Spicy.vue";
import NutritionalValueVue from "./form-fields/meta/NutritionalValue.vue";
import Product from "../../../classes/Product";
import Toast from "../../../classes/Toast";

type MetaSpicy = number | null
type MetaNut = {
    calories: number,
    proteins: number,
    fats: number,
    carbohydrates: number,
} | null

type Meta = {
    spicy: MetaSpicy,
    nutritional_value: MetaNut,
}

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        }
    },

    setup() {
        const store = useStore();

        const request_product = (id: string) => store.dispatch(
            namespace(ModuleTypes.PRODUCT, ProductModule.ATypes.REQUEST_ITEM), id
        );

        const update_product = ({id, data} : { id: string, data: FormData }) => store.dispatch(
            namespace(ModuleTypes.PRODUCT, ProductModule.ATypes.UPDATE_ITEM), { id, data }
        );

        const update_product_image = ({id, data} : { id: string, data: FormData }) => store.dispatch(
            namespace(ModuleTypes.PRODUCT, ProductModule.ATypes.UPDATE_ITEM_IMAGE), { id, data }
        );

        // 

        const add_toast = (toast: Toast) => store.dispatch(
            namespace(ModuleTypes.APP, AppModule.ATypes.STORE_TOAST), toast
        );

        return {
            request_product,
            update_product,
            update_product_image,

            add_toast,
        }
    },

    data() {
        return {
            name: '',
            image: null,
            description: '',
            weight: '0 г',
            price: 0,
            price_discount: null,
            category_id: null,
            
            meta: {
                spicy: null,
                nutritional_value: null
            },

            loaded: false,
        } as {
            name: string,
            image: File | null,
            description: string,
            weight: string,
            price: number,
            price_discount: number | null,
            category_id: number | null,
            meta: Meta,

            loaded: boolean,
        }
    },

    components: {
        NameField: NameVue,
        PriceField: PriceVue,
        DescriptionField: DescriptionVue,
        WeightField: WeightVue,
        ImageField: ImageVue,
        CategoryField: CategoryVue,

        MetaSpicyField: SpicyVue,
        MetaNutValue: NutritionalValueVue,
    },

    methods: {
        name_changed(payload: string) { this.name = payload; },
        image_changed(payload: File) { this.image = payload; },
        weight_changed(payload: string) { this.weight = payload; },
        price_changed({ price, discount } : { price: number, discount: number | null }) { 
            this.price = price;
            this.price_discount = discount;
        },
        description_changed(payload: string) { this.description = payload; },
        category_id_changed(payload: number) { this.category_id = payload; },
        
        spicy_meta_changed(payload: MetaSpicy) { this.meta.spicy = payload; },
        nut_value_meta_changed(payload: MetaNut) { this.meta.nutritional_value = payload; },

        async on_submit () {
            const form_data = new FormData();
            form_data.append('name', this.name);
            form_data.append('weight', this.weight);
            form_data.append('price', this.price.toString());
            form_data.append('price_discount', this.price_discount ? this.price_discount.toString() : 'null');
            form_data.append('description', this.description);
            form_data.append('meta', JSON.stringify(this.meta));
            form_data.append('category_id', this.category_id ? this.category_id.toString() : 'null');

            await this.update_product({ id: this.id, data: form_data });
            
            this.add_toast(new Toast({
                text: `Товар <b>${this.name}</b> обновлен`,
                style: 'bg-success',
            }));
            this.$router.push({ name: 'products-index' });
        },

        async on_image_submit() {
            const form_data = new FormData();
            form_data.append('image', this.image as Blob);

            await this.update_product_image({ id: this.id, data: form_data });

            this.add_toast(new Toast({
                text: `Картинка товара <b>${this.name}</b> обновлена`,
                style: 'bg-success',
            }));
            this.$router.push({ name: 'products-index' });
        }
    },

    async created() {
        const product : Product = await this.request_product(this.id);
        this.loaded = true;
    
        this.name = product.name;
        this.description = product.description;
        this.category_id = product.category.id;
        this.weight = product.weight;
        this.meta = product.meta;

        this.price = product.price.value;
        this.price_discount = product.price_discount ? product.price_discount.value : null;  
    },
});
</script>