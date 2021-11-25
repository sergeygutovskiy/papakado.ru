<template>
    <div class="ordering-checkout-delivery_pickup">
        <input type="text" 
            class="input" 
            v-model="form.name.value"    
            @input="send_fields" 
            placeholder="Имя*"
            >
        <input type="text" 
            class="input" 
            v-model="form.phone.value"   
            @input="send_fields" 
            placeholder="Телефон*"
            >
        <textarea rows="5" 
            class="input" 
            v-model="form.comment.value" 
            @input="send_fields" 
            placeholder="Комментарий"
            ></textarea>
        <p class="ordering-checkout-delivery_pickup__info-text">
            Адрес ресторана: Набережная Матисова канала, д.3 корпус 1 строение 1
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import InputField from '@/classes/InputField';
import DeliveryEnum from '@/enums/Delivery';

export default {
    data() {
        return {
            form: {
                name:    new InputField({ required: true  }),
                phone:   new InputField({ required: true  }),
                comment: new InputField({ required: false })
            }
        }
    },

    computed: {
        ...mapGetters({
            delivery: 'ordering/delivery',
        })
    },

    created() {
        if ( this.delivery && this.delivery.slug === DeliveryEnum.PICKUP.slug ) {
            this.form.name.value     = this.delivery.fields.name.value;
            this.form.phone.value    = this.delivery.fields.phone.value;
            this.form.comment.value  = this.delivery.fields.comment.value;
        }

        this.send_fields();
    },

    methods: {
        send_fields() { this.$emit("form-input", this.form); }
    }
}
</script>