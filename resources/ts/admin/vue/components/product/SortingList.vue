<template>
    <div class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex">
                    <select class="form-control me-3" v-model="sorting">
                        <option :value="sorting_enum.PRICE_MIN_TO_MAX"> Минимальная стоимость </option>
                        <option :value="sorting_enum.PRICE_MAX_TO_MIN"> Максимальная стоимость </option>
                        <option :value="sorting_enum.DISCOUNT_FIRST"> Сначала со скидкой </option>
                        <option :value="sorting_enum.DISCOUNT_LAST"> Сначала без скидки </option>
                        <option :value="sorting_enum.SALES_MIN_TO_MAX"> Меньше продаж </option>
                        <option :value="sorting_enum.SALES_MAX_TO_MIN"> Больше продаж </option>
                    </select>
                    <button class="btn btn-primary" @click="sort">
                        Сортировать
                    </button>
                </div>
            </div>
        </div>
        <div 
            class="col-4 d-flex align-items-stretch mb-4"
            v-for="product in sorted_products"
            :key="product.id"
            >
            <card :product="product" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Product from "../../../classes/Product";

import CardVue from "./Card.vue";

enum Sorting {
    PRICE_MIN_TO_MAX = 0,
    PRICE_MAX_TO_MIN = 1,
    DISCOUNT_FIRST = 3,
    DISCOUNT_LAST = 4,
    SALES_MIN_TO_MAX = 5,
    SALES_MAX_TO_MIN = 6,
}

export default defineComponent({
    props: {
        products: {
            type: Array as () => Product[],
            required: true,
        }
    },

    data() {
        return {
            sorted_products: this.products,
            sorting: Sorting.PRICE_MIN_TO_MAX,
        } as {
            sorted_products: Product[],
            sorting: Sorting,
        }
    },

    computed: {
        sorting_enum: () => Sorting,
    },

    components: {
        card: CardVue,
    },

    watch: {
        products: function(val) {
            this.sorted_products = val;
        },
    },

    methods: {
        sort() {
            switch (this.sorting) {
                case Sorting.PRICE_MIN_TO_MAX:
                    this.sorted_products.sort((p1, p2) => p1.real_price.value - p2.real_price.value);
                    break;
                case Sorting.PRICE_MAX_TO_MIN:
                    this.sorted_products.sort((p1, p2) => p2.real_price.value - p1.real_price.value);
                    break;
                case Sorting.DISCOUNT_FIRST:
                    this.sorted_products.sort((p1, p2) => {
                        if (p1.is_has_discount && p2.is_has_discount) return p2.real_price.value - p1.real_price.value;
                        if (p1.is_has_discount && !p2.is_has_discount) return -1;
                        if (!p1.is_has_discount && p2.is_has_discount) return 1;
                        return 0;
                    });
                    break;
                case Sorting.DISCOUNT_LAST:
                    this.sorted_products.sort((p1, p2) => {
                        if (p1.is_has_discount && p2.is_has_discount) return p1.real_price.value - p2.real_price.value;
                        if (p1.is_has_discount && !p2.is_has_discount) return 1;
                        if (!p1.is_has_discount && p2.is_has_discount) return -1;
                        return 0;
                    });
                    break;
                case Sorting.SALES_MIN_TO_MAX:
                    this.sorted_products.sort((p1, p2) => p1.sales - p2.sales);
                    break;
                case Sorting.SALES_MAX_TO_MIN:
                    this.sorted_products.sort((p1, p2) => p2.sales - p1.sales);
                    break;
            }
        },
    },
});
</script>