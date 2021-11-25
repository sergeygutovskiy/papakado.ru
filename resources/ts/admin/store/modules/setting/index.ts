import axios from "axios";

import { ComputedRef } from "@vue/runtime-dom";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";

import Setting from '../../../classes/Setting';

type State = {
    items: Setting[]
}

const state : State = {
    items: []
}

// 

export enum MTypes {
    UPDATE_ITEMS = 'UPDATE_ITEMS'
}

type Mutations<S = State> = {
    [MTypes.UPDATE_ITEMS] (state: S, payload: Setting[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_ITEMS] (state, payload) { state.items = payload; },
}

// 

export enum ATypes {
    REQUEST_ITEMS = 'request_items',
    UPDATE_ITEM = 'update_item',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.REQUEST_ITEMS] ({ commit } : AContext) : void,
    [ATypes.UPDATE_ITEM] ({ commit } : AContext, { id, data } : { id: number, data: FormData }) : void,
}

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_ITEMS] ({ commit }) {
        const response = await axios.get('/api/admin/settings');
        
        const data : any[] = response.data.data;
        const items : Setting[] = data.map(s => new Setting(s));
        
        commit(MTypes.UPDATE_ITEMS, items);
    },

    async [ATypes.UPDATE_ITEM] ({ dispatch }, { id, data }) {
        await axios.post(`/api/admin/settings/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch(ATypes.REQUEST_ITEMS);
    },
}

// 

export enum GTypes {
    ITEMS = 'items',
}

type Getters<S = State> = {
    [GTypes.ITEMS]: (state: S) => Setting[],
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.ITEMS]: state => state.items,
} 

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const setting_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}