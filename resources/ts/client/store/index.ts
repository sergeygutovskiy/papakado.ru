import { createStore } from "vuex";

import { app_module } from "./modules/app";
import { category_module } from "./modules/category";
import { cart_module } from "./modules/cart";
import { modal_module } from "./modules/modal";
import { ordering_module } from "./modules/ordering";

export enum ModuleTypes {
    APP      = 'app',
    CATEGORY = 'category',
    CART     = 'cart',
    MODAL    = 'modal',
    ORDERING = 'ordering',
}

const store = createStore({
    modules: {
        [ModuleTypes.APP]: app_module,
        [ModuleTypes.CATEGORY]: category_module,
        [ModuleTypes.CART]: cart_module,
        [ModuleTypes.MODAL]: modal_module,
        [ModuleTypes.ORDERING]: ordering_module,
    }
})

export function namespace(namespace : string, value : string) {
    return namespace + '/' + value;
}

export default store;