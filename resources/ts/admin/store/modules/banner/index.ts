import axios from "axios";

import { ComputedRef } from "@vue/runtime-dom";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";

import Banner from "../../../classes/Banner";

type State = {
    items: Banner[]
}

const state : State = {
    items: []
}

// 

export enum MTypes {
    UPDATE_ITEMS = 'UPDATE_ITEMS'
}

type Mutations<S = State> = {
    [MTypes.UPDATE_ITEMS] (state: S, payload: Banner[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_ITEMS] (state, payload) { state.items = payload; },
}

// 

export enum ATypes {
    REQUEST_ITEMS = 'request_items',
    STORE_ITEM = 'store_item',
    DELETE_ITEM = 'delete_item',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.REQUEST_ITEMS] ({ commit } : AContext) : void,
    [ATypes.STORE_ITEM] ({ commit } : AContext, data: FormData) : void,
    [ATypes.DELETE_ITEM] ({ commit, state } : AContext, id: number) : void,
}

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_ITEMS] ({ commit }) {
        const response = await axios.get('/api/admin/banners');
        
        const data : any[] = response.data.data;
        const items : Banner[] = data.map(b => new Banner(b));
        
        commit(MTypes.UPDATE_ITEMS, items);
    },

    async [ATypes.STORE_ITEM] ({ dispatch }, data) {
        await axios.post(`/api/admin/banners`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch(ATypes.REQUEST_ITEMS);
    },

    async [ATypes.DELETE_ITEM] ({ commit, state }, id) {
        await axios.delete(`/api/admin/banners/${id}`);
        
        const items = state.items.filter(i => i.id !== id);
        commit(MTypes.UPDATE_ITEMS, items);
    },
}

// 

export enum GTypes {
    ITEMS = 'items',
}

type Getters<S = State> = {
    [GTypes.ITEMS]: (state: S) => Banner[]
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.ITEMS]: state => state.items
} 

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const banner_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}