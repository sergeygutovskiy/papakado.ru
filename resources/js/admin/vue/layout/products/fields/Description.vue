<template>
    <div class="mt-3">
        <label class="form-label"> Описание </label>
        <textarea 
            class="form-control" 
            v-model="description"
            required
            ></textarea>
    </div>
</template>

<script>
export default {
    props: [
        'description'
    ],

    watch: {
        description: function() { this.$emit('value-changed', this.description); }
    }
}
</script>