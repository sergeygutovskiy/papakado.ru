import Currency from "../../classes/Currency"

export default class Coupon {
    id: number
    value: string
    discount: Currency
    is_percentage: boolean
    min_order_cost: Currency | null
    
    constructor({ 
        id, 
        value, 
        discount, 
        is_percentage, 
        min_order_cost,
    } : {
        id: number,
        value: string,
        discount: number,
        is_percentage: boolean,
        min_order_cost: number | null,
    }) {
        this.id = id;
        this.value = value;

        this.is_percentage = is_percentage

        if ( this.is_percentage ) this.discount = new Currency(discount, '%');
        else this.discount = new Currency(discount)

        if ( min_order_cost ) this.min_order_cost = new Currency(min_order_cost);
        else this.min_order_cost = null;
    }

    apply_discount(total: number) : number {
        let new_total = 0;
        
        if ( this.is_percentage ) new_total = total - Math.round(total / 100 * this.discount.value);
        else new_total = total - this.discount.value;
    
        return new_total;
    }

    is_valid(total: number) {
        const new_total = this.apply_discount(total);

        if ( new_total < 0 ) return false;
        else if ( !this.min_order_cost ) return true;

        return this.min_order_cost.value <= new_total;
    }

    get_error_message(total: number) : string{
        const total_after_coupon = this.apply_discount(total);

        if ( total === 0 ) {
            return `Необходимо пополнить коризну для применения купона`;
        }
        else if ( this.min_order_cost && total_after_coupon < this.min_order_cost.value ) {
            const needed_total = new Currency( this.min_order_cost.value - total_after_coupon );                       
            return `Пополните корзину еще на ${needed_total.formatted} для применения купона`;
        }

        const needed_total = new Currency( -1 * total_after_coupon );
        return `Пополните корзину еще на ${needed_total.formatted} для применения купона`;
    }
}