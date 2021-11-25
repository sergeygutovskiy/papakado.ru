import { createStore } from "vuex";

import { app_module } from "./modules/app";
import { category_module } from "./modules/category";
import { product_module } from "./modules/product";
import { banner_module } from "./modules/banner";
import { coupon_module } from "./modules/coupon";
import { setting_module } from "./modules/setting";
import { order_module } from "./modules/order";

export enum ModuleTypes {
    APP = 'app',
    CATEGORY = 'category',
    PRODUCT = 'product',
    BANNER = 'banner',
    COUPON = 'coupon',
    SETTING = 'setting',
    ORDER = 'order',
}

const store = createStore({
    modules: {
        [ModuleTypes.APP]: app_module,
        [ModuleTypes.CATEGORY]: category_module,
        [ModuleTypes.PRODUCT]: product_module,
        [ModuleTypes.BANNER]: banner_module,
        [ModuleTypes.COUPON]: coupon_module,
        [ModuleTypes.SETTING]: setting_module,
        [ModuleTypes.ORDER]: order_module,
    }
})

export function namespace(namespace : string, value : string) {
    return namespace + '/' + value;
}

export default store;