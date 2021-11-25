import Currency from "../../classes/Currency";
import Product from "./Product";

export default class CartItem {
    product: Product
    quantity: number

    constructor(product: Product, quantity? : number) {
        this.product = product;
        this.quantity = quantity ? quantity : 1;
    }

    increase() : void { this.quantity++; }
    decrease() : void { this.quantity--; }

    get total() : Currency {
        return new Currency( this.product.real_price.value * this.quantity );
    }
}