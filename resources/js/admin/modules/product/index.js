import axios from "axios";
import Product from '@-a/classes/Product';

const state = {
    items: []
}

const mutations = {
    UPDATE_ITEMS (state, payload) { state.items = payload; }
}

const actions = {
    async get_items ({ commit }) {
        const response = await axios.get('/api/admin/products');
        commit('UPDATE_ITEMS', response.data.data.map( item => new Product(item) ));
    },

    async get_item ({}, id) {
        const response = await axios.get(`/api/admin/products/${id}`);
        return new Product(response.data.data);
    },

    async delete_item ({ commit, state }, id) {
        await axios.delete(`/api/admin/products/${id}`);
        
        const items = state.items.filter(i => i.id !== id);
        commit('UPDATE_ITEMS', items);
    },

    async add_item({ dispatch }, form_data) {
        await axios.post('/api/admin/products', form_data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch('get_items');
    },

    async update_item({ dispatch }, { id, form_data }) {
        await axios.post(`/api/admin/products/${id}`, form_data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch('get_items');
    },

    async update_item_image({ dispatch }, { id, form_data }) {
        await axios.post(`/api/admin/products/${id}/image`, form_data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch('get_items');
    }
}

const getters = {
    items: state => state.items
} 

const product_module = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}

export default product_module;