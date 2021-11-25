<template>
    <article class="card w-100">
        <img 
            :src="product.image_path"
            style="height: 200px; object-fit: cover;"
            >
        <div class="card-body">
            <h4 class="card-title mb-0">
                {{ product.name }}
            </h4>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Категория </div>
                    {{ product.category.name }}
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Стоимость </div>
                    {{ product.price.get_formatted }}
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Скидка </div>
                    <template v-if="product.is_have_discount">
                        {{ product.get_real_price.get_formatted }}
                    </template>
                    <template v-else> нет </template>
                </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold"> Кол-во продаж </div>
                    {{ product.sales }}
                </div>
            </li>
        </ul>
        <div class="card-footer d-flex">
            <router-link 
                :to="{ name: 'products-update', params: { id: product.id } }"
                class="btn btn-primary ms-auto"
                >
                Обновить
            </router-link>
            <button
                @click="delete_product(product.id)"
                class="btn btn-danger ms-2"
                >
                Удалить
            </button>
        </div>
    </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: [
        'product'
    ],

    methods: {
        ...mapActions({
            _delete_product: 'product/delete_item',
            add_toast: 'app/add_toast'
        }),

        async delete_product(id) {
            await this._delete_product(id);
        
            this.add_toast({ 
                text: `Товар <b>${this.product.name}</b> удален`,
                style: 'bg-danger' 
            });
        }
    },
}
</script>