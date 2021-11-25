import Currency from "../../../classes/Currency"
import OrderProduct from "./OrderProduct"

export interface OrderDelivery {
    slug: string,
    label: string,

    name: string,
    phone: string,
    comment: string,
}

export interface OrderCourierDelivery extends OrderDelivery {
    info: {
        address: string,
    }
}

export interface OrderPayment {
    slug: string,
    label: string,
}

export default class Order {
    id: number
    label: string
    total: Currency
    persons_quantity: number
    
    products: OrderProduct[]
    delivery: OrderDelivery
    payment: OrderPayment

    constructor({
        id,
        label,
        total,
        persons_quantity,
        
        products,
        delivery,
        payment,
    } : {
        id: number,
        label: string,
        total: number,
        persons_quantity: number,
        
        products: OrderProduct[],
        delivery: OrderDelivery,
        payment: OrderPayment,
    }) {
        this.id = id;
        this.label = label;
        this.total = new Currency(total);
        this.persons_quantity = persons_quantity;

        this.products = products;
        this.delivery = delivery;
        this.payment = payment;
    }
}