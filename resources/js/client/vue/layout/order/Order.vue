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
            <template v-if="order.delivery.slug == DeliveryEnum.COURIER.slug">
                <dt class="list__item-name"> Адрес </dt>
                <dd class="list__item-value"> {{ order.delivery.info.address }} </dd>
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
                    {{ product.get_total_price.get_formatted }} 
                </dd>
            </template>

            <!-- total with discount -->
            <dt class="list__item-name list__item-name_big"> Итого </dt>
            <dd class="list__item-value list__item-value_big"> {{ order.total.get_formatted }} </dd>
        </dl>
    </section>
</template>

<script>
import axios from 'axios';

import DeliveryEnum from '@/enums/Delivery';
import PaymentEnum from '@/enums/Payment';

import Currency from '@/classes/Currency';
import OrderProduct from '@-c/classes/OrderProduct';

export default {
    props: [
        'id'
    ],

    data() {
        return {
            order: null,

            DeliveryEnum: DeliveryEnum,
            PaymentEnum: PaymentEnum
        }
    },

    async created() {
        const response = await axios.get(`/api/client/orders/${this.id}`);
        this.order = response.data.data;

        this.order.total = new Currency(this.order.total);
        this.order.products = this.order.products.map(p => new OrderProduct(p));
    
        console.log(this.order);
    }
}
</script>