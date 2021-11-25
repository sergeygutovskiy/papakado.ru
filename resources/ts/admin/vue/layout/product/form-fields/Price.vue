<template>
    <div>
        <div class="mt-3">
            <label class="form-label"> Стоимоcть </label>
            <input 
                type="number" 
                min="0" 
                class="form-control" 
                v-model="price_value"
                required
                >
        </div>
        <div class="mt-3">
            <label class="form-label"> Стоимоcть по скидке </label>
            <div class="input-group">
                <input 
                    type="number" 
                    class="form-control" 
                    v-model="discount_value"
                    min="0"
                    :max="price_value"
                    :disabled="!is_discount"
                    :required="is_discount"
                    >
                <select class="form-control" v-model="is_discount">
                    <option :value="false">Нет</option>
                    <option :value="true">Есть</option>
                </select>
            </div>
        </div>
    </div>    
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
        }
    },

    data() {
        return {
            price_value: this.price,

            is_discount: !!this.discount,
            discount_value: this.discount ? this.discount : null
        } as {
            price_value: number,

            is_discount: boolean,
            discount_value: number | null,
        }
    },

    watch: {
        is_discount (value) { this.discount_value = value ? this.price_value : null; },

        price_value: function() { this.emit_changes(); },
        discount_value: function() { this.emit_changes(); }
    },

    methods: {
        emit_changes() { 
            this.$emit('price-changed', {
                price: this.price_value,
                discount: this.discount_value,
            }); 
        }
    },
});
</script>