<template>
    <div class="mt-3">
        <label class="form-label"> Вес </label>
        <div class="input-group">
            <input 
                type="number" 
                class="form-control" 
                v-model="weight_value"
                required
                >
            <select class="form-control" v-model="weight_text">
                <option value="г">г</option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        weight: {
            type: String,
            required: true,
        } 
    },
    
    data() {
        return {
            weight_value: this.weight.split(' ')[0],
            weight_text: this.weight.split(' ')[1]
        } as {
            weight_value: string,
            weight_text: string,
        }

    },

    watch: {
        weight_value: function() { this.emit_changes(); },
        weight_text: function() { this.emit_changes(); }
    },

    methods: {
        emit_changes() { this.$emit('weight-changed', this.weight_value + ' ' + this.weight_text); }
    },
});
</script>