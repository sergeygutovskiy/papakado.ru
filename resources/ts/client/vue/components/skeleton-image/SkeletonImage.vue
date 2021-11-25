<template>
    <div class="skeleton-image-wrapper" :class="{ 'loaded': image_loaded }">
        <img class="skeleton-image" :src="image_path" @load="image_loaded = true">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    props: [
        'image_path'
    ],

    data() {
        return {
            image_loaded: false
        }
    }
});
</script>