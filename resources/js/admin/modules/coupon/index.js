import axios from "axios";
import Coupon from "@-a/classes/Coupon";

const state = {
    items: []
}

const mutations = {
    UPDATE_ITEMS (state, payload) { state.items = payload; }
}

const actions = {
    async get_items ({ commit }) {
        const response = await axios.get('/api/admin/coupons');
        commit('UPDATE_ITEMS', response.data.data.map( c => new Coupon(c) ));
    },

    async add_item({ dispatch }, form_data) {
        await axios.post('/api/admin/coupons', form_data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch('get_items');
    },

    async delete_item ({ commit, state }, id) {
        await axios.delete(`/api/admin/coupons/${id}`);
        
        const items = state.items.filter(i => i.id !== id);
        commit('UPDATE_ITEMS', items);
    },
}

const getters = {
    items: state => state.items
}

const coupon_module = {
    namespaced: true,

    state,
    mutations,
    getters,
    actions
}

export default coupon_module;