import Currency from "@/classes/Currency";

export default class CartItem {
    constructor({ product, quantity }) {
        this.product = product;
        this.quantity = quantity;
    }

    increase_quantity() { this.quantity++; }
    decrease_quantity() { this.quantity--; }

    get get_total_with_discount() {
        return new Currency(this.quantity * this.product.get_real_price.get_value);
    }
}