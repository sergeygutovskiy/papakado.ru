import Currency from "../../classes/Currency"

export default class Coupon {
    id: number
    name: string
    value: string
    is_active: boolean
    discount: Currency
    is_percentage: boolean
    min_order_cost: Currency | null

    constructor({ 
        id, 
        name, 
        value, 
        is_active, 
        discount, 
        is_percentage, 
        min_order_cost,
    } : {
        id: number,
        name: string,
        value: string,
        is_active: boolean,
        discount: number,
        is_percentage: boolean,
        min_order_cost: number | null,
    }) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.is_active = is_active;

        this.is_percentage = is_percentage

        if ( this.is_percentage ) this.discount = new Currency(discount, '%');
        else this.discount = new Currency(discount);

        if ( min_order_cost !== null ) this.min_order_cost = new Currency(min_order_cost);
        else this.min_order_cost = null;
    }

    get is_has_min_order_cost() : boolean {
        return this.min_order_cost !== null;
    }
}