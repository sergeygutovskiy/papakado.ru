<template>
    <div class="mt-5">
        <h2 class="mb-0"> Категория </h2>

        <div class="mt-3">
            <select 
                class="form-control" 
                v-model="category"
                required
                >
                <option 
                    v-for="category in categories"
                    :value="category.id"
                    :key="category.id"
                    >
                    {{ category.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ModuleTypes, namespace } from "../../../../store";

import * as CategoryModule from '../../../../store/modules/category';

export default defineComponent({
    props: {
        category_id: {
            type: Number,
        }
    },
    
    setup() {
        const store = useStore();

        const categories : CategoryModule.Getter<CategoryModule.GTypes.ITEMS> = computed(
            () => store.getters[ namespace(ModuleTypes.CATEGORY, CategoryModule.GTypes.ITEMS) ]
        );

        return {
            categories,
        }
    },

    data() {
        return {
            category: this.category_id ? this.category_id : null 
        } as {
            category: number | null
        }
    },

    watch: {
        categories: function() { if ( this.category === null ) this.category = this.categories[0].id; },
        category: function() { this.$emit('category-changed', this.category); }
    }
})
</script>
