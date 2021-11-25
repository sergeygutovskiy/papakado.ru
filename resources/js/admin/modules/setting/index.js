import axios from "axios";

const state = {
    items: []
}

const mutations = {
    UPDATE_ITEMS (state, payload) { state.items = payload; }
}

const actions = {
    async get_items ({ commit }) {
        const response = await axios.get('/api/admin/settings');
        commit('UPDATE_ITEMS', response.data.data);
    },

    async update_item({ dispatch }, { setting, form_data }) {
        await axios.post(`/api/admin/settings/${setting.id}`, form_data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch('get_items');
    },
}

const getters = {
    items: state => state.items
}

const setting_module = {
    namespaced: true,

    state,
    mutations,
    getters,
    actions
}

export default setting_module;