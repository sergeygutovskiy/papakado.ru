import Currency from "../../../classes/Currency"

export default class OrderProduct {
    id: number
    name: string
    quantity: number

    price: Currency
    price_discount: Currency | null

    constructor({
        id,
        name,
        quantity,
        
        price,
        price_discount,
    } : {
        id: number,
        name: string,
        quantity: number,
    
        price: number,
        price_discount: number | null,
    }) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;

        this.price = new Currency(price);
        this.price_discount = price_discount !== null ? new Currency(price_discount) : null;
    }

    get real_price() : Currency {
        if ( this.price_discount !== null ) return this.price_discount;

        return this.price;
    }

    get is_has_discount() : boolean {
        return this.price_discount !== null;
    }

    get total() : Currency {
        return new Currency( this.real_price.value * this.quantity );
    }
}