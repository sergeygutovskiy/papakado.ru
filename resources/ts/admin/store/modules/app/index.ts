import { ComputedRef } from "@vue/runtime-dom";
import axios from "axios";
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";

import Toast from "../../../classes/Toast";

type State = {
    toasts: Toast[],
}

const state : State = {
    toasts: [],
}

// 

export enum MTypes {
    UPDATE_TOASTS = 'UPDATE_toasts',
}

type Mutations<S = State> = {
    [MTypes.UPDATE_TOASTS] (state: S, payload: Toast[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_TOASTS] (state, payload) { state.toasts = payload; },
}

// 

export enum ATypes {
    STORE_TOAST = 'store_toast',
    DELETE_TOAST = 'delete_toast',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.STORE_TOAST] ({ state, commit } : AContext, toast: Toast) : void,
    [ATypes.DELETE_TOAST] ({ state, commit } : AContext, toast: Toast) : void,
}

const actions : ActionTree<State, any> & Actions = {
    [ATypes.STORE_TOAST] ({ state, commit }, toast) {
        const toasts = [...state.toasts, toast];
        commit(MTypes.UPDATE_TOASTS, toasts);
    },
    [ATypes.DELETE_TOAST] ({ state, commit }, toast) {
        const toasts = state.toasts.filter(t => t.key !== toast.key);
        commit(MTypes.UPDATE_TOASTS, toasts);
    },
}

// 

export enum GTypes {
    TOASTS = 'toasts',
    IS_AUTH = 'is_auth',
}

type Getters<S = State> = {
    [GTypes.TOASTS]: (state: S) => Toast[]
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.TOASTS]: state => state.toasts,
} 

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const app_module : Module<State, any> = {
    namespaced: true,
    
    state,
    mutations,
    actions,
    getters
}