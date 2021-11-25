import PaymentEnum from "../../../enums/Payment";
import Payment from "./Payment";

export default class OnlinePayment extends Payment {
    slug = PaymentEnum.ONLINE
    label = 'Онлайн по карте'
}