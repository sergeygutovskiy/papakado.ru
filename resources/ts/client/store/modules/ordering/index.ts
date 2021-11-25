import axios from 'axios';

import { ComputedRef } from '@vue/runtime-dom';
import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { ModuleTypes } from '../..';

import CartItem from '../../../classes/CartItem';
import Delivery from '../../../classes/delivery/Delivery';
import Payment from '../../../classes/payment/Payment';

type State = {
    title: string,
    delivery: Delivery | null,
    payment: Payment | null,
}

const state : State = {
    title: '',
    delivery: null,
    payment: null,
}

// 

export enum MTypes {
    UPDATE_TITLE = 'UPDATE_TITLE',
    UPDATE_DELIVERY = 'UPDATE_DELIVERY',
    UPDATE_PAYMENT = 'UPDATE_PAYMENT',
}

type Mutations<S = State> = {
    [MTypes.UPDATE_TITLE] (state: S, payload: string) : void,
    [MTypes.UPDATE_DELIVERY] (state: S, payload: Delivery | null) : void,
    [MTypes.UPDATE_PAYMENT] (state: S, payload: Payment | null) : void,
}

const mutations : MutationTree<State> & Mutations = {
    [MTypes.UPDATE_TITLE] (state, payload) { state.title = payload; },
    [MTypes.UPDATE_DELIVERY] (state, payload) { state.delivery = payload; },
    [MTypes.UPDATE_PAYMENT] (state, payload) { state.payment = payload; },
}

// 

export enum ATypes {
    SUBMIT = 'submit',
}

type AContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, any>, 'commit'>

type Actions = {
    [ATypes.SUBMIT] ({ state, commit, rootState } : AContext) : void,
}

const actions : ActionTree<State, any> & Actions = {
    async submit ({ state, commit, rootState }) {
        interface IOrder {
            products: { id: number, quantity: number }[],
            persons_quantity: number,
            
            coupon: number | null,

            delivery: { slug: string, fields: {} },
            payment: { slug: string },
        }

        const product_items : CartItem[] = rootState[ModuleTypes.CART].product_items;

        // products
        const order_products = product_items.map(item => { return {
            id: item.product.id,
            quantity: item.quantity
        }});

        // persons
        const order_perosns_quantity : number = rootState.cart.persons_quantity;

        // coupon
        const order_coupon : number | null = rootState.cart.coupon ? rootState.cart.coupon.id : null;
        
        if ( !state.delivery || !state.payment ) return;

        // payment
        const order_payment = { slug: state.payment.slug };

        const order_delivery = { 
            slug: state.delivery.slug,
            fields: state.delivery.get_fields(),
        }

        const order : IOrder = {
            products: order_products,
            persons_quantity: order_perosns_quantity,

            coupon: order_coupon,

            delivery: order_delivery,
            payment: order_payment,
        }

        console.log(order);

        const response = await axios.post('/api/client/order/submit', order);
        return response.data.data;
    }
}

// 

export enum GTypes {
    TITLE = 'title',
    DELIVERY = 'delivery',
    PAYMENT = 'payment',
    IS_VALID = 'is_valid',
}

type Getters<S = State> = {
    [GTypes.TITLE]: (state: S) => string,
    [GTypes.DELIVERY]: (state: S) => Delivery | null,
    [GTypes.PAYMENT]: (state: S) => Payment | null,
    [GTypes.IS_VALID]: (state: S) => boolean,
}

const getters : GetterTree<State, any> & Getters = {
    [GTypes.TITLE]: state => state.title,
    [GTypes.DELIVERY]: state => state.delivery,
    [GTypes.PAYMENT]: state => state.payment,
    [GTypes.IS_VALID]: state => state.delivery !== null && state.payment !== null,
}

export type Getter<K extends keyof Getters> = ComputedRef< ReturnType<Getters[K]> >

// 

export const ordering_module : Module<State, any> = {
    namespaced: true,

    state,
    mutations,
    actions,
    getters
};