<template>
    <div class="mt-3">
        <label class="form-label"> Имя </label>
        <input 
            type="text" 
            class="form-control" 
            v-model="value"
            required
            >
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        }
    },

    data() {
        return {
            value: this.name
        } as {
            value: string
        }
    },

    watch: {
        value: function() { this.$emit('name-changed', this.value); }
    }
});
</script>