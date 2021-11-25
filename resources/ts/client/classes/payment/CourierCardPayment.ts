import PaymentEnum from "../../../enums/Payment";
import Payment from "./Payment";

export default class CourierCardPayment extends Payment {
    slug = PaymentEnum.COURIER_CARD
    label = 'Курьеру по карте'
}