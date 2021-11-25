import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { ComputedRef } from "@vue/runtime-dom";

import Currency from "../../../../classes/Currency";
import CartItem from "../../../classes/CartItem";
import Coupon from "../../../classes/Coupon";
import Product from "../../../classes/Product";

type State = {
    product_items: CartItem[],
    coupon: Coupon | null,
    persons_quantity: number,
}

const state : State = {
    product_items:[],
    coupon: null,
    persons_quantity: 1,
}

// 

export enum MTypes {
    UPDATE_PRODUCT_ITEMS = 'UPDATE_PRODUCT_ITEMS',
    UPDATE_COUPON = 'UPDATE_COUPON',
    UPDATE_PERSONS_QUANTITY = 'UPDATE_PERSONS_QUANTITY',
}


type Mutations<S = State> = {
    [MTypes.UPDATE_PRODUCT_ITEMS] (state: S, payload: CartItem[]) : void,
    [MTypes.UPDATE_COUPON] (state: S, payload: Coupon | null) : void,
    [MTypes.UPDATE_PERSONS_QUANTITY] (state: S, payload: number) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_PRODUCT_ITEMS] (state, payload) { state.product_items = payload; },
    [MTypes.UPDATE_COUPON] (state, payload) { state.coupon = payload; },
    [MTypes.UPDATE_PERSONS_QUANTITY] (state, payload) { state.persons_quantity = payload; },
}

// 

export enum ATypes {
    INCREASE_PERSONS_QUANTITY = 'increase_persons_quantity',
    DECREASE_PERSONS_QUANTITY = 'decrease_persons_quantity',
    
    ADD_PRODUCT_ITEM = 'add_product_item',
    REMOVE_PRODUCT_ITEM = 'remove_product_item',
    
    INCREASE_PRODUCT_ITEM_QUANTITY = 'increase_product_item_quantity',
    DECREASE_PRODUCT_ITEM_QUANTITY = 'decrease_product_item_quantity',    
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.INCREASE_PERSONS_QUANTITY] ({ commit, state } : AContext) : void,
    [ATypes.DECREASE_PERSONS_QUANTITY] ({ commit, state } : AContext) : void,
    [ATypes.ADD_PRODUCT_ITEM] ({ commit, state } : AContext, product: Product) : void,
    [ATypes.INCREASE_PRODUCT_ITEM_QUANTITY] ({ commit, state } : AContext, product: Product) : void,
    [ATypes.DECREASE_PRODUCT_ITEM_QUANTITY] ({ commit, state, dispatch } : AContext, product: Product) : void,
    [ATypes.REMOVE_PRODUCT_ITEM] ({ commit, state } : AContext, product : Product | CartItem) : void,
}

const actions : ActionTree<State, any> & Actions = {
    [ATypes.INCREASE_PERSONS_QUANTITY] ({ commit, state }) {
        commit(MTypes.UPDATE_PERSONS_QUANTITY, state.persons_quantity + 1);
    },

    [ATypes.DECREASE_PERSONS_QUANTITY] ({ commit, state }) {
        if ( state.persons_quantity - 1 <= 0 ) return; 
        
        commit(MTypes.UPDATE_PERSONS_QUANTITY, state.persons_quantity - 1);
    },

    [ATypes.ADD_PRODUCT_ITEM] ({ commit, state }, product) {        
        const items = [ ...state.product_items ];

        const item = new CartItem(product);
        items.push(item);
        
        commit(MTypes.UPDATE_PRODUCT_ITEMS, items);
    },

    [ATypes.INCREASE_PRODUCT_ITEM_QUANTITY] ({ commit, state }, product) {
        const items = state.product_items.map(item => {
            if (item.product.id === product.id) item.increase();
            return item;
        });

        commit(MTypes.UPDATE_PRODUCT_ITEMS, items);
    },

    [ATypes.DECREASE_PRODUCT_ITEM_QUANTITY] ({ commit, state, dispatch }, product) {
        const items = state.product_items.map(item => {
            if (item.product.id == product.id) item.decrease();
            return item;
        });

        commit(MTypes.UPDATE_PRODUCT_ITEMS, items);
    
        for (const item of items) {
            if (item.quantity > 0) continue;

            dispatch(ATypes.REMOVE_PRODUCT_ITEM, item.product);
            break;
        }
    },

    [ATypes.REMOVE_PRODUCT_ITEM] ({ commit, state }, product) {
        if ( product instanceof Product ) {
            const items = state.product_items.filter(item => item.product.id !== product.id);
            commit(MTypes.UPDATE_PRODUCT_ITEMS, items);
        } 
        else if ( product instanceof CartItem ) {
            const items = state.product_items.filter(item => item.product.id !== product.product.id);
            commit(MTypes.UPDATE_PRODUCT_ITEMS, items);
        }
    }
}

