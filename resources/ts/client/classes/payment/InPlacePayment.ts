import PaymentEnum from "../../../enums/Payment";
import Payment from "./Payment";

export default class InPlaceEPayment extends Payment {
    slug = PaymentEnum.IN_PLACE
    label = 'В ресторане'
}