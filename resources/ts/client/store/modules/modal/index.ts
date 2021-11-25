import { ComputedRef } from "@vue/runtime-dom";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import Product from "../../../classes/Product";

type State = {
    is_open: boolean,
    product: Product | null,
};

const state : State = {
    is_open: false,
    product: null,
}

// 

export enum MTypes {
    UPDATE_IS_OPEN = 'UPDATE_IS_OPEN',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT',
} 

type Mutations<S = State> = {
    [MTypes.UPDATE_IS_OPEN] (state: S, payload: boolean) : void,
    [MTypes.UPDATE_PRODUCT] (state: S, payload: Product | null) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_IS_OPEN] (state, payload) { state.is_open = payload; },
    [MTypes.UPDATE_PRODUCT] (state, payload) { state.product = payload; }
}

// 

export enum ATypes {
    OPEN = 'open',
    CLOSE = 'close',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.OPEN] ({ commit } : AContext, product: Product) : void,
    [ATypes.CLOSE] ({ commit } : AContext) : void,
}

const actions : ActionTree<State, any> & Actions = {
    open ({ commit }, product) { 
        commit(MTypes.UPDATE_IS_OPEN, true); 
        commit(MTypes.UPDATE_PRODUCT, product);
    },
    
    close ({ commit }) { 
        commit(MTypes.UPDATE_IS_OPEN, false); 
        commit(MTypes.UPDATE_PRODUCT, null);
    }
}

// 

export enum GTypes {
    IS_OPEN = 'is_open',
    PRODUCT = 'product',
}

type Getters<S = State> = {
    [GTypes.IS_OPEN]: (state: S) => boolean,
    [GTypes.PRODUCT]: (state: S) => Product | null
}

const getters : GetterTree<State, any> & Getters = {
    is_open: state => state.is_open,
    product: state => state.product
}

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

//

export const modal_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
};