import DeliveryEnum from "../../../enums/Delivery";
import PaymentEnum from "../../../enums/Payment";
import Delivery from "./Delivery";

export class Address {
    street: string
    house: string
    floor: string
    room: string
    entrance: string
    intercom: string

    constructor({
        street,
        house,
        floor,
        room,
        entrance,
        intercom,
    } : {
        street: string,
        house: string,
        floor: string,
        room: string,
        entrance: string,
        intercom: string,
    }) {
        this.street = street;
        this.house = house;
        this.floor = floor;
        this.room = room;
        this.entrance = entrance;
        this.intercom = intercom;
    }

    get formatted() : string {
        return this.street + ', д. ' + this.house
            + (this.room ? ', кв. ' + this.room : '')
            + (this.entrance ? ', подъезд ' + this.entrance : '')
            + (this.floor ? ', этаж ' + this.floor : '')
            + (this.intercom ? ' (код домофона: ' + this.intercom + ')': '')
            ;
    }
}

export default class CourierDelivery extends Delivery {
    slug = DeliveryEnum.COURIER
    static alowed_payments = [
        PaymentEnum.ONLINE,
        PaymentEnum.COURIER_CARD,
        PaymentEnum.COURIER_CASH,
    ]

    address: Address

    constructor({
        name,
        phone, 
        comment,
    }: {
        name: string,
        phone: string,
        comment: string,
    },
    
    address: Address,
    
    ) {
        super({ name, phone, comment });
        this.address = address;
    }

    get_fields() {
        const fields = {
            street: this.address.street,
            house: this.address.house,
            floor: this.address.floor,
            room: this.address.room,
            entrance: this.address.entrance,
            intercom: this.address.intercom,
        }

        return Object.assign(fields, super.get_fields());
    }
}