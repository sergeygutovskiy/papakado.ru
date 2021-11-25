import Currency from "@/classes/Currency";

export default class Coupon {
    constructor({ id, name, value, is_active, discount, is_percentage, min_order_cost }) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.is_active = is_active;

        this.is_percentage = is_percentage

        if ( !this.is_percentage ) this.discount = new Currency(discount);
        else this.discount = discount;

        if ( min_order_cost ) this.min_order_cost = new Currency(min_order_cost);
        else this.min_order_cost = null;
    }

    get get_formatted_discount() {
        return this.is_percentage ? this.discount + ' %' : this.discount.get_formatted;
    }

    get get_formatted_min_order_cost() {
        return this.min_order_cost ? this.min_order_cost.get_formatted : 'Нет';
    }
}