<template>
    <article class="card">
        <div v-if="opened" class="card-header bg-light btn">
            <h2 class="d-flex justify-content-between align-items-center"> 
                <span> Заказ №{{ order.id }} </span> 
                <span> {{ order.created_at }} </span>
            </h2>
        </div>
        <button v-else class="card-header bg-light btn" data-bs-toggle="collapse" :data-bs-target="'#order-' + order.id">
            <h2 class="d-flex justify-content-between align-items-center mb-0"> 
                <span> Заказ №{{ order.id }} </span>
                <template v-if="is_payment_online">
                    <button 
                        v-if="order.payment.info.status === 'оплачено'" 
                        class="btn btn-success ms-auto me-5"
                        disabled
                        >
                        Оплачено
                    </button>
                    <button 
                        v-else 
                        class="btn btn-danger ms-auto me-5"
                        disabled
                        >
                        Не оплачено
                    </button>
                </template>
                <span> {{ order.created_at }} </span>
            </h2>
        </button>
        <div :class="{ 'collapse' : !opened }" :id="'order-' + order.id">
            <div class="card-body bg-light">
                <h3 class="mb-4"> 
                    <span> {{ order.total.formatted }} </span>
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
                        v-if="is_delivery_couier"
                        class="list-group-item d-flex justify-content-between align-items-start"
                        >
                        <div class="ms-2 me-auto">
                            <div class="fw-bold"> Адрес </div>
                            {{ delivery_courier.info.address }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Order from "../../../classes/Order";
import { OrderCourierDelivery } from '../../../classes/Order';

import DeliveryEnum from "../../../../enums/Delivery";
import PaymentEnum from "../../../../enums/Payment";

export default defineComponent({
    props: {
        order: {
            type: Order,
            required: true,
        },

        opened: {
            type: Boolean,
            required: false,
        }
    },

    computed: {
        is_payment_online() : boolean { return this.order.payment.slug === PaymentEnum.ONLINE; },
        is_delivery_couier() : boolean { return this.order.delivery.slug === DeliveryEnum.COURIER; },
        delivery_courier() : OrderCourierDelivery { return this.order.delivery as OrderCourierDelivery; },
    },
});
</script>