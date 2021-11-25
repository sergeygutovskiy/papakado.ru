const state = {
    toasts: []
}

const mutations = {
    UPDATE_TOASTS (state, payload) { state.toasts = payload; }
}

const actions = {
    add_toast({ state, commit }, { text, style }) {
        const toast = {
            key: Date.now(),
            text: text,
            style: style
        }

        commit('UPDATE_TOASTS', [...state.toasts, toast]);
    },

    delete_toast({ state, commit }, toast) {
        const toasts = state.toasts.filter(t => t.key != toast.key);
        commit('UPDATE_TOASTS', toasts);
    }
}

const getters = {
    toasts: state => state.toasts
}

const app_module = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
}

export default app_module;