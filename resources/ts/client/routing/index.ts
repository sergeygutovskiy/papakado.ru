import { createWebHistory, createRouter } from "vue-router";

import Menu from '../vue/layout/menu/Menu.vue';
import Category from '../vue/layout/menu/Category.vue';

import Ordering from '../vue/layout/ordering/Ordering.vue';
import OrderingCart from '../vue/layout/ordering/cart/Cart.vue';
import OrderingCheckout from '../vue/layout/ordering/checkout/Checkout.vue';
import OrderingConfirmation from '../vue/layout/ordering/confirmation/Confirmation.vue';

import Contacts from '../vue/layout/contacts/Contacts.vue';
import Policy from '../vue/layout/contacts/Policy.vue';
import Rules from '../vue/layout/contacts/Rules.vue';

import Order from '../vue/layout/order/Order.vue'

import NotFound from '../vue/layout/not-found/NotFound.vue';

const routes = [
    {
        path: '/menu',
        name: 'menu',
        component: Menu,
        
        children: [
            {
                path: ':slug',
                name: 'menu-category',
                component: Category,
                props: true
            },
        ]
    },
    
    {
        path: '/',
        component: Menu,

        children: [
            {
                path: '',
                name: 'home',
                component: Category,
                props: {
                    slug: 'sushi'
                }
            },
        ]
    },

    {
        path: '/ordering',
        name: 'ordering',
        component: Ordering,
        
        children: [
            {
                path: 'cart',
                name: 'ordering-cart',
                component: OrderingCart,
                meta: {
                    title: 'Корзина'
                }
            },
            {
                path: 'checkout',
                name: 'ordering-checkout',
                component: OrderingCheckout,
                meta: {
                    title: 'Оформление заказа'
                }
            },
            {
                path: 'confirm',
                name: 'ordering-confirmation',
                component: OrderingConfirmation,
                meta: {
                    title: 'Подтверждение заказа'
                }
            },
        ]
    },

    {
        path: '/privacy',
        name: 'privacy',
        component: Policy,
        meta: {
            title: 'Политика Конфиденциальности'
        }
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts,
        meta: {
            title: 'Контакты'
        }
    },
    {
        path: '/delivery',
        name: 'delivery',
        component: Rules,
        meta: {
            title: 'Доставка'
        }
    },

    {
        path: '/order/:id',
        name: 'order',
        component: Order,
        props: (route : any) => ({ 
            id: route.params.id,
            orderId: route.query.orderId,
            lang: route.query.lang, 
        })
    },

    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() { 
        document.getElementsByClassName('app-content')[0].scrollIntoView();
        return { left: 0, top: 0 }; 
    }
});

export default router;