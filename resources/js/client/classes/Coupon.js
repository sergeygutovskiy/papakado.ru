import Currency from "../../classes/Currency";

export default class Coupon {
    constructor({ id, value, discount, is_percentage, min_order_cost }) {
        this.id = id;
        this.value = value;

        this.is_percentage = is_percentage

        if ( !this.is_percentage ) this.discount = new Currency(discount);
        else this.discount = discount;

        if ( min_order_cost ) this.min_order_cost = new Currency(min_order_cost);
        else this.min_order_cost = null;
    }

    get get_formatted_discount() {
        return this.is_percentage ? this.discount + ' %' : this.discount.get_formatted;
    }

    calculate_discount(old_cost) {
        let total = 0;
        
        if ( this.is_percentage ) total = old_cost - Math.round(old_cost / 100 * this.discount);
        else total = old_cost - this.discount.get_value;
    
        return total;
    }

    is_valid(cost) {
        const discount = this.calculate_discount(cost);

        if ( discount <= 0 ) return false;
        else if ( !this.min_order_cost ) return true;

        return this.min_order_cost.get_value <= discount;
    }
}