<template>
    <div class="mt-3">
        <label class="form-label"> Описание </label>
        <textarea 
            class="form-control" 
            v-model="value"
            required
            ></textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    props: {
        description: {
            type: String,
            required: true,
        }
    },

    data() {
        return {
            value: this.description
        } as {
            value: string
        }
    },

    watch: {
        value: function() { this.$emit('description-changed', this.value); }
    }
});
</script>