// 

export enum GTypes {
    PERSONS_QUANTITY = 'persons_quantity',
    PRODUCT_ITEMS = 'product_items',
    COUPON = 'coupon',
    
    PRODUCT_ITEM = 'product_item',
    IS_CONTAINS_PRODUCT_ITEM = 'is_contains_product_item',

    PRODUCTS_SUM = 'products_sum',
    PRODUCTS_TOTAL = 'products_total',
    TOTAL = 'total',

    PRODUCTS_DISCOUNT = 'products_discount',
    TOTAL_DISCOUNT = 'total_discount',

    QUANTITY = 'quantity',
    QUANTITY_FORMATTED = 'quantity_formatted',
    IS_VALID = 'is_valid',
}

type Getters<S = State, P = Product> = {
    [GTypes.PERSONS_QUANTITY]: (state: S) => number,
    [GTypes.PRODUCT_ITEMS]: (state: S) => CartItem[],
    [GTypes.COUPON]: (state: S) => Coupon | null,

    [GTypes.PRODUCT_ITEM]: (state: S) => (product: P) => CartItem | undefined
    [GTypes.IS_CONTAINS_PRODUCT_ITEM]: (state: State, getters: any) => (product: P) => boolean,

    [GTypes.PRODUCTS_SUM]: (state: S) => Currency,
    [GTypes.PRODUCTS_TOTAL]: (state: S) => Currency,
    [GTypes.TOTAL]: (state: S, getters: any) => Currency,

    [GTypes.PRODUCTS_DISCOUNT]: (state: S, getters: any) => Currency,

    [GTypes.QUANTITY]: (state: S) => number,
    [GTypes.QUANTITY_FORMATTED]: (state: S, getters: any) => string,

    [GTypes.IS_VALID]: (state: S, getters: any) => boolean,
}

const getters : GetterTree<State, any> & Getters= {
    [GTypes.PERSONS_QUANTITY]: state => state.persons_quantity,
    [GTypes.PRODUCT_ITEMS]: state => state.product_items,
    [GTypes.COUPON]: state => state.coupon,

    [GTypes.PRODUCT_ITEM]: state => (product) => {
        return state.product_items.find(i => i.product.id === product.id);
    },
    [GTypes.IS_CONTAINS_PRODUCT_ITEM]: (state, getters) => (product) => {
        return getters[GTypes.PRODUCT_ITEM](product) !== undefined;
    },

    [GTypes.PRODUCTS_SUM]: state => {
        return new Currency(
            state.product_items.reduce((acc, el) => (el.quantity * el.product.price.value) + acc, 0) 
        );
    },
    [GTypes.PRODUCTS_TOTAL]: state => {
        return new Currency(
            state.product_items.reduce((acc, el) => (el.quantity * el.product.real_price.value) + acc, 0) 
        );
    },
    [GTypes.TOTAL]: (state, getters) => {
        const total : Currency = getters[GTypes.PRODUCTS_TOTAL];

        if ( state.coupon ) total.value = state.coupon.apply_discount(total.value);

        return new Currency(total.value);
    },

    [GTypes.PRODUCTS_DISCOUNT]: (state, getters) => {
        const products_sum : Currency = getters[GTypes.PRODUCTS_SUM];
        const products_total : Currency = getters[GTypes.PRODUCTS_TOTAL];
        
        return new Currency( products_sum.value - products_total.value );
    },

    [GTypes.QUANTITY]: state => state.product_items.reduce((acc, el) => el.quantity + acc, 0),
    [GTypes.QUANTITY_FORMATTED]: (state, getters) => {
        const quantity = getters[GTypes.QUANTITY];
        const quantity_str = new String(quantity);
        const last_symbol = quantity_str[ quantity_str.length - 1 ];

        if ( 
            last_symbol === '1' 
            && quantity !== 11 
        ) {
            return quantity_str + ' товар';
        }
        else if ( 
            parseInt(last_symbol) >= 2 
            && parseInt(last_symbol) <= 4 
            && ( quantity < 11 || quantity > 14 ) 
        ) { 
            return quantity_str + ' товара';
        }

        return quantity_str + ' товаров';
    },

    [GTypes.IS_VALID]: (state, getters) => {
        const quantity : number = getters[GTypes.QUANTITY];
        const total : Currency = getters[GTypes.TOTAL];

        return quantity > 0 && total.value >= 0;
    },
}

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const cart_module : Module<State, any> = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
};