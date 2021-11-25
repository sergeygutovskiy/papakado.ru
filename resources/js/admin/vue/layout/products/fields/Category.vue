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

<script>
import { mapGetters } from 'vuex';

export default {
    props: [
        'category_id'
    ],
    
    data() {
        return {
            category: this.category_id
        }
    },

    computed: {
        ...mapGetters({
            categories: 'category/items'
        })
    },

    watch: {
        categories: function() { if (!this.category) this.category = this.categories[0].id; },
        category: function() { this.$emit('value-changed', this.category); }
    }
}
</script>