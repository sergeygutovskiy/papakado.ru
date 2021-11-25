import axios from 'axios';

const state = {
    title: '',

    delivery: null,
    payment: null
}

const mutations = {
    UPDATE_TITLE (state, payload) { state.title = payload; },
    UPDATE_DELIVERY (state, payload) { state.delivery = payload; },
    UPDATE_PAYMENT (state, payload) { state.payment = payload; }
}

const actions = {
    async submit ({ state, commit, rootState }) {
        const order = {};

        // products
        order.products = rootState.cart.product_items.map(item => { return {
            id: item.product.id,
            quantity: item.quantity
        }});

        // persons
        order.persons_quantity = rootState.cart.persons_quantity;

        // coupon
        order.coupon = rootState.cart.coupon ? rootState.cart.coupon.id : null;
        
        // payment
        order.payment = state.payment.slug;

        // delivery fiels
        let fields = {};
        for (const [key, value] of Object.entries(state.delivery.fields)) {
            fields[key] = value.value;
            console.log(key, value);
        }

        console.log(fields);

        // delivery
        order.delivery = {
            slug: state.delivery.slug,
            fields: fields
        };

        const response = await axios.post('/api/client/order/submit', order);
        return response.data.data;
    }
}

const getters = {
    title: state => state.title,

    delivery: state => state.delivery,
    
    payment: state => state.payment,
    
    delivery_street: (state, { delivery }) => {
        return delivery.fields.street.value
        + ', ' + delivery.fields.house.value
        + (delivery.fields.room.value ? ', кв. ' + delivery.fields.room.value : '')
        + (delivery.fields.entrance.value ? ', подъезд ' + delivery.fields.entrance.value : '')
        + (delivery.fields.floor.value ? ', этаж ' + delivery.fields.floor.value : '')
        ;
    },

    is_valid: (state, getters) => state.delivery && state.payment
}

// 

const ordering_module = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
};

export default ordering_module;