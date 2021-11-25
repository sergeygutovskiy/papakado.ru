import PaymentEnum from "../../../enums/Payment";
import Payment from "./Payment";

export default class CourierCashPayment extends Payment {
    slug = PaymentEnum.COURIER_CASH
    label = 'курьеру наличными'
}