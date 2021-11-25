const state = {
    is_open: false,
    product: null
}

const mutations = {
    UPDATE_IS_OPEN (state, payload) { state.is_open = payload; },
    UPDATE_PRODUCT (state, payload) { state.product = payload; }
}

const actions = {
    open ({ commit }, product) { 
        commit('UPDATE_IS_OPEN', true); 
        commit('UPDATE_PRODUCT', product);
    },
    
    close ({ commit }) { 
        commit('UPDATE_IS_OPEN', false); 
        commit('UPDATE_PRODUCT', null);
    }
}

const getters = {
    is_open: state => state.is_open,
    product: state => state.product
}

//

const modal_module = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
};

export default modal_module;