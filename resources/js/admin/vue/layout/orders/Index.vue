<template>
    <section class="row">
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <h1 class="mb-0"> Заказы </h1>
                </div>
            </div>
        </div>

        <div 
            v-for="order in orders"
            :key="order.id"
            class="col-xl-8 mb-4"
            >
            <article class="card">
                <button class="card-header bg-light btn" data-bs-toggle="collapse" :data-bs-target="'#order-' + order.id">
                    <h2 class="d-flex justify-content-between align-items-center"> 
                        <span> Заказ №{{ order.id }} </span> 
                        <span> {{ order.created_at }} </span>
                    </h2>
                </button>
                <div class="collapse" :id="'order-' + order.id">
                    <div class="card-body bg-light">
                        <h3 class="mb-4"> 
                            <span> {{ order.total }} ₽ </span>
                        </h3>
                        <ul class="list-group">
                            <li 
                                v-for="product in order.products"
                                :key="product.id"
                                class="list-group-item d-flex justify-content-between align-items-center"
                                >
                                {{ product.name }}
                                <span class="badge bg-primary rounded-pill">
                                    {{ product.quantity }}
                                </span>
                            </li>
                        </ul>
                        
                        <div class="card mt-4">
                            <div class="card-body"> <h4 class="mb-0"> Оплата </h4> </div>
                        </div>
                        
                        <ul class="list-group mt-2">
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold"> Способ </div>
                                    {{ order.payment.label }}
                                </div>
                            </li>
                        </ul>

                        <div class="card mt-4">
                            <div class="card-body"> <h4 class="mb-0"> Контакты </h4> </div>
                        </div>
                        <ul class="list-group mt-2">
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold"> Имя </div>
                                    {{ order.delivery.name }}
                                </div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold"> Телефон </div>
                                    {{ order.delivery.phone }}
                                </div>
                            </li>
                            <li 
                                v-if="order.delivery.comment"
                                class="list-group-item d-flex justify-content-between align-items-start"
                                >
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold"> Комментарий </div>
                                    {{ order.delivery.comment }}
                                </div>
                            </li>
                        </ul>

                        <div class="card mt-4">
                            <div class="card-body"> <h4 class="mb-0"> Доставка </h4> </div>
                        </div>
                            
                        <ul class="list-group mt-2">
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold"> Способ </div>
                                    {{ order.delivery.label }}
                                </div>
                            </li>
                            <li 
                                v-if="order.delivery.slug == DeliveryEnum.COURIER.slug"
                                class="list-group-item d-flex justify-content-between align-items-start"
                                >
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold"> Адрес </div>
                                    {{ order.delivery.info.address }}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DeliveryEnum from '@/enums/Delivery';

export default {
    computed: {
        ...mapGetters({
            orders: 'order/items'
        }),

        DeliveryEnum() { return DeliveryEnum; }
    },

    methods: {
        ...mapActions({
            get_orders: 'order/get_items'
        })
    },

    created() {
        if ( !this.orders.length ) this.get_orders();
    }
}
</script>