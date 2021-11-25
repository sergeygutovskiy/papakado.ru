import Currency from '@/classes/Currency';

export default class Product {
    constructor({ id, name, price, price_discount, image_path, description, meta, weight }) {
        this.id = id;
        this.name = name;
        
        this.price = new Currency(price);
        this.price_discount = new Currency(price_discount);

        this.image_path = image_path;

        this.description = description;
        this.meta = meta;
        this.weight = weight;
    }

    get is_have_discount() { 
        return this.price_discount.get_value !== null; 
    }

    get get_real_price() { 
        return this.is_have_discount ? this.price_discount : this.price; 
    }
}