<template>
    <form class="ordering-checkout-delivery_courier">
        <input type="text" class="input" v-model="name.value"     @input="send_fields" placeholder="Имя*">
        <input type="text" class="input" v-model="phone.value"    @input="send_fields" placeholder="Телефон*">
        <input type="text" class="input" v-model="street.value"   @input="send_fields" placeholder="Улица*">
        <input type="text" class="input" v-model="house.value"    @input="send_fields" placeholder="Дом*">
        <input type="text" class="input" v-model="room.value"     @input="send_fields" placeholder="Кв./офис">
        <input type="text" class="input" v-model="floor.value"    @input="send_fields" placeholder="Этаж">
        <input type="text" class="input" v-model="entrance.value" @input="send_fields" placeholder="Подъезд">
        <input type="text" class="input" v-model="intercom.value" @input="send_fields" placeholder="Код домофона">
        <textarea rows="5" class="input" v-model="comment.value"  @input="send_fields" placeholder="Комментарий"></textarea>
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

            street: new FormField(true),
            house: new FormField(true),
            entrance: new FormField(),
            floor: new FormField(),
            room: new FormField(),
            intercom: new FormField(),
        }
    },
    
    methods: {
        send_fields() { 
            this.$emit("form-input", {
                name: this.name,
                phone: this.phone,
                comment: this.comment,

                street: this.street,
                house: this.house,
                entrance: this.entrance,
                floor: this.floor,
                room: this.room,
                intercom: this.intercom, 
            }); 
        }
    },

    created() {
        this.send_fields();
    },
});
</script>