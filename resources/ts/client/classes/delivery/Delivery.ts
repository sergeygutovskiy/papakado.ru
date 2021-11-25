import DeliveryEnum from '../../../enums/Delivery';
import PaymentEnum from '../../../enums/Payment';

export default abstract class Delivery {
    abstract slug: DeliveryEnum;
    static alowed_payments: PaymentEnum[]

    name: string
    phone: string
    comment: string

    constructor({
        name,
        phone, 
        comment
    }: {
        name: string,
        phone: string,
        comment: string
    }) {
        this.name = name;
        this.phone = phone;
        this.comment = comment;
    }

    get_fields() {
        const fields = {
            name: this.name,
            phone: this.phone,
            comment: this.comment,
        }

        return fields;
    }
}