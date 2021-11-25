<template>
    <form class="ordering-checkout-delivery_pickup">
        <input type="text" class="input" v-model="name.value"     @input="send_fields" placeholder="Имя*">
        <input type="text" class="input" v-model="phone.value"    @input="send_fields" placeholder="Телефон*">
        <textarea rows="5" class="input" v-model="comment.value"  @input="send_fields" placeholder="Комментарий"></textarea>

        <p class="ordering-checkout-delivery_pickup__info-text">
            Адрес ресторана: Набережная Матисова канала, д.3 корпус 1 строение 1
        </p>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import FormField from "../../../../../classes/FormField";

export default defineComponent({
    data() {
        return {
            name: new FormField(true),
            phone: new FormField(true),
            comment: new FormField(),
        }
    },
    
    methods: {
        send_fields() { 
            this.$emit("form-input", {
                name: this.name,
                phone: this.phone,
                comment: this.comment,
            }); 
        }
    },

    created() {
        this.send_fields();
    },
});
</script>