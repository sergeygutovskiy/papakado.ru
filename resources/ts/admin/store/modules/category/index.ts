import { ComputedRef } from "@vue/runtime-dom";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";

import Category from "../../../classes/Category";
import Product from "../../../classes/Product";

type State = {
    items: Category[]
}

const state : State = {
    items: []
}

// 

export enum MTypes {
    UPDATE_ITEMS = 'UPDATE_ITEMS'
}

type Mutations<S = State> = {
    [MTypes.UPDATE_ITEMS] (state: S, payload: Category[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_ITEMS] (state, payload) { state.items = payload; },
}

// 

export enum ATypes {
    REQUEST_ITEMS = 'request_items',
    REQUEST_ITEM_PRODUCTS = 'request_item_products',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.REQUEST_ITEMS] ({ commit } : AContext) : void,
    [ATypes.REQUEST_ITEM_PRODUCTS] ({ commit } : AContext, id: number) : Promise<Product[]>,
}

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_ITEMS] ({ commit }) {
        const response = await axios.get('/api/admin/categories');
        
        const data : any[] = response.data.data;
        const items : Category[] = data.map(c => new Category(c));
        
        commit(MTypes.UPDATE_ITEMS, items);
    },

    async [ATypes.REQUEST_ITEM_PRODUCTS] ({ commit }, id) {
        const response = await axios.get(`/api/admin/categories/${id}/products`);

        const data : any[] = response.data.data;
        const products : Product[] = data.map(p => new Product(p));

        return products;
    }
}

// 

export enum GTypes {
    ITEMS = 'items',
}

type Getters<S = State> = {
    [GTypes.ITEMS]: (state: S) => Category[]
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.ITEMS]: state => state.items
} 

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const category_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}