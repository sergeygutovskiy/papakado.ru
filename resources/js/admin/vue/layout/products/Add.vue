<template>
    <div class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="mb-0"> Добавить товар </h1>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <form class="card-body" @submit.prevent="on_submit">

                    <name-field :name="name" v-on:value-changed="name_changed" />
                    <image-field v-on:value-changed="image_changed" />
                    <weight-field :weight="weight" v-on:value-changed="weight_changed" />
                    <price-field :price="price" :discount="price_discount" v-on:value-changed="price_changed" />
                    <description-field :description="description" v-on:value-changed="description_changed" />
                    <category-field :category_id="category_id" v-on:value-changed="category_id_changed" />      

                    <spicy-meta-field 
                        :spicy="meta.spicy" 
                        v-on:value-changed="spicy_meta_changed"
                        />
                    <nutritional-value-meta-field 
                        :nut="meta.nutritional_value" 
                        v-on:value-changed="nut_value_meta_changed"
                        />

                    <button class="btn btn-success mt-5"> 
                        Добавить товар
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import NameField from './fields/Name';
import ImageField from './fields/Image';
import WeightField from './fields/Weight';
import PriceField from './fields/Price';
import DescriptionField from './fields/Description';
import CategoryField from './fields/Category';

import SpicyMetaField from './fields/meta/Spicy';
import NutritionalValueMetaField from './fields/meta/NutritionalValue';

export default {
    components: {
        ImageField,
        NameField,
        WeightField,
        PriceField,
        DescriptionField,
        CategoryField,
        SpicyMetaField,
        NutritionalValueMetaField
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
            }
        }
    },

    methods: {        
        ...mapActions({
            add: 'product/add_item',
            add_toast: 'app/add_toast'
        }),
        
        name_changed(payload) { this.name = payload; },
        image_changed(payload) { this.image = payload; },
        weight_changed(payload) { this.weight = payload; },
        price_changed({ price, discount }) { 
            this.price = price;
            this.price_discount = discount;
        },
        description_changed(payload) { this.description = payload; },
        category_id_changed(payload) { this.category_id = payload; },
        
        spicy_meta_changed(payload) { this.meta.spicy = payload; },
        nut_value_meta_changed(payload) { this.meta.nutritional_value = payload; },

        async on_submit () {            
            const form_data = new FormData();
            form_data.append('name', this.name);
            form_data.append('image', this.image);
            form_data.append('weight', this.weight);
            form_data.append('price', this.price);
            form_data.append('price_discount', this.price_discount);
            form_data.append('description', this.description);
            form_data.append('meta', JSON.stringify(this.meta));
            form_data.append('category_id', this.category_id);

            await this.add(form_data);

            this.add_toast({ 
                text: `Товар <b>${this.name}</b> добавлен`,
                style: 'bg-success' 
            });

            this.$router.push({ name: 'products-index' });
        }
    }
}
</script>