<template>
    <form class="ordering-checkout-delivery_courier">
        <input type="text" class="input" v-model="form.name.value"     @input="send_fields" placeholder="Имя*">
        <input type="text" class="input" v-model="form.phone.value"    @input="send_fields" placeholder="Телефон*">
        <input 
            ref="input_street"
            list="list_street" 
            type="text" 
            class="input" 
            v-model="form.street.value" 
            @input="validate" 
            placeholder="Улица*"
            >
        <input type="text" class="input" v-model="form.house.value"    @input="send_fields" placeholder="Дом*">
        <input type="text" class="input" v-model="form.room.value"     @input="send_fields" placeholder="Кв./офис">
        <input type="text" class="input" v-model="form.floor.value"    @input="send_fields" placeholder="Этаж">
        <input type="text" class="input" v-model="form.entrance.value" @input="send_fields" placeholder="Подъезд">
        <input type="text" class="input" v-model="form.intercom.value" @input="send_fields" placeholder="Код домофона">
        <textarea rows="5" class="input" v-model="form.comment.value"  @input="send_fields" placeholder="Комментарий"></textarea>
    
        <datalist ref="list_street" id="list_street">
            <option v-for="item in street_list" :key="item.i"> {{ item.value }} </option>
        </datalist>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';

import InputField from '@/classes/InputField';
import DeliveryEnum from '@/enums/Delivery';

export default {
    data() {
        return {
            form: {
                name:     new InputField({ required: true  }),
                phone:    new InputField({ required: true  }),
                street:   new InputField({ required: true  }),
                house:    new InputField({ required: true  }),
                room:     new InputField({ required: false }),
                floor:    new InputField({ required: false }),
                entrance: new InputField({ required: false }),
                intercom: new InputField({ required: false }),
                comment:  new InputField({ required: false })
            },

            street_list: [],
        }
    },

    computed: {
        ...mapGetters({
            delivery: 'ordering/delivery',
        })
    },

    created() {
        if ( this.delivery && this.delivery.slug === DeliveryEnum.COURIER.slug ) {
            this.form.name.value     = this.delivery.fields.name.value;
            this.form.phone.value    = this.delivery.fields.phone.value;
            this.form.comment.value  = this.delivery.fields.comment.value;

            this.form.street.value   = this.delivery.fields.street.value;
            this.form.house.value    = this.delivery.fields.house.value;
            this.form.room.value     = this.delivery.fields.room.value;
            this.form.floor.value    = this.delivery.fields.floor.value;
            this.form.entrance.value = this.delivery.fields.entrance.value;
            this.form.intercom.value = this.delivery.fields.intercom.value;
        }

        this.send_fields();
    },

    mounted() {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        const token = "5e1cb85d002cdb20b4fbc6d2c88721d8a9e57ff1";

        this.$refs.input_street.addEventListener('input', async (e) => {
            const text = this.$refs.input_street.value;

            if (!e.inputType || e.inputType === 'insertReplacementText') return;

            let options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    query: text,

                    from_bound: { value: 'street' },
                    to_bound: { value: 'street' },
                    locations: [{ region: 'Санкт-Петербург' }],
                    restrictvalue: true
                })
            }

            const response = await fetch(url, options)
            const data = await response.json();

            this.street_list = data.suggestions.map((item, index) => { 
                return { i: index, value: item.data.street_with_type } 
            });
        });
    },

    methods: {
        send_fields() { this.$emit("form-input", this.form); }
    }
}
</script>