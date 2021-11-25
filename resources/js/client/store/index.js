import { createStore } from 'vuex'

import app_module from '@-c/modules/app';
import category_module from '@-c/modules/category';
import cart_module from '@-c/modules/cart';
import modal_module from '@-c/modules/product-modal';
import ordering_module from '@-c/modules/ordering';

const store = createStore({
    modules: {
        app: app_module,
        category: category_module,
        cart: cart_module,
        modal: modal_module,
        ordering: ordering_module,
    }
});

export default store;