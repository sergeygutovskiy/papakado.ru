import axios from "axios";

const state = {
    items: []
}

const mutations = {
    UPDATE_ITEMS (state, payload) { state.items = payload; }
}

const actions = {
    async get_items ({ commit }) {
        const response = await axios.get('/api/admin/orders');
        commit('UPDATE_ITEMS', response.data.data);
    }
}

const getters = {
    items: state => state.items
} 

const order_module = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}

export default order_module;