import axios from 'axios';

const state = {
    categories: [],
    banners: [],
    settings: []
}

const mutations = {
    UPDATE_CATEGORIES (state, payload) { state.categories = payload; },
    UPDATE_BANNERS (state, payload) { state.banners = payload; },
    UPDATE_SETTINGS (state, payload) { state.settings = payload; }
}

const actions = {
    async get_categories ({ commit }) {
        const response = await axios.get('/api/client/categories');
        commit('UPDATE_CATEGORIES', response.data.data);
    },

    async get_banners ({ commit }) {
        const response = await axios.get('/api/client/banners');
        commit('UPDATE_BANNERS', response.data.data);
    },

    async get_settings ({ commit }) {
        const response = await axios.get('/api/client/settings');
        commit('UPDATE_SETTINGS', response.data.data);
    }
}

const getters = {
    categories: state => state.categories,
    banners: state => state.banners,
    settings: state => state.settings,

    category_by_slug: state => slug => state.categories.find(c => c.slug === slug),
    setting_by_slug: state => slug => state.settings.find(s => s.slug === slug).value
}

const app_module = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}

export default app_module;