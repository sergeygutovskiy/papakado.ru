<template>
    <div class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body">
                    <h1 class="mb-0"> Добавить баннер </h1>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <form class="card-body" @submit.prevent="on_submit">
                    <image-field v-on:value-changed="image_changed" />

                    <div class="mt-3">
                        <label class="form-label"> Порядок </label>
                        <input type="number" class="form-control" min="1" v-model="order" required>
                    </div>

                    <button class="btn btn-success mt-5"> 
                        Добавить баннер
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import ImageField from '../products/fields/Image.vue';

export default {
    components: {
        ImageField
    },

    data() {
        return {
            image: null,
            order: 1
        }
    },

    methods: {
        ...mapActions({
            add: 'banner/add_item',
            add_toast: 'app/add_toast'
        }),

        image_changed(payload) { this.image = payload; },

        async on_submit () {            
            const form_data = new FormData();
            form_data.append('image', this.image);
            form_data.append('order', this.order);

            await this.add(form_data);
            
            this.add_toast({ 
                text: `Баннер добавлен`,
                style: 'bg-success' 
            });
            
            this.$router.push({ name: 'banners-index' });
        }
    }
}
</script>