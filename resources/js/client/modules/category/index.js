import axios from 'axios';
import Product from '@-c/classes/Product';

const state = {
    products: [],
}

const mutations = {
    UPDATE_PRODUCTS (state, payload) { state.products = payload; }
}

const actions = {
    async get_products ({ commit }, id) {
        const response = await axios.get(`/api/client/categories/${id}/products`);
        commit('UPDATE_PRODUCTS', response.data.data.map(product => new Product(product)));
    }
}

const getters = {
    products: state => state.products
}

const category_module = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
};

export default category_module;