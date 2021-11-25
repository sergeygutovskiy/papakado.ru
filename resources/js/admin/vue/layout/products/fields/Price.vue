<template>
    <div>
        <div class="mt-3">
            <label class="form-label"> Стоимоcть </label>
            <input 
                type="number" 
                min="0" 
                class="form-control" 
                v-model="price"
                required
                >
        </div>
        <div class="mt-3">
            <label class="form-label"> Стоимоcть по скидке </label>
            <div class="input-group">
                <input 
                    type="number" 
                    class="form-control" 
                    v-model="price_discount"
                    min="0"
                    :max="price"
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

<script>
export default {
    props: [
        'price',
        'discount'
    ],

    data() {
        return {
            is_discount: !!this.discount,
            price_discount: this.discount
        }
    },

    watch: {
        is_discount (value) { this.price_discount = value ? this.price : null; },

        price: function() { this.emit_changes(); },
        price_discount: function() { this.emit_changes(); }
    },

    methods: {
        emit_changes() { 
            this.$emit('value-changed', {
                price: this.price,
                discount: this.price_discount
            }); 
        }
    }
}
</script>