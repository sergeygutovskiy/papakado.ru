import Currency from '@/classes/Currency';

export default class OrderProduct {
    constructor({ id, name, price, price_discount, quantity }) {
        this.id = id;
        this.name = name;
        
        this.price = new Currency(price);
        this.price_discount = new Currency(price_discount);

        this.quantity = quantity;
    }

    get is_have_discount() { 
        return this.price_discount.get_value !== null; 
    }

    get get_real_price() { 
        return this.is_have_discount ? this.price_discount : this.price; 
    }

    get get_total_price() {
        return new Currency(this.get_real_price.get_value * this.quantity);
    }
}