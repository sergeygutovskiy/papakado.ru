import Currency from "../../classes/Currency";
import Category from "./Category";

export default class Product {
    id: number
    name: string

    price: Currency
    price_discount: Currency | null

    image_path: string

    description: string
    meta: any
    weight: string

    category: Category
    sales: number

    constructor({
        id,
        name,
        price,
        price_discount,
        image_path,
        description,
        meta,
        weight,
        category,
        sales,

    } : {
        id: number,
        name: string,
        price: number,
        price_discount: number | null,
        image_path: string,
        description: string,
        meta: any,
        weight: string,
        category: any,
        sales: number,
    }) {
        this.id = id;
        this.name = name;
        this.image_path = image_path;
        this.sales = sales;
        this.description = description;
        this.weight = weight;
        this.meta = meta;

        this.price = new Currency(price);
        if (price_discount !== null) this.price_discount = new Currency(price_discount);
        else this.price_discount = null;

        this.category = new Category(category);
    }

    get real_price() : Currency {
        if ( this.price_discount !== null ) return this.price_discount;

        return this.price;
    }

    get is_has_discount() : boolean {
        return this.price_discount !== null;
    }
}