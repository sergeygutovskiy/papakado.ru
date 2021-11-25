<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mt-5">
            <h2 class="mb-0"> Острота </h2>
            <button 
                class="btn"
                :class="{ 'btn-danger': is_have_spicy, 'btn-success': !is_have_spicy }"
                type="button"
                @click="toggle_spicy"
                > 
                <template v-if="is_have_spicy"> Убрать </template>
                <template v-else> Добавить </template>
            </button>
        </div>

        <div class="mt-3" v-if="is_have_spicy">
            <select class="form-control" v-model="spicy_value">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'spicy'
    ],
    
    data() {
        return {
            spicy_value: this.spicy,
            is_have_spicy: this.spicy !== null
        }
    },

    watch: {
        is_have_spicy: function(val) { this.spicy_value = val ? 1 : null; },
        spicy_value: function() { this.$emit('value-changed', this.spicy_value); }
    },

    methods: {
        toggle_spicy() { this.is_have_spicy = !this.is_have_spicy; }
    }
}
</script>