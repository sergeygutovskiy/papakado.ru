<template>
    <div 
        class="skeleton-image-wrapper"
        :class="{ 'loaded': image_loaded }"
        >
        <img 
            :src="image_path" 
            class="skeleton-image" 
            @load="image_loaded = true"
            >
    </div>
</template>

<script>
export default {
    props: [
        'image_path'
    ],

    data() {
        return {
            image_loaded: false
        }
    }
}
</script>