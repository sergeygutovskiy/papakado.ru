import { ComputedRef } from "@vue/runtime-dom";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";

import Order from "../../../classes/Order";

type State = {
    items: Order[]
}

const state : State = {
    items: []
}

// 

export enum MTypes {
    UPDATE_ITEMS = 'UPDATE_ITEMS'
}

type Mutations<S = State> = {
    [MTypes.UPDATE_ITEMS] (state: S, payload: Order[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_ITEMS] (state, payload) { state.items = payload; },
}

// 

export enum ATypes {
    REQUEST_ITEMS = 'request_items',
    REQUEST_ITEM = 'request_item',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.REQUEST_ITEMS] ({ commit } : AContext) : void,
    [ATypes.REQUEST_ITEM] ({ commit } : AContext, id: number) : Promise<Order>,
}

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_ITEMS] ({ commit }) {
        const response = await axios.get('/api/admin/orders');
        
        const data : any[] = response.data.data;
        const items : Order[] = data.map(o => new Order(o));
        
        commit(MTypes.UPDATE_ITEMS, items);
    },

    async [ATypes.REQUEST_ITEM] ({ commit }, id) {
        const response = await axios.get(`/api/admin/orders/${id}`);
        
        const data : any = response.data.data;
        const item : Order = new Order(data);
        
        return item;
    },
}

// 

export enum GTypes {
    ITEMS = 'items',
}

type Getters<S = State> = {
    [GTypes.ITEMS]: (state: S) => Order[]
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.ITEMS]: state => state.items
} 

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const order_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}