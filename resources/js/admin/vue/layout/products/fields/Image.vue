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

<script>
export default {
    data() {
        return {
            image: null
        }
    },

    watch: {
        image: function() { this.$emit('value-changed', this.image); }
    },

    methods: {
        image_changed(event) { this.image = event.target.files[0]; }
    }
}
</script>