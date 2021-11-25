import Currency from '@/classes/Currency';
import CartItem from '@-c/classes/CartItem';

const state = {
    product_items: [],
    coupon: null,
    persons_quantity: 1
}

const mutations = {
    UPDATE_PRODUCT_ITEMS (state, payload) { state.product_items = payload; },
    UPDATE_COUPON (state, payload) { state.coupon = payload; },
    UPDATE_PERSONS_QUANTITY (state, payload) { state.persons_quantity = payload; }
}

const actions = {
    increase_persons_quantity ({ commit, state }) {
        commit('UPDATE_PERSONS_QUANTITY', state.persons_quantity + 1);
    },

    decrease_persons_quantity ({ commit, state }) {
        if ( state.persons_quantity - 1 > 0 ) 
            commit('UPDATE_PERSONS_QUANTITY', state.persons_quantity - 1);
    },

    add_product_item ({ commit, state }, product) {        
        const items = [ ...state.product_items ];
        const item = new CartItem({ product: product, quantity: 1 });
        items.push(item);
        
        commit('UPDATE_PRODUCT_ITEMS', items);
    },

    increase_product_item_quantity ({ commit, state }, product) {
        const items = state.product_items.map(item => {
            if (item.product.id == product.id) item.increase_quantity();
            return item;
        });

        commit('UPDATE_PRODUCT_ITEMS', items);
    },

    decrease_product_item_quantity ({ commit, state, dispatch }, product) {
        const items = state.product_items.map(item => {
            if (item.product.id == product.id) item.decrease_quantity();
            return item;
        });

        commit('UPDATE_PRODUCT_ITEMS', items);
    
        for (const item of items) {
            if (item.quantity > 0) continue;

            dispatch('remove_product_item', item.product);
            break;
        }
    },

    remove_product_item ({ commit, state }, product) {
        const items = state.product_items.filter(item => item.product.id !== product.id);
        commit('UPDATE_PRODUCT_ITEMS', items);
    }
}

const getters = {
    persons_quantity: state => state.persons_quantity,
    
    product_items: state => state.product_items,
    
    coupon: state => state.coupon,
    coupon_valid: (state, getters) => state.coupon && state.coupon.is_valid(getters.total_with_discount.get_value),

    total: state => new Currency(
        state.product_items.reduce((acc, el) => (el.quantity * el.product.price) + acc, 0)
    ),
    
    total_with_discount: state => new Currency(
        state.product_items.reduce((acc, el) => (el.quantity * el.product.get_real_price) + acc, 0)
    ),

    total_with_discount_and_coupon: (state, getters) => {
        let total = getters.total_with_discount.get_value;
        if ( getters.coupon_valid ) total = state.coupon.calculate_discount(total);
    
        return new Currency(total);
    },

    discount: (state, getters) => new Currency(getters.total - getters.total_with_discount),

    quantity: state => state.product_items.reduce((acc, el) => el.quantity + acc, 0),
    quantity_formatted: (state, getters) => {
        let quantity_str = getters.quantity + '';
        const last_symbol = quantity_str[ quantity_str.length-1 ];

        if ( last_symbol === '1' && getters.quantity !== 11 ) 
            quantity_str += ' товар';
        else if ( (+last_symbol) >= 2 && (+last_symbol) <= 4 && ( getters.quantity < 11 || getters.quantity > 14 ) ) 
            quantity_str += ' товара';
        else
            quantity_str += ' товаров';
        
        return quantity_str;
    },

    is_contains_product_item: state => p => !!state.product_items.find(el => el.product.id == p.id),
    
    product_item_quantity: state => p => state.product_items.find(el => el.product.id == p.id).quantity,

    product_item_total_with_discount: state => p => {
        const item = state.product_items.find(el => el.product.id == p.id);
        return item.get_total_with_discount;
    },

    is_valid: (state, getters) => getters.quantity > 0 && getters.total_with_discount_and_coupon.get_value > 0
}

// 

const cart_module = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
};

export default cart_module;