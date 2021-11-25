import { createWebHistory, createRouter } from "vue-router";

import ProductIndex from '@-a-vue/layout/products/Index'
import ProductAdd from '@-a-vue/layout/products/Add';
import ProductUpdate from '@-a-vue/layout/products/Update';

import BannerIndex from '@-a-vue/layout/banners/Index';
import BannerAdd from '@-a-vue/layout/banners/Add';

import OrderIndex from '@-a-vue/layout/orders/Index';

import CouponIndex from '@-a-vue/layout/coupons/Index';
import CouponAdd from '@-a-vue/layout/coupons/Add';

import SettingIndex from '@-a-vue/layout/settings/Index';

const routes = [
    {
        path: '/products',
        name: 'products-index',
        component: ProductIndex
    },
    {
        path: '/products/add',
        name: 'products-add',
        component: ProductAdd
    },
    {
        path: '/products/:id',
        name: 'products-update',
        component: ProductUpdate,
        props: true
    },

    {
        path: '/banners',
        name: 'banners-index',
        component: BannerIndex
    },
    {
        path: '/banners/add',
        name: 'banners-add',
        component: BannerAdd
    },

    {
        path: '/orders',
        name: 'orders-index',
        component: OrderIndex
    },

    {
        path: '/coupons',
        name: 'coupons-index',
        component: CouponIndex
    },
    {
        path: '/coupons/add',
        name: 'coupons-add',
        component: CouponAdd
    },

    {
        path: '/setings',
        name: 'settings-index',
        component: SettingIndex
    },
];

const router = createRouter({
    history: createWebHistory('admin'),
    routes,
    scrollBehavior() { return { top: 0 }; }
});

export default router;