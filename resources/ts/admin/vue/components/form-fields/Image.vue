<template>
    <div class="mt-3">
        <label class="form-label"> Картинка </label>
        <input 
            type="file" 
            class="form-control"
            @change="image_changed"
            required
            >
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    data() {
        return {
            image: null,
        } as {
            image: File | null,
        }
    },

    watch: {
        image: function() { this.$emit('image-changed', this.image); }
    },

    methods: {
        image_changed(event: Event) { 
            if ( event.target === null ) return;

            const target = event.target as HTMLInputElement;
            if ( target.files === null || target.files.length === 0 ) return;

            this.image = target.files[0];
        }
    }
});
</script>