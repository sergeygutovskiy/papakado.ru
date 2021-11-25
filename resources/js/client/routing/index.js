import { createWebHistory, createRouter } from "vue-router";
import store from '@-c/store';

import Menu from '@-c-vue/layout/menu/Menu';
import Category from '@-c-vue/layout/menu/Category';

import Ordering from '@-c-vue/layout/ordering/Ordering';
import OrderingCart from '@-c-vue/layout/ordering/cart/Cart';
import OrderingCheckout from '@-c-vue/layout/ordering/checkout/Checkout';
import OrderingConfirmation from '@-c-vue/layout/ordering/confirmation/Confirmation';

import Order from '@-c-vue/layout/order/Order';
import Contacts from '@-c-vue/layout/contacts/Contacts';
import Privacy from '@-c-vue/layout/privacy/Privacy';

const routes = [
    // menu
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
            }
        ]
    },
    
    // home: menu first category
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
            }
        ]
    },

    // ordering 
    {
        path: '/ordering',
        name: 'ordering',
        component: Ordering,
        
        children: [
            {
                path: 'cart',
                name: 'ordering-cart',
                component: OrderingCart,
            },
            {
                path: 'checkout',
                name: 'ordering-checkout',
                component: OrderingCheckout
            },
            {
                path: 'confirmation',
                name: 'ordering-confirmation',
                component: OrderingConfirmation
            }
        ]
    },

    // order 
    {
        path: '/order/:id',
        name: 'order',
        component: Order,
        props: true
    },

    // contacts
    {
        path: '/contacts',
        name: 'contacts',
        component: Contacts
    },

    // policy
    {
        path: '/privacy',
        name: 'privacy',
        component: Privacy
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

router.beforeEach((to, from, next) => {
    store.dispatch('modal/close');
    next();
})

export default router;