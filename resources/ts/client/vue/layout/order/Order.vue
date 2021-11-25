<template>
    <section class="ordering-confirmation" v-if="order">
        <header class="ordering-header main-section__header">
            <h1 class="main-section__title ordering-header__title">
                {{ order.label }}
            </h1>
        </header>

        <dl class="ordering-confirmation-info list">
            <!-- Name -->
            <dt class="list__item-name"> Имя </dt>
            <dd class="list__item-value"> {{ order.delivery.name }} </dd>

            <!-- Phone -->
            <dt class="list__item-name"> Телефон </dt>
            <dd class="list__item-value"> {{ order.delivery.phone }} </dd>
            
            <!-- Address -->
            <template v-if="is_delivery_couier">
                <dt class="list__item-name"> Адрес </dt>
                <dd class="list__item-value"> {{ delivery_courier.info.address }} </dd>
            </template>

            <!-- Payment -->
            <dt class="list__item-name"> Оплата </dt>
            <dd class="list__item-value"> 
                {{ order.payment.label }}
            </dd>

            <!-- Persons quantity -->
            <dt class="list__item-name"> Кол-во персон </dt>
            <dd class="list__item-value"> {{ order.persons_quantity }} </dd>

            <!-- Comment -->
            <template v-if="order.delivery.comment">
                <dt class="list__item-name"> Комментарий </dt>
                <dd class="list__item-value"> {{ order.delivery.comment }} </dd>
            </template>
        </dl>

        <dl class="ordering-confirmation-products list">
            <!-- products -->
            <template 
                v-for="product in order.products" 
                :key="product.id"
                >
                <dt class="list__item-name"> 
                    {{ product.name }} 
                    <span class="ordering-confirmation-products__quantity"> (x{{ product.quantity }}) </span>
                </dt>
                <dd class="list__item-value"> 
                    {{ product.total.formatted }} 
                </dd>
            </template>

            <!-- total with discount -->
            <dt class="list__item-name list__item-name_big"> Итого </dt>
            <dd class="list__item-value list__item-value_big"> {{ order.total.formatted }} </dd>
        </dl>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import axios from "axios";
import DeliveryEnum from "../../../../enums/Delivery";
import Order, { OrderCourierDelivery, OrderDelivery, OrderPayment } from "../../../classes/order/Order";
import OrderProduct from "../../../classes/order/OrderProduct";

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        },
        orderId: {
            type: String,
            required: false,
        },
        lang: {
            type: String,
            required: false,
        }
    },
    
    data() {
        return {
            order: null,
        } as {
            order: Order | null,
        }
    },

    computed: {
        is_delivery_couier() : boolean { return this.order?.delivery.slug === DeliveryEnum.COURIER; },
        delivery_courier() : OrderCourierDelivery { return this.order?.delivery as OrderCourierDelivery; },
    },

    async created() {
        if ( this.orderId && this.lang ) { 
            await axios.post(`/api/client/orders/${this.id}/payment/online/check-status`, {
                order_id: this.orderId
            });
            this.$router.push({ name: 'order', params: { id: this.id } }); 
        }
        
        const response = await axios.get(`/api/client/orders/${this.id}`);
        const data = response.data.data;

        const products: OrderProduct[] = data.products.map( (p: any) => new OrderProduct(p));
        const delivery: OrderDelivery = data.delivery;
        const payment: OrderPayment = data.payment;

        this.order = new Order({
            id: data.id,
            label: data.label,
            total: data.total,
            persons_quantity: data.persons_quantity,

            products: products,
            delivery: delivery,
            payment: payment,
        });
    }
});
</script>