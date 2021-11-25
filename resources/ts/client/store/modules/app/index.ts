import { ComputedRef } from "@vue/runtime-dom";
import axios from "axios";

import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";

import Banner from "../../../classes/Banner";
import Category from "../../../classes/Category";
import Setting from "../../../classes/Setting";

const state = {
    categories: new Array<Category>(),
    banners: new Array<Banner>(),
    settings: new Array<Setting>(),
}

type State = typeof state;

// 

export enum MTypes {
    UPDATE_CATEGORIES = 'UPDATE_CATEGORIES',
    UPDATE_BANNERS = 'UPDATE_BANNERS',
    UPDATE_SETTINGS = 'UPDATE_SETTINGS',
}

type Mutations<S = State> = {
    [MTypes.UPDATE_CATEGORIES] (state: S, payload : Category[]) : void,
    [MTypes.UPDATE_BANNERS] (state: S, payload : Banner[]) : void,
    [MTypes.UPDATE_SETTINGS] (state: S, payload : Setting[]) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_CATEGORIES] (state, payload) { state.categories = payload; },
    [MTypes.UPDATE_BANNERS] (state, payload) { state.banners = payload; },
    [MTypes.UPDATE_SETTINGS] (state, payload) { state.settings = payload; },
}

// 

export enum ATypes {
    REQUEST_CATEGORIES = 'request_categories',
    REQUEST_BANNERS = 'request_banners',
    REQUEST_SETTINGS = 'request_settings',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.REQUEST_CATEGORIES] ({ commit } : AContext) : void,
    [ATypes.REQUEST_BANNERS] ({ commit } : AContext) : void,
    [ATypes.REQUEST_SETTINGS] ({ commit } : AContext) : void,
}

const actions : ActionTree<State, any> & Actions = {
    async [ATypes.REQUEST_CATEGORIES] ({ commit }) {
        const response = await axios.get('/api/client/categories');
        commit(MTypes.UPDATE_CATEGORIES, response.data.data.map((c : any) => new Category(c)));
    },

    async [ATypes.REQUEST_BANNERS] ({ commit }) {
        const response = await axios.get('/api/client/banners');
        commit(MTypes.UPDATE_BANNERS, response.data.data.map((b : any) => new Banner(b)));
    },

    async [ATypes.REQUEST_SETTINGS] ({ commit }) {
        const response = await axios.get('/api/client/settings');
        commit(MTypes.UPDATE_SETTINGS, response.data.data.map((s : any) => new Setting(s)));
    },
}

export enum GTypes {
    CATEGORIES = 'categories',
    BANNERS = 'banners',
    SETTINGS = 'settings',

    CATEGORY_BY_SLUG = 'category_by_slug',
    SETTING_BY_SLUG = 'setting_by_slug',
}

type Getters<S = State> = {
    [GTypes.CATEGORIES] : (state: S) => Category[],
    [GTypes.BANNERS] :( state: S) => Banner[],
    [GTypes.SETTINGS] : (state: S) => Setting[],

    [GTypes.CATEGORY_BY_SLUG] : (state: S) => (slug : string) => Category | undefined,
    [GTypes.SETTING_BY_SLUG] : (state: S) => (slug : string) => string | undefined,
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.CATEGORIES] : state => state.categories,
    [GTypes.BANNERS] : state => state.banners,
    [GTypes.SETTINGS] : state => state.settings,

    [GTypes.CATEGORY_BY_SLUG] : state => (slug : string) => state.categories.find(c => c.slug === slug),
    [GTypes.SETTING_BY_SLUG] : state => (slug : string) => state.settings.find(s => s.slug === slug)?.value,
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