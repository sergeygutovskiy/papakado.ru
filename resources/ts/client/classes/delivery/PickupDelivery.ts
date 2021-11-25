import DeliveryEnum from "../../../enums/Delivery";
import PaymentEnum from "../../../enums/Payment";
import Delivery from "./Delivery";

export default class PickupDelivery extends Delivery {
    slug = DeliveryEnum.PICKUP
    static alowed_payments = [
        PaymentEnum.ONLINE,
        PaymentEnum.IN_PLACE,
    ]

    constructor({
        name,
        phone, 
        comment,
    }: {
        name: string,
        phone: string,
        comment: string,
    }) {
        super({ name, phone, comment })
    }
}