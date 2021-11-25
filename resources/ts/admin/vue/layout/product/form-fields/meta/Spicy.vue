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
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        spicy: {
            type: Number
        }
    },
    
    data() {
        return {
            spicy_value: this.spicy ? this.spicy : null,
            is_have_spicy: this.spicy !== undefined,
        } as {
            spicy_value: number | null,
            is_have_spicy: boolean,
        }
    },

    watch: {
        is_have_spicy: function(val: boolean) { this.spicy_value = val ? 1 : null; },
        spicy_value: function() { this.$emit('meta-spicy-changed', this.spicy_value); }
    },

    methods: {
        toggle_spicy() { this.is_have_spicy = !this.is_have_spicy; }
    },
});
</script>