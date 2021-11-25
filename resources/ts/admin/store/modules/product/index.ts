import { ComputedRef } from "@vue/runtime-dom";
import axios from "axios";
import { ActionTree, Commit, Dispatch, GetterTree, Module, MutationTree } from "vuex";

import Product from "../../../classes/Product";

type State = {
    items: Product[]
}

const state : State = {
    items: []
}

// 

export enum MTypes {
    UPDATE_ITEMS = 'UPDATE_ITEMS'
}

type Mutations<S = State> = {
    [MTypes.UPDATE_ITEMS] (state: S, payload: Product[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_ITEMS] (state, payload) { state.items = payload; },
}

// 

export enum ATypes {
    REQUEST_ITEMS = 'request_items',
    REQUEST_ITEM = 'request_item',

    STORE_ITEM = 'store_item',

    UPDATE_ITEM = 'update_item',
    UPDATE_ITEM_IMAGE = 'update_item_image',
    
    DELETE_ITEM = 'delete_item'
}

type Actions = {
    [ATypes.REQUEST_ITEMS] ({ commit } : { commit: Commit }) : void,
    [ATypes.REQUEST_ITEM] ({ commit } : { commit: Commit }, id : number) : Promise<Product>,
    
    [ATypes.STORE_ITEM] ({ dispatch } : { dispatch: Dispatch }, data: FormData) : void,

    [ATypes.UPDATE_ITEM] ({ dispatch } : { dispatch: Dispatch }, { id, data } : { id: number, data: FormData }) : void,
    [ATypes.UPDATE_ITEM_IMAGE] ({ dispatch } : { dispatch: Dispatch }, { id, data } : { id: number, data: FormData }) : void,

    [ATypes.DELETE_ITEM] ({ commit, state } : { commit: Commit, state: State }, id: number) : void,
}

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_ITEMS] ({ commit }) {
        const response = await axios.get('/api/admin/products');
        
        const data : any[] = response.data.data;
        const items : Product[] = data.map(p => new Product(p));
        
        commit(MTypes.UPDATE_ITEMS, items);
    },

    async [ATypes.REQUEST_ITEM] ({ commit }, id) {
        const response = await axios.get(`/api/admin/products/${id}`);
                
        const data : any = response.data.data;
        const item : Product = new Product(data);

        return item;
    },

    async [ATypes.STORE_ITEM] ({ dispatch }, data) {
        await axios.post(`/api/admin/products`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch(ATypes.REQUEST_ITEMS);
    },

    async [ATypes.UPDATE_ITEM] ({ dispatch }, { id, data }) {
        await axios.post(`/api/admin/products/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch(ATypes.REQUEST_ITEMS);
    },
    async [ATypes.UPDATE_ITEM_IMAGE] ({ dispatch }, { id, data }) {
        await axios.post(`/api/admin/products/${id}/image`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        await dispatch(ATypes.REQUEST_ITEMS);
    },

    async [ATypes.DELETE_ITEM] ({ commit, state }, id) {
        await axios.delete(`/api/admin/products/${id}`);
        
        const items = state.items.filter(i => i.id !== id);
        commit(MTypes.UPDATE_ITEMS, items);
    },
}

// 

export enum GTypes {
    ITEMS = 'items',
}

type Getters<S = State> = {
    [GTypes.ITEMS]: (state: S) => Product[]
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.ITEMS]: state => state.items
} 

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const product_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}