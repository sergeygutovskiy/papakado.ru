import Currency from "../../classes/Currency";

interface OrderProduct {
    id: number,
    name: string,
    quantity: number,
}

interface OrderDelivery {
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

interface OrderPayment {
    slug: string,
    label: string,
    info: any,
}

export default class Order {
    id: number
    created_at: string
    total: Currency

    products: OrderProduct[]
    delivery: OrderDelivery
    payment: OrderPayment
    
    constructor({
        id,
        created_at,
        total,
        products,
        delivery,
        payment
    } : {
        id: number,
        created_at: string,
        total: number,
        products: OrderProduct[],
        delivery: OrderDelivery,
        payment: OrderPayment,
    }) {
        this.id = id;
        this.created_at = created_at;
        this.total = new Currency(total);

        this.products = products;
        this.delivery = delivery;
        this.payment = payment;
    }
}