import { createWebHistory, createRouter } from "vue-router";

import Home from '../vue/layout/Home.vue';

import ProductIndex from '../vue/layout/product/Index.vue';
import ProductAdd from '../vue/layout/product/Add.vue';
import ProductUpdate from '../vue/layout/product/Update.vue';

import BannerIndex from '../vue/layout/banner/Index.vue'; 
import BannerAdd from '../vue/layout/banner/Add.vue'; 

import CouponIndex from '../vue/layout/coupon/Index.vue';
import CouponAdd from '../vue/layout/coupon/Add.vue'; 

import SettingIndex from '../vue/layout/setting/Index.vue';

import OrderIndex from '../vue/layout/order/Index.vue';
import OrderShow from '../vue/layout/order/Show.vue';

const routes = [    
    {
        path: '/',
        name: 'home',
        component: Home,
    },

    // 

    {
        path: '/products',
        name: 'products-index',
        component: ProductIndex,
    },
    {
        path: '/products/add',
        name: 'products-add',
        component: ProductAdd,
    },
    {
        path: '/products/:id/update',
        name: 'products-update',
        component: ProductUpdate,
        props: true,
    },

    // 

    {
        path: '/banners',
        name: 'banners-index',
        component: BannerIndex,
    },
    {
        path: '/banners/add',
        name: 'banners-add',
        component: BannerAdd,
    },

    // 

    {
        path: '/coupons',
        name: 'coupons-index',
        component: CouponIndex,
    },
    {
        path: '/coupons/add',
        name: 'coupons-add',
        component: CouponAdd,
    },

    // 

    {
        path: '/settings',
        name: 'settings-index',
        component: SettingIndex,
    },

    {
        path: '/orders',
        name: 'orders-index',
        component: OrderIndex,
    },
    {
        path: '/orders/:id',
        name: 'orders-show',
        component: OrderShow,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory('admin'),
    routes,
    scrollBehavior() { return { top: 0 }; }
});

export default router;