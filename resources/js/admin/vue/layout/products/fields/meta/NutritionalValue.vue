<template>
    <div>
        <div class="d-flex align-items-center justify-content-between mt-5">
            <h2 class="mb-0"> Пищевая ценность </h2>
            <button 
                class="btn"
                :class="{ 
                    'btn-danger': is_have_nut_value, 
                    'btn-success': !is_have_nut_value 
                }"
                type="button"
                @click="toggle_nut_value"
                > 
                <template v-if="is_have_nut_value"> Убрать </template>
                <template v-else> Добавить </template>
            </button>
        </div>

        <template v-if="is_have_nut_value">
            <div class="mt-3">
                <label class="form-label"> ккал </label>
                <input type="number" min="0" class="form-control" v-model="nut_value.calories">
            </div>
            <div class="mt-3">
                <label class="form-label"> белки </label>
                <input type="number" min="0" class="form-control" v-model="nut_value.proteins">
            </div>
            <div class="mt-3">
                <label class="form-label"> жиры </label>
                <input type="number" min="0" class="form-control" v-model="nut_value.fats">
            </div>
            <div class="mt-3">
                <label class="form-label"> углеводы </label>
                <input type="number" min="0" class="form-control" v-model="nut_value.carbohydrates">
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: [
        'nut'
    ],

    data() {
        return {
            nut_value_dft: {
                calories: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0
            },

            is_have_nut_value: this.nut !== null,
            nut_value: null,
        }
    },

    created() {
        if ( this.is_have_nut_value ) this.nut_value = this.nut;
        else this.nut_value = this.nut_value_dft;
    },

    watch: {
        is_have_nut_value: function(val) {
            if (val) this.$emit('value-changed', this.nut_value);
            else this.$emit('value-changed', null);
        },

        nut_value: function() {
            if (this.is_have_nut_value) this.$emit('value-changed', this.nut_value);
            else this.$emit('value-changed', null);
        }
    },

    methods: {
        toggle_nut_value() { this.is_have_nut_value = !this.is_have_nut_value; }
    }
}
</script>