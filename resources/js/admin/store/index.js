import { createStore } from 'vuex'

import product_module from '@-a/modules/product';
import category_module from '@-a/modules/category';
import banner_module from '@-a/modules/banner';
import order_module from '@-a/modules/order';
import coupon_module from '@-a/modules/coupon';
import setting_module from '@-a/modules/setting';
import app_module from '@-a/modules/app';

const store = createStore({
    modules: {
        product: product_module,
        category: category_module,
        banner: banner_module,
        order: order_module,
        coupon: coupon_module,
        setting: setting_module,
        app: app_module
    }
});

export default store;