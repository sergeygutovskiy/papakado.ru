<template>
    <div class="mt-3">
        <label class="form-label"> Имя </label>
        <input 
            type="text" 
            class="form-control" 
            v-model="name"
            required
            >
    </div>
</template>

<script>
export default {
    props: [
        'name'
    ],

    watch: {
        name: function() { this.$emit('value-changed', this.name); }
    }
}
</script>