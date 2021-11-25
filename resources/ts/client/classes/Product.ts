import Currency from "../../classes/Currency";

export default class Product {
    id: number
    name: string
    price: Currency
    price_discount: Currency | null
    image_path: string
    description: string
    weight: string
    meta: any

    constructor({ 
            id, 
            name,
            price,
            price_discount,
            image_path, 
            description,
            weight,
            meta
        }
        :
        {
            id: number,
            name: string,
            price: number,
            price_discount: number | null,
            image_path: string,
            description: string,
            weight: string,
            meta: any
        }
    ) {
        this.id = id;
        this.name = name;
        this.image_path = image_path;
        
        this.description = description;
        this.weight = weight;
        this.meta = meta;

        this.price = new Currency(price);
        this.price_discount = price_discount ? new Currency(price_discount) : null;
    }

    get real_price() : Currency {
        if ( this.price_discount !== null ) return this.price_discount;

        return this.price;
    }

    get is_has_discount() : boolean {
        return this.price_discount !== null;
    }
}