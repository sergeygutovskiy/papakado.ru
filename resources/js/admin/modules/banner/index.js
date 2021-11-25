import axios from "axios";

const state = {
    items: []
}

const mutations = {
    UPDATE_ITEMS (state, payload) { state.items = payload; }
}

const actions = {
    async get_items ({ commit }) {
        const response = await axios.get('/api/admin/banners');
        commit('UPDATE_ITEMS', response.data.data);
    },

    async delete_item ({ commit, state }, id) {
        await axios.delete(`/api/admin/banners/${id}`);
        
        const items = state.items.filter(i => i.id !== id);
        commit('UPDATE_ITEMS', items);
    },

    async add_item({ dispatch }, form_data) {
        await axios.post('/api/admin/banners', form_data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch('get_items');
    },
}

const getters = {
    items: state => state.items
} 

const banner_module = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}

export default banner_module;