import axios from 'axios';

import { ComputedRef } from '@vue/runtime-dom';
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';

import Category from '../../../classes/Category';
import Product from '../../../classes/Product';

const state = {
    products: Array<Product>(),
}

type State = typeof state;

// 

export enum MTypes {
    UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
}

type Mutations<S = State> = {
    [MTypes.UPDATE_PRODUCTS] (state: S, payload: Product[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_PRODUCTS] (state, payload) { state.products = payload; }
}

// 

export enum ATypes {
    REQUEST_PRODUCTS = 'request_products',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.REQUEST_PRODUCTS] ({ commit } : AContext, category: Category) : void,
} 

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_PRODUCTS] ({ commit }, category) {
        const response = await axios.get(`/api/client/categories/${category.id}/products`);
        commit(
            MTypes.UPDATE_PRODUCTS, 
            response.data.data.map( (p : any) => new Product(p) )
        );
    }
}

// 

export enum GTypes {
    PRODUCTS = 'products'
}

type Getters<S = State> = {
    [GTypes.PRODUCTS]: (state: S) => Product[]
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.PRODUCTS]: state => state.products
}

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const category_module : Module<State, any> = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
